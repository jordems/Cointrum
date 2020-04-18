import React from "react";
import { WithStyles, Paper, Grid, Typography } from "@material-ui/core";
import { ConnectedProps } from "react-redux";

import { styles, wrapStyles } from "./styles";
import { connector } from "./redux";

import LHLabelTree from "./LHLabelTree";

type LHLabelToolbarProps = WithStyles<typeof styles> &
  ConnectedProps<typeof connector>;

const LHLabelToolbar: React.FunctionComponent<LHLabelToolbarProps> = ({
  classes
}) => {
  return (
    <Paper className={classes.root}>
      <Grid
        container
        direction="column"
        justify="space-between"
        alignItems="center"
      >
        <Grid item>
          <Typography color="textSecondary" className={classes.descTexts}>
            Labels
          </Typography>
        </Grid>
        <Grid item>
          <LHLabelTree />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default connector(wrapStyles(LHLabelToolbar));
