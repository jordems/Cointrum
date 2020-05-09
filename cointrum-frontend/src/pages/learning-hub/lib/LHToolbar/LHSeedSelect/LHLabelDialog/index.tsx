import React from "react";
import { WithStyles, Grid } from "@material-ui/core";
import { ConnectedProps } from "react-redux";

import { styles, wrapStyles } from "./styles";
import { connector } from "./redux";

import TypedDialog from "shared-components/dialog/TypedDialog";

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
      <TypedDialog
        open={dialogOpen}
        fullWidth
        maxWidth="lg"
        onClose={closeLabelDialog}
        aria-labelledby="view-label-options"
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
          <Grid item>MapView OR LabelDetails</Grid>
        </Grid>
      </TypedDialog>
    </>
  );
};

export default connector(wrapStyles(LHLabelDialog));
