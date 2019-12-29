import atexit
from pymongo import MongoClient
from pymongo.errors import ConfigurationError, ConnectionFailure
from db.DBError import DBError

# Database Class
# @Purpose: class is to handle ALL direct connections to the MongoDB database.
# @Usage: When using this class do "with Database() as db"
# Class will auto Close Connection at the end of program


class Database:
    def __init__(self, database):
        self.client = MongoClient()
        try:
            self.db = self.client[database]

            # Set so Connection Auto Closes on Program Termination
            atexit.register(self.cleanup)

        except (ConfigurationError, ConnectionFailure) as err:
            print("Can't Connect to MongoDatabase")
            raise DBError(err)

    # def insert_one(self, collection, document):
    #     try:
    #         return self.db[collection].insert_one(document)
    #     except Exception as err:
    #         print("Data Insertion Failed")
    #         raise DBError(err)

    def cleanup(self):
        print("Closing DB Client")
        self.client.close()
