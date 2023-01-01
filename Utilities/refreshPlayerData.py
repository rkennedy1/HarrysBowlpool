from mysqlConnection import getMyDB
import mysql.connector
import sys

# Establish the database connection
mydb = getMyDB()
mydb.reconnect()
cursor = mydb.cursor()


def convertLine(team):
    line = team[0][5]
    if line:
        if line[0] == "+":
            return float(line[1:])
        if line[0] == "-":
            return -float(line[1:])
    return 0


def didHomeTeamWin(homeTeam, awayTeam):
    hLine = convertLine(homeTeam)
    aLine = convertLine(awayTeam)
    if homeTeam[0][-1] or awayTeam[0][-1]:
        return float(homeTeam[0][-1]) + hLine > float(awayTeam[0][-1]) + aLine
    return False


def updatePlayerScore(playerId, points):
    query = """UPDATE players SET points=%s WHERE playerId=%s"""
    values = (points, playerId)
    try:
        cursor.execute(query, values)
        return 1
    except mysql.connector.Error as e:
        print(e)
        return 0


def refreshAllPlayerData(year):
    players = getPlayersFromDatabase(year)
    games = getGamesFromDatabase(year)

    for game in games:
        homeTeam = getTeamFromDatabase(game[2])
        awayTeam = getTeamFromDatabase(game[3])
        if (homeTeam[0][-1] is not None and awayTeam[0][-1] is not None):
            homeWin = didHomeTeamWin(homeTeam, awayTeam)
            for player in players:
                for pick in player[-1]:
                    if pick[2] == game[0] and ((homeWin and pick[3]) or (not homeWin and not pick[3])):
                        player[2] += 1
    playerUpdates = 0
    for player in players:
        playerUpdates += updatePlayerScore(player[0], player[2])
    printStats(playerUpdates, year)


def printStats(playerUpdates, year):
    print("-------------------------------")
    print("-------UPDATES FOR " + str(year) + "--------")
    print("-------------------------------")
    print("Successful updates to players: " + str(playerUpdates))
    print("-------------------------------")


def getPicksForPlayerFromDatabase(playerId):
    query = """SELECT * FROM playerPicks WHERE playerId = %s"""
    values = [playerId]
    try:
        cursor.execute(query, values)
        return cursor.fetchall()

    except mysql.connector.Error as e:
        print(e)
        return []


def getPlayersFromDatabase(year):
    query = """SELECT * FROM players WHERE playerId > %s AND playerId < %s"""
    values = (int(str(year) + "00000"), int(str(int(year+1)) + "00000"))
    try:
        cursor.execute(query, values)
        players = cursor.fetchall()
        result = []
        for player in players:
            result.append(list(player))
            result[-1:][0][2] = 0
            result[-1:][0].append(getPicksForPlayerFromDatabase(result[-1:][0][0]))
        return result

    except mysql.connector.Error as e:
        print(e)
        return []


def getTeamFromDatabase(teamId):
    query = """SELECT * FROM bowlTeams WHERE teamId=%s """
    values = [teamId]
    try:
        cursor.execute(query, values)
        team = cursor.fetchall()
        return list(team)

    except mysql.connector.Error as e:
        print(e)
        return []


def getGamesFromDatabase(year):
    query = """SELECT * FROM bowlGames WHERE homeTeam > %s AND homeTeam < %s"""
    values = (int(str(year) + "00000"), int(str(int(year+1)) + "00000"))
    try:
        cursor.execute(query, values)
        games = cursor.fetchall()
        result = []
        for game in games:
            result.append(list(game))
        return result
    except mysql.connector.Error as e:
        print(e)
        return []


def main():
    for i in range(1, len(sys.argv)):
        arg = int(sys.argv[i])
        if arg > 2000:
            refreshAllPlayerData(arg)

    # Close the database connection
    cursor.close()
    mydb.commit()
    mydb.close()


if __name__ == "__main__":
    main()
