
import plotly.graph_objects as go
from datetime import datetime


# Candle Stick Class
# @Purpose: Display input data as a CandleStick Graph
@dataclass
class InputDataTuple:
    _id: int
    priceopen: float
    pricehigh: float
    pricelow: float
    priceclose: float
    volumeamount: int
    closetime: int
    quoteassetvolume: float
    tradescount: int
    takerbuybaseassetvol: int
    takerbuyquiteassetvol: float
    rdoub: str


class CandleStickGraph:
    def __init__(self, inputdata: InputDataTuple):
        self.fig = go.Figure(data=[go.Candlestick(x=inputdata['_id'], open=inputdata['priceopen'],
                                                  high=inputdata['priceclose'], low=inputdata['pricelow'], close=inputdata['priceclose'])])

    def draw(self):
        self.fig.show()
