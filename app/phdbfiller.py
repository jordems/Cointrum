# This Class is used to Fill the Permanent Historical Data Bank (phdb) into the Mongodb
# * Used to grab historical data from binance to use for Training when creating the Seeding Indicator Data for the AI

# Current State of File
# * Use's Preset Parameters to add data into phdb database

from db.Database import Database
from binance.client import Client

# Preset Parameters
BINANCE_PAIR = "BNBBTC"
PHDB_PAIR = "BNB-BTC"
TIME_INTERVAL = Client.KLINE_INTERVAL_1HOUR
TIME_SPAN = "3 years ago PST"

client = Client("tHZJavLc4cNS4rOAstrMuTKGE0a7ZeHjbjwgWs45w0wCupPEOYIAxYsDDXhOIzeD",
                "ecKhkLqO7RSy7kW3schS9Ig8dfEJOMfGF3LIO0fq6IhXDi6TePaWIOAAjNYC1pZS")
db = Database("phdb")

klines = client.get_historical_klines(
    BINANCE_PAIR, TIME_INTERVAL, TIME_SPAN)

phdbDocs = []

for kline in klines:
    phdbDocs.append({
        "_id": kline[0],
        "priceopen": float(kline[1]),
        "pricehigh": float(kline[2]),
        "pricelow": float(kline[3]),
        "priceclose": float(kline[4]),
        "volumeamount": float(kline[5]),
        "closetime": kline[6],
        "quoteassetvolume": float(kline[7]),
        "tradescount": kline[8],
        "takerbuybaseassetvol": float(kline[9]),
        "takerbuyquoteassetvol": float(kline[10]),
        "rdoub": kline[11]
    })

db.db[PHDB_PAIR].insert_many(phdbDocs)
