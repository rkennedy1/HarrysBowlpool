from openpyxl import Workbook
import cfbdAPI
from datetime import datetime
import pytz


# Establish the CFB API connection
API = cfbdAPI.api

records = API.get_team_records(year=2023)


def getRecord(team):
    record = list(filter(lambda x: x.team == team, records))
    return str(record[0].total.wins) + "-" + str(record[0].total.losses)


def sampleFile():
    wb = Workbook()

    # grab the active worksheet
    ws = wb.active
    buildHeader(ws)

    gamesAPI = API.get_games(year=2023, season_type="postseason", division="fbs")
    rowID = 2
    for game in gamesAPI:
        buildRow(ws, rowID, game)
        rowID += 2

    # Save the file
    wb.save("resources/bowlpool-2023.xlsx")


def buildHeader(sheet):
    sheet["A1"] = "Date / Bowl:"
    sheet["B1"] = "Teams:"
    sheet["C1"] = "Records:"
    sheet["D1"] = "Line:"


def buildRow(sheet, rowNumber, game):
    utcDateFormat = "%Y-%m-%dT%H:%M:%S.%fZ"
    dateFormat = "%Y-%m-%d %I:%M:%S %p"
    pst_timezone = pytz.timezone("America/Los_Angeles")
    utc_date = datetime.strptime(game.start_date, utcDateFormat)
    utc_date = pytz.utc.localize(utc_date)
    pst_date = utc_date.astimezone(pst_timezone)
    sheet["A" + str(rowNumber)] = game.notes
    sheet["A" + str(rowNumber + 1)] = pst_date.strftime(dateFormat)
    sheet["B" + str(rowNumber)] = game.home_team
    sheet["B" + str(rowNumber + 1)] = game.away_team
    sheet["C" + str(rowNumber)] = getRecord(game.home_team)
    sheet["C" + str(rowNumber + 1)] = getRecord(game.away_team)


def main():
    sampleFile()


if __name__ == "__main__":
    main()
