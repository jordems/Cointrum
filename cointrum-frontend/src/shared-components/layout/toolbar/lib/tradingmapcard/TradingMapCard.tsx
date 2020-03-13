import React from "react";
import {
  WithStyles,
  Card,
  CardActions,
  CardContent,
  Typography,
  Button
} from "@material-ui/core";

import { styles, wrapStyles } from "./styles";

type TradingMapCardProps = WithStyles<typeof styles>;

const TradingMapCard: React.FunctionComponent<TradingMapCardProps> = ({
  classes
}) => {
  return (
    <Card style={{ textAlign: "left" }}>
      <CardContent>
        <Typography color="textSecondary" className={classes.descTexts}>
          Binance
        </Typography>
        <Typography component="h2" className={classes.mapTitle}>
          Map Title
        </Typography>

        <Typography color="textSecondary" className={classes.descTexts}>
          USDT - BNB
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Edit Map</Button>
        <Button size="small" style={{ marginLeft: "auto" }}>
          Select Map
        </Button>
      </CardActions>
    </Card>
  );
};

export default wrapStyles(TradingMapCard);
