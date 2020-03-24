import React from "react";
import { WithStyles } from "@material-ui/core";
import { ConnectedProps } from "react-redux";

import { styles, wrapStyles } from "./styles";
import { connector } from "./redux";

import TypedDialog from "shared-components/dialog/TypedDialog";

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
      <TypedDialog
        open={dialogOpen}
        onClose={closeLabelDialog}
        aria-labelledby="create-label"
      >
        <LHLabelForm />
      </TypedDialog>
    </>
  );
};

export default connector(wrapStyles(LHLabelNew));
