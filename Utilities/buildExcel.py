from openpyxl import Workbook
import cfbdAPI
from datetime import datetime
import pytz


# Establish the CFB API connection
API = cfbdAPI.api


def getRecord(team, records):
    record = list(filter(lambda x: x.team == team, records))
    return str(record[0].total.wins) + "-" + str(record[0].total.losses)


def parseDate(date):
    inputDateFormat = "%Y-%m-%dT%H:%M:%S.%fZ"
    dateFormat = "%Y-%m-%d %I:%M:%S %p"
    pst_timezone = pytz.timezone("America/Los_Angeles")
    utc_date = datetime.strptime(date, inputDateFormat)
    utc_date = pytz.utc.localize(utc_date)
    pst_date = utc_date.astimezone(pst_timezone)
    return pst_date.strftime(dateFormat)


def createFile():
    wb = Workbook()
    ws = wb.active

    buildHeader(ws)

    rowID = 2  # games start on the 2nd row of the excel sheet
    records = API.get_team_records(year=2023)
    gamesAPI = API.get_games(year=2023, season_type="postseason", division="fbs")
    for game in gamesAPI:
        buildRow(ws, rowID, game, records)
        rowID += 2  # we add 2 since each game takes up 2 rows in excel

    wb.save("resources/bowlpool-2023.xlsx")


def buildHeader(sheet):
    sheet["A1"] = "Date / Bowl:"
    sheet["B1"] = "Teams:"
    sheet["C1"] = "Records:"
    sheet["D1"] = "Line:"


def buildRow(sheet, rowNumber, game, records):
    sheet["A" + str(rowNumber)] = game.notes  # bowl name is saved in 'notes'
    sheet["A" + str(rowNumber + 1)] = parseDate(game.start_date)
    sheet["B" + str(rowNumber)] = game.home_team
    sheet["B" + str(rowNumber + 1)] = game.away_team
    sheet["C" + str(rowNumber)] = getRecord(game.home_team, records)
    sheet["C" + str(rowNumber + 1)] = getRecord(game.away_team, records)


def main():
    createFile()


if __name__ == "__main__":
    main()
