# Cointrum

The end product of Cointrum will be a Trading bot that will use trading indicators created by a label based Machine Learning Models. In layman's terms it will take examples of what has happened in the past, and use these to 'predict' the future. The goal of this project is not to make money, if it were that easy this would have already been created. The goal is to learn about market strategies and Machine learning techniques. Although, this trading bot will be free for use for anyone who wants to use it via a website interface. The idea of this project is not to make the 'perfect' training model itself. But, supply the tools for everyone to work together, share and find ways to 'predict' the market

## Installation

1. Installs all node dependencies in front-end and back-end.

```
$ npm run installdeps
```

2. Set up a `.env` file in Cointrum/cointrum-mainapi/.env with MongoDB and BinanceAPI Keys

```
DB_URL=
DB_USER=
DB_PASS=

BINANCE_API_KEY=
BINANCE_API_SECRET_KEY=
```

## Run Development Environment

```
$ npm run dev
```

## /docs

Software documentation for the Cointrum idea.

## /cointrum-frontend

ReactJS (Typescript) Website interface for the Cointrum app.

## /cointrum-mainapi

RESTful NodeJS-Express (Typescript).
