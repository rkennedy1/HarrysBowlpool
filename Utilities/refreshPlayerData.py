from mysqlConnection import getMyDB
import mysql.connector
import sys
from versionUtil import getCurrentVersion, incrementVersion

# Establish the database connection
mydb = getMyDB()
mydb.reconnect()
cursor = mydb.cursor()


def convertLine(team):
    line = team[2]
    if line:
        if line[0] == "+":
            return float(line[1:])
        if line[0] == "-":
            return -float(line[1:])
    return 0


def didPickTeamWin(homeTeam, awayTeam, pickId):
    hLine = convertLine(homeTeam)
    aLine = convertLine(awayTeam)
    convertedHomeScore = float(homeTeam[1]) + hLine
    convertedAwayScore = float(awayTeam[1]) + aLine
    if convertedHomeScore or convertedAwayScore:
        if convertedHomeScore == convertedAwayScore:
            return True
        if convertedHomeScore > convertedAwayScore and pickId == homeTeam[0]:
            return True
        if convertedHomeScore < convertedAwayScore and pickId == awayTeam[0]:
            return True
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
        homeTeam = getTeamFromDatabase(game[2])[0]
        awayTeam = getTeamFromDatabase(game[3])[0]
        if game[1] == 1:
            for idx, player in enumerate(players):
                for pick in player[-1]:
                    if pick[0] == game[0]:
                        if didPickTeamWin(homeTeam, awayTeam, pick[1]):
                            newScores[idx] += 1
    playerUpdates = 0
    for idx, player in enumerate(players):
        if player[1] != newScores[idx]:
            playerUpdates += updatePlayerScore(player[0], year, newScores[idx], version)
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
    query = """SELECT gameId, teamId FROM playerPicks WHERE player = %s"""
    values = [player]
    try:
        cursor.execute(query, values)
        return cursor.fetchall()

    except mysql.connector.Error as e:
        print(e)
        return []


def getPlayersFromDatabase(year):
    query = """SELECT name, points FROM players WHERE year = %s"""
    values = [year]
    try:
        cursor.execute(query, values)
        players = cursor.fetchall()
        result = []
        for player in players:
            result.append(list(player))
            # result[-1:][0][2] = 0
            result[-1:][0].append(getPicksForPlayerFromDatabase(result[-1:][0][0]))
        return result

    except mysql.connector.Error as e:
        print(e)
        return []


def getTeamFromDatabase(teamId):
    query = """SELECT teamId, score, line FROM bowlTeams WHERE teamId=%s """
    values = [teamId]
    try:
        cursor.execute(query, values)
        team = cursor.fetchall()
        return list(team)

    except mysql.connector.Error as e:
        print(e)
        return []


def getGamesFromDatabase(year):
    query = """SELECT gameId, completed, homeTeam, awayTeam  FROM bowlGames WHERE year = %s"""
    values = [year]
    try:
        cursor.execute(query, values)
        return cursor.fetchall()

    except mysql.connector.Error as e:
        print("ERROR getting game data from bowlGames")
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
