import cfbd
import os
from dotenv import load_dotenv

load_dotenv()

configuration = cfbd.Configuration(access_token=os.getenv("CFB_API_KEY"))

api = cfbd.GamesApi(cfbd.ApiClient(configuration))
