import cfbd
import os
from dotenv import load_dotenv

load_dotenv()

configuration = cfbd.Configuration()
configuration.api_key['Authorization'] = os.getenv('CFB_API_KEY')
configuration.api_key_prefix['Authorization'] = 'Bearer'

api = cfbd.GamesApi(cfbd.ApiClient(configuration))
