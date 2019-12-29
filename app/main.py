from db.Database import Database
from binance.client import Client


client = Client("tHZJavLc4cNS4rOAstrMuTKGE0a7ZeHjbjwgWs45w0wCupPEOYIAxYsDDXhOIzeD",
                "ecKhkLqO7RSy7kW3schS9Ig8dfEJOMfGF3LIO0fq6IhXDi6TePaWIOAAjNYC1pZS")
db = Database("cointracker")
db.db

# fetch 1 minute klines for the last day up until now
klines = client.get_historical_klines(
    "BNBBTC", Client.KLINE_INTERVAL_1DAY, "30 days ago PST")

for kline in klines:
    print(kline)
