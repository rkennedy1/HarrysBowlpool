from dataclasses import dataclass
import mysql.connector
from mysql.connector import errorcode
import os
from dotenv import load_dotenv

load_dotenv()


def getMyDB():
    try:
        mydb = mysql.connector.connect(
            host=os.getenv("MYSQL_HOST"),
            user=os.getenv("MYSQL_USER"),
            password=os.getenv("MYSQL_PASSWORD"),
            database=os.getenv("MYSQL_DATABASE"),
            raise_on_warnings=True,
        )
    except mysql.connector.Error as err:
        if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
            print("Something is wrong with your user name or password")
        elif err.errno == errorcode.ER_BAD_DB_ERROR:
            print("Database does not exist")
        else:
            print(err)
    else:
        mydb.close()
    return mydb
