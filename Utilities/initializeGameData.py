import cfbdAPI
import sys
from mysqlConnection import getMyDB
import mysql.connector
from datetime import datetime
import pytz

# Establish the database connection
mydb = getMyDB()
mydb.reconnect()
cursor = mydb.cursor()

# Establish the CFB API connection
API = cfbdAPI.api


def parseDate(date):
    inputDateFormat = "%Y-%m-%dT%H:%M:%S.%fZ"
    pst_timezone = pytz.timezone("America/Los_Angeles")
    utc_date = datetime.strptime(date, inputDateFormat)
    utc_date = pytz.utc.localize(utc_date)
    pst_date = utc_date.astimezone(pst_timezone)
    return pst_date.isoformat()


def retrieveGameData(year):
    records = API.get_team_records(year=year)
    games = API.get_games(year=int(year), season_type="postseason", division="fbs")
    return {"games": games, "records": records}


def getRecord(team, records):
    record = list(filter(lambda x: x.team == team, records))
    return str(record[0].total.wins) + "-" + str(record[0].total.losses)


def querySQL(query, values):
    try:
        cursor.execute(query, values)
    except mysql.connector.Error as e:
        print(e)
        return False
    return True


def insertGame(game, year):
    query = """INSERT INTO bowlGames (gameId, homeTeam, awayTeam, bowlName, year, startTime, version) VALUES (%s, %s, %s, %s, %s, %s, %s)"""
    values = (
        game.id,
        game.home_id,
        game.away_id,
        game.notes,
        year,
        parseDate(game.start_date),
        1
    )
    return querySQL(query, values)


def insertVersion(year):
    query = """INSERT INTO version (year, currentVersion) VALUES (%s, %s)"""
    values = (year, 1)
    return querySQL(query, values)


def insertTeam(game, year, isHome, records):
    query = """INSERT INTO bowlTeams (teamId, bowlId, year, name, isHome, line, record, conference, version) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)"""
    values = ()
    if isHome:
        values = (
            game.home_id,
            game.id,
            year,
            game.home_team,
            isHome,
            0,
            getRecord(game.home_team, records),
            game.home_conference,
            1
        )
    else:
        values = (
            game.away_id,
            game.id,
            year,
            game.away_team,
            isHome,
            0,
            getRecord(game.away_team, records),
            game.away_conference,
            1
        )
    return querySQL(query, values)


def loadGames(gameData, year):
    successfulImports = 0
    for game in gameData["games"]:
        if (
            insertGame(game, year)
            and insertTeam(game, year, True, gameData["records"])
            and insertTeam(game, year, False, gameData["records"])
        ):
            successfulImports += 1
    return successfulImports


def main(args):
    year = int(args[1])
    gameData = retrieveGameData(year)
    successfulImports = loadGames(gameData, year)
    insertVersion(year)
    # Close the database connection
    cursor.close()
    mydb.commit()
    mydb.close()
    print("Bowl Games Added: ", successfulImports)


if __name__ == "__main__":
    main(sys.argv)
