# Ideas to use when developing app

## Starting Ideas

A AI model will be trained from previous data. We will call this the Permanent Historical Data Bank (PHDB).

- This Data is used to actully be the data models main source
- This data will have labels for data types, and seeds for situations where finical patterns have occured with data snippets.
- Once trained, No further data will be added to the model

From the PHDB there will be calculations made from this data into readable indicator data called Seeding Indicator Data (SID).

Then there will be non-persistant(temp) data of the current day/week/month called the Temporary Current Data Set (TCDS)

- This data will be fetched freshly each time the program is run (unless it already has it)
- Current data constantly added via websocket of pricing data

From the TCDS there will be consantly be calculations made from this data into readable indicator data called Temporary Indicator Data (TID).

Now this is where we will be constantly comparing the TID against the SID to match patterns and attempt to predict the pricing outcomes of the coin.

- Will be predicting by minute, hour, day, month against some data that has already happend
- Then we will start attempting to predict realtime trading data
- Then the next step is to determine how we can set up a bot to trade throughout the time line
