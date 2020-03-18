import React from "react";
import { WithStyles, Dialog, Grid } from "@material-ui/core";
import { ConnectedProps } from "react-redux";

import { styles, wrapStyles } from "./styles";
import { connector } from "./redux";

import LHLabelToolbar from "./LHLabelToolbar";

type LHLabelDialogProps = WithStyles<typeof styles> &
  ConnectedProps<typeof connector>;

const LHLabelDialog: React.FunctionComponent<LHLabelDialogProps> = ({
  classes,
  dialogOpen,
  closeLabelDialog
}) => {
  return (
    <>
      <Dialog
        open={dialogOpen}
        fullWidth
        maxWidth="lg"
        onClose={closeLabelDialog}
        aria-labelledby="create-trading-map-title"
      >
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
        >
          <Grid item>
            <LHLabelToolbar />
          </Grid>
          <Grid item>MapView</Grid>
        </Grid>
      </Dialog>
    </>
  );
};

export default connector(wrapStyles(LHLabelDialog));
