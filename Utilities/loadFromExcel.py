import xlrd
from mysqlConnection import getMyDB
import mysql.connector
import random
import sys


# Establish the database connection
mydb = getMyDB()
mydb.reconnect()
cursor = mydb.cursor()


def generateId(prefix, length):
    output = str(prefix)
    for _ in range(length - len(output)):
        output += str(random.randint(0, 9))
    return int(output)


def loadPlayers(sheet, year):
    query = """INSERT INTO players (playerId, name, year) VALUES (%s, %s, %s)"""
    players = []
    row = sheet.row(0)
    for i in range(6, len(row)):
        name = row[i].value
        id = generateId(year, 9)
        players.append({"name": name,
                       "id": id})
        values = (id, name, year)
        try:
            cursor.execute(query, values)
        except mysql.connector.Error as e:
            print(e)
    return players


def insertPlayerPick(player, year, gameId, isHome):
    query = """INSERT INTO playerPicks (pickId, playerId, gameId, isHome) VALUES (%s, %s, %s, %s)"""
    values = (generateId(year, 13), player['id'], gameId, isHome)
    try:
        cursor.execute(query, values)
    except mysql.connector.Error as e:
        print(e)


def loadPlayerPicksForRow(sheet, index, year, players, gameId, isHome):
    for i in range(len(players)):
        if sheet.cell(index, i+6).value == "X":
            insertPlayerPick(players[i], year, gameId, isHome)


def insertTeam(sheet, index, year, teamId, gameId, isHome, record):
    query = """INSERT INTO bowlTeams (teamId, bowlId, year, name, isHome, line, record) VALUES (%s, %s, %s, %s, %s, %s, %s)"""
    name = sheet.cell(index, 3).value
    line = sheet.cell(index, 5).value
    values = (teamId, gameId, year, name, isHome, line, record)
    try:
        cursor.execute(query, values)
    except mysql.connector.Error as e:
        print(e)


def insertGame(sheet, index, year, players):
    query = """INSERT INTO bowlGames (gameId, homeTeam, awayTeam, bowlName) VALUES (%s, %s, %s, %s)"""
    if sheet.cell(index, 0).value:
        gameId = int(sheet.cell(index, 0).value)
        bowlName = sheet.cell(index, 1).value
        awayTeamId, homeTeamId = 0, 0
        for i in range(0, 2):
            if awayTeamId == 0 and sheet.cell(index+i, 2).value == "Away":
                awayTeamId = generateId(str(year), 9)
                insertTeam(sheet, index+i, year,
                           awayTeamId, gameId, False, sheet.cell(index+i, 4).value)
                loadPlayerPicksForRow(
                    sheet, index+i, year, players, gameId, False)
            elif homeTeamId == 0 and sheet.cell(index+i, 2).value == "Home":
                homeTeamId = generateId(str(year), 9)
                insertTeam(sheet, index+i, year,
                           homeTeamId, gameId, True, sheet.cell(index+i, 4).value)
                loadPlayerPicksForRow(
                    sheet, index+i, year, players, gameId, True)

        # Assign values from each row
        values = (gameId, homeTeamId, awayTeamId, bowlName)
        print(values)
        # Execute sql Query
        try:
            cursor.execute(query, values)
        except mysql.connector.Error as e:
            print(e)
            return False
        return True
    return False


def loadGames(year):
    filename = f"resources/bowlpool-{year}.xls"
    print(filename)
    book = xlrd.open_workbook(filename)
    sheet = book.sheet_by_name("Sheet1")
    index = 1
    successfulImports = int(sheet.nrows/2)-1
    players = loadPlayers(sheet, year)
    for _ in range(0, int(sheet.nrows/2)):
        if not insertGame(sheet, index, year, players):
            successfulImports -= 1
        index += 2
    # Print results
    print("I just imported " +
          str(successfulImports) + " rows to MySQL!")


def main():
    # Import the games to the database
    for i in range(1, len(sys.argv)):
        arg = int(sys.argv[i])
        if arg > 2000:
            loadGames(arg)

    # Close the database connection
    cursor.close()
    mydb.commit()
    mydb.close()


if __name__ == "__main__":
    main()
