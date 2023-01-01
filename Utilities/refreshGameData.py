import cfbdAPI
from mysqlConnection import getMyDB
import mysql.connector
from datetime import datetime
import sys

# Establish the CFB API connection
API = cfbdAPI.api

# Establish the database connection
mydb = getMyDB()
mydb.reconnect()
cursor = mydb.cursor()


def updateGame(gameAPI, gameDB):
    query = """UPDATE bowlGames SET startTime=%s WHERE gameId=%s"""
    time = (datetime.strptime(gameAPI.start_date,
                              "%Y-%m-%dT%H:%M:%S.%fZ")).strftime('%Y-%m-%d %H:%M:%S')
    gameId = gameDB[0]
    values = (time, gameId)
    try:
        cursor.execute(query, values)
        return 1
    except mysql.connector.Error as e:
        print(e)
        return 0


def updateTeam(gameAPI, gameDB, isHome):
    query = ""
    conference, teamId = "", ""
    scores = []
    if isHome:
        conference = gameAPI.home_conference
        scores = gameAPI.home_line_scores
        teamId = gameDB[2]
    else:
        conference = gameAPI.away_conference
        scores = gameAPI.away_line_scores
        teamId = gameDB[3]
    if scores:
        query = """UPDATE bowlTeams SET conference=%s, firstQuarterScore=%s, secondQuarterScore=%s, thirdQuarterScore=%s, fourthQuarterScore=%s, score=%s WHERE teamId=%s"""
        values = (conference, scores[0], scores[1],
                  scores[2], scores[3], sum(scores), teamId)
    else:
        query = """UPDATE bowlTeams SET conference=%s WHERE teamId=%s"""
        values = (conference, teamId)
    try:
        cursor.execute(query, values)
        return 1
    except mysql.connector.Error as e:
        print(e)
        return 0


def refreshAllGameData(year):
    gamesDB = getGamesFromDatabase(year)
    gamesAPI = API.get_games(year=year, season_type='postseason')
    gameUpdates, teamUpdates = 0, 0
    for gameAPI in gamesAPI:
        for gameDB in gamesDB:
            if gameAPI.id == gameDB[0]:
                gameUpdates += updateGame(gameAPI, gameDB)
                teamUpdates += updateTeam(gameAPI, gameDB, True)
                teamUpdates += updateTeam(gameAPI, gameDB, False)
    printStats(gameUpdates, teamUpdates, year)


def printStats(gameUpdates, teamUpdates, year):
    print("-------------------------------")
    print("-------UPDATES FOR " + str(year) + "--------")
    print("-------------------------------")
    print("Successful updates to games: " + str(gameUpdates))
    print("Successful updates to teams: " + str(teamUpdates))
    print("-------------------------------")


def getTeamFromDatabase(teamId):
    query = """SELECT * FROM bowlTeams WHERE teamId=%s """
    values = [teamId]
    try:
        cursor.execute(query, values)
        return cursor.fetchall()

    except mysql.connector.Error as e:
        print(e)
        return []


def getGamesFromDatabase(year):
    query = """SELECT * FROM bowlGames WHERE homeTeam > %s AND homeTeam < %s"""
    values = (int(str(year) + "00000"), int(str(int(year+1)) + "00000"))
    try:
        cursor.execute(query, values)
        return cursor.fetchall()

    except mysql.connector.Error as e:
        print(e)
        return []


def main():
    for i in range(1, len(sys.argv)):
        arg = int(sys.argv[i])
        if arg > 2000:
            refreshAllGameData(arg)

    # Close the database connection
    cursor.close()
    mydb.commit()
    mydb.close()


if __name__ == "__main__":
    main()
