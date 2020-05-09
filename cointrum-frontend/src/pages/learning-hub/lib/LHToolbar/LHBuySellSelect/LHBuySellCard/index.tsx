import React from "react";
import {
  WithStyles,
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
} from "@material-ui/core";

import LHBuySellSelection from "./LHBuySellSelection";

import { styles, wrapStyles } from "./styles";
import { ConnectedProps } from "react-redux";

import { connector } from "./redux";

type LHBuySellCardProps = WithStyles<typeof styles> &
  ConnectedProps<typeof connector>;

class LHBuySellCard extends React.Component<LHBuySellCardProps> {
  componentDidMount() {
    // this.props.fetchLabelLibrary().then((labels) => {
    //   labels.forEach((label) => {
    //     this.props.fetchSeedsByLabel(label);
    //   });
    // });
  }

  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.root}>
        <CardContent className={classes.cardContent}>
          <Typography color="textSecondary" className={classes.descTexts}>
            Buy / Sell Selection
          </Typography>

          <LHBuySellSelection />
        </CardContent>
        <CardActions>
          <Button
            size="small"
            style={{ marginLeft: "auto" }}
            // onClick={openEditorLabelDialog}
          >
            Selections
          </Button>
        </CardActions>
      </Card>
    );
  }
}

export default connector(wrapStyles(LHBuySellCard));
