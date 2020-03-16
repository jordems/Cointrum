import React from "react";
import { Link } from "react-router-dom";
import {
  WithStyles,
  Card,
  CardActions,
  CardContent,
  Typography,
  Button
} from "@material-ui/core";

import { styles, wrapStyles } from "./styles";
import { ITradingMap } from "models";

type TradingMapCardProps = WithStyles<typeof styles> & {
  currentTradingMap: ITradingMap | null;
};

const TradingMapCard: React.FunctionComponent<TradingMapCardProps> = ({
  classes,
  currentTradingMap
}) => {
  if (currentTradingMap === null) {
    return (
      <Card style={{ textAlign: "left" }}>
        <CardContent>
          <Typography component="h2" className={classes.mapTitle}>
            No Map Loaded
          </Typography>
        </CardContent>
        <CardActions>
          <Link to="/maps">
            <Button size="small" style={{ marginLeft: "auto" }}>
              Select Map
            </Button>
          </Link>
        </CardActions>
      </Card>
    );
  } else {
    return (
      <Card style={{ textAlign: "left" }}>
        <CardContent>
          <Typography color="textSecondary" className={classes.descTexts}>
            {currentTradingMap.exchange}
          </Typography>
          <Typography component="h2" className={classes.mapTitle}>
            {currentTradingMap.name}
          </Typography>

          <Typography color="textSecondary" className={classes.descTexts}>
            {currentTradingMap.basecurrency} - {currentTradingMap.altcurrency}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Edit Map</Button>
          <Link to="/maps">
            <Button size="small" style={{ marginLeft: "auto" }}>
              Select Map
            </Button>
          </Link>
        </CardActions>
      </Card>
    );
  }
};

export default wrapStyles(TradingMapCard);
