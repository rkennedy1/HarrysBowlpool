import cfbdAPI
from mysqlConnection import getMyDB
import mysql.connector
from datetime import datetime
import sys


# Establish the database connection
mydb = getMyDB()
mydb.reconnect()
cursor = mydb.cursor()


def getCurrentVersion(year):
    query = "SELECT currentVersion FROM version where year=%s"
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

    return version


def incrementVersion(year):
    update = "UPDATE version SET currentVersion = currentVersion + 1 where year=%s"
    values = [year]

    # Update the currentVersion for next time..
    try:
        cursor.execute(update, values)
    except mysql.connector.Error as e:
        print("ERROR udpating version table with next version")
        print(e)
