from openpyxl import Workbook
import cfbdAPI
from datetime import datetime
import pytz
import argparse

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


def createFile(fileName, year):
    wb = Workbook()
    ws = wb.active

    buildHeader(ws)

    rowID = 2  # games start on the 2nd row of the excel sheet
    records = API.get_team_records(year=year)
    gamesAPI = API.get_games(year=year, season_type="postseason", division="fbs")

    # Sort games by start_date
    sorted_games = sorted(
        gamesAPI,
        key=lambda game: datetime.strptime(game.start_date, "%Y-%m-%dT%H:%M:%S.%fZ"),
    )

    for game in sorted_games:
        buildRow(ws, rowID, game, records)
        rowID += 2  # we add 2 since each game takes up 2 rows in excel

    wb.save(fileName)


def buildHeader(sheet):
    sheet["A1"] = "Date / Bowl:"
    sheet["B1"] = "Teams:"
    sheet["C1"] = "Records:"


def buildRow(sheet, rowNumber, game, records):
    sheet["A" + str(rowNumber)] = game.notes  # bowl name is saved in 'notes'
    sheet["A" + str(rowNumber + 1)] = parseDate(game.start_date)
    sheet["B" + str(rowNumber)] = game.home_team
    sheet["B" + str(rowNumber + 1)] = game.away_team
    sheet["C" + str(rowNumber)] = getRecord(game.home_team, records)
    sheet["C" + str(rowNumber + 1)] = getRecord(game.away_team, records)


def main():
    parser = argparse.ArgumentParser(
        description="Create an Excel file with college football bowl game information."
    )
    parser.add_argument(
        "-o",
        "--output",
        required=True,
        help='Output Excel file path (e.g., "bowlgames_2024.xlsx")',
    )
    parser.add_argument(
        "-y",
        "--year",
        type=int,
        required=True,
        help="Year for which to generate bowl game data (e.g., 2024)",
    )

    args = parser.parse_args()

    if args.year < 2000:
        parser.error("Year must be 2000 or later")

    createFile(args.output, args.year)
    print(f"Successfully created bowl game Excel file: {args.output}")


if __name__ == "__main__":
    main()
