from mysqlConnection import getMyDB
import mysql.connector
import sys
from versionUtil import getCurrentVersion, incrementVersion

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


def updatePlayerScore(name, year, points, version):
    query = """UPDATE players SET points=%s, version=%s WHERE name=%s and year = %s"""
    values = (points, version, name, year)
    try:
        cursor.execute(query, values)
        return 1
    except mysql.connector.Error as e:
        print(e)
        return 0


def refreshAllPlayerData(year):
    version = getCurrentVersion(year) + 1
    players = getPlayersFromDatabase(year)
    games = getGamesFromDatabase(year)
    newScores = [0] * len(players)

    for game in games:
        homeTeam = getTeamFromDatabase(game[3])
        awayTeam = getTeamFromDatabase(game[4])
        print(homeTeam[0][-2], awayTeam[0][-2])
        if homeTeam[0][-2] != 0 and awayTeam[0][-2] != 0:
            homeWin = didHomeTeamWin(homeTeam, awayTeam)
            for idx, player in enumerate(players):
                for pick in player[-1]:
                    if pick[2] == game[1] and homeWin:
                        if pick[3] == game[3]:
                            newScores[idx] += 1
                    elif pick[2] == game[1]:
                        if pick[3] == game[4]:
                            newScores[idx] += 1
    playerUpdates = 0
    for idx, player in enumerate(players):
        if player[2] != newScores[idx]:
            playerUpdates += updatePlayerScore(player[1], year, newScores[idx], version)
    if playerUpdates > 0:
        incrementVersion(year)
        printStats(playerUpdates, year, version)
    else:
        print("No updates were made")


def printStats(playerUpdates, year, version):
    print("-------------------------------")
    print("-------UPDATES FOR " + str(year) + "--------")
    print("-------------------------------")
    print("Version: " + str(version))
    print("Successful updates to players: " + str(playerUpdates))
    print("-------------------------------")


def getPicksForPlayerFromDatabase(player):
    query = """SELECT * FROM playerPicks WHERE player = %s"""
    values = [player]
    try:
        cursor.execute(query, values)
        return cursor.fetchall()

    except mysql.connector.Error as e:
        print(e)
        return []


def getPlayersFromDatabase(year):
    query = """SELECT * FROM players WHERE year = %s"""
    values = [year]
    try:
        cursor.execute(query, values)
        players = cursor.fetchall()
        result = []
        for player in players:
            result.append(list(player))
            # result[-1:][0][2] = 0
            result[-1:][0].append(getPicksForPlayerFromDatabase(result[-1:][0][1]))
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
    query = """SELECT * FROM bowlGames WHERE year = %s"""
    values = [year]
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
