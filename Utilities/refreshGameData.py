import cfbdAPI
from mysqlConnection import getMyDB
import mysql.connector
from datetime import datetime
import sys
from versionUtil import getCurrentVersion
from versionUtil import incrementVersion

# Establish the CFB API connection
API = cfbdAPI.api

# Establish the database connection
mydb = getMyDB()
mydb.reconnect()
cursor = mydb.cursor()


# updateGame - updates the start time for the game and the version
def updateGame(gameAPI, gameDB, version):
    # Select the data and update if data has changed
    # Include version number in the update
    query = """UPDATE bowlGames SET startTime=%s, version=%s WHERE gameId=%s"""
    time = (datetime.strptime(gameAPI.start_date, "%Y-%m-%dT%H:%M:%S.%fZ")).strftime(
        "%Y-%m-%d %H:%M:%S"
    )
    gameId = gameDB[0]
    values = (time, version, gameId)
    try:
        cursor.execute(query, values)
        return 1
    except mysql.connector.Error as e:
        print("ERROR updating bowl games")
        print(e)
        return 0


# updateTeam - udpates a teams score and version
def updateTeam(gameAPI, gameDB, isHome, version):
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
        # get the current score in order to see if it has changed
        currentScore = getCurrentScore(teamId)
        newScore = sum(scores)

        if currentScore != newScore:
            updateCurrentScore(teamId, conference, scores, version)
            return 1
    else:
        return 0


def updateCurrentScore(teamId, conference, scores, version):
    query = """ UPDATE bowlTeams 
                SET
                    conference=%s,  
                    firstQuarterScore=%s, 
                    secondQuarterScore=%s, 
                    thirdQuarterScore=%s, 
                    fourthQuarterScore=%s,  
                    score=%s, 
                    version=%s 
                WHERE teamId=%s"""
    values = (
        conference,
        scores[0],
        scores[1],
        scores[2],
        scores[3],
        sum(scores),
        version,
        teamId,
    )
    try:
        cursor.execute(query, values)
        return 1
    except mysql.connector.Error as e:
        print("ERROR udpating bowlteams with current score")
        print(e)
        return 0


def getCurrentScore(teamId):
    query = "SELECT score FROM bowlTeams where teamId=%s"
    values = [teamId]

    try:
        cursor.execute(query, values)
        score = cursor.fetchone()
        return score[0]
    except mysql.connector.Error as e:
        print("ERROR getting current score from bowl teams")
        print(e)
        return 0


def getNextVersion(year):
    query = "SELECT currentVersion FROM version where year=%s"
    update = "UPDATE version SET currentVersion = currentVersion + 1 where year=%s"
    values = [year]
    version = 0

    # Get the next_version
    try:
        cursor.execute(query, values)
        result = cursor.fetchone()
        version = result[0]
    except mysql.connector.Error as e:
        print("ERROR getting next version number from version table")
        print(e)
        return 0
    # Update the next_version for next time..
    try:
        cursor.execute(update, values)
    except mysql.connector.Error as e:
        print("ERROR udpating version table with next version")
        print(e)
        return 0
    return version


def refreshAllGameData(year):
    version = getCurrentVersion(year) + 1
    gamesDB = getGamesFromDatabase(year)
    gamesAPI = API.get_games(year=year, season_type="postseason")
    gameUpdates, teamUpdates = 0, 0
    for gameAPI in gamesAPI:
        for gameDB in gamesDB:
            if gameAPI.id == gameDB[0]:
                changed = False
                if updateTeam(gameAPI, gameDB, True, version):
                    teamUpdates += 1
                    changed = True
                if updateTeam(gameAPI, gameDB, False, version):
                    teamUpdates += 1
                    changed = True
                # Only update game when data is changed
                if changed:
                    gameUpdates += updateGame(gameAPI, gameDB, version)

    if teamUpdates > 0:
        incrementVersion(year)

    printStats(gameUpdates, teamUpdates, year, version)


def printStats(gameUpdates, teamUpdates, year, version):
    print("-------------------------------")
    print("-------UPDATES FOR " + str(year) + "--------")
    print("-------------------------------")
    print("Version: " + str(version))
    print("Successful updates to games: " + str(gameUpdates))
    print("Successful updates to teams: " + str(teamUpdates))
    print("-------------------------------")


def getTeamFromDatabase(teamId):
    query = """SELECT * FROM bowlTeams WHERE teamId=%s """
    values = teamId
    try:
        cursor.execute(query, values)
        return cursor.fetchall()

    except mysql.connector.Error as e:
        print("ERROR getting teams fro bowl teams")
        print(e)
        return []


def getGamesFromDatabase(year):
    query = """SELECT * FROM bowlGames WHERE homeTeam > %s AND homeTeam < %s"""
    values = (int(str(year) + "00000"), int(str(int(year + 1)) + "00000"))
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
            refreshAllGameData(arg)

    # Close the database connection
    cursor.close()
    mydb.commit()
    mydb.close()


if __name__ == "__main__":
    main()
