import React from "react";
import { WithStyles, Dialog } from "@material-ui/core";
import { ConnectedProps } from "react-redux";

import { styles, wrapStyles } from "./styles";
import { connector } from "./redux";

import LHLabelForm from "./LHLabelForm";

type LHLabelNewProps = WithStyles<typeof styles> &
  ConnectedProps<typeof connector>;

const LHLabelNew: React.FunctionComponent<LHLabelNewProps> = ({
  classes,
  dialogOpen,
  closeLabelDialog
}) => {
  return (
    <>
      <Dialog
        open={dialogOpen}
        onClose={closeLabelDialog}
        aria-labelledby="create-label"
      >
        <LHLabelForm />
      </Dialog>
    </>
  );
};

export default connector(wrapStyles(LHLabelNew));
