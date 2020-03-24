import React from "react";
import { WithStyles, Dialog, DialogProps, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

import { styles, wrapStyles } from "./styles";

type LHLabelDialogProps = DialogProps &
  WithStyles<typeof styles> & {
    open: boolean;
    onClose: () => void;
  };

const LHLabelDialog: React.FunctionComponent<LHLabelDialogProps> = ({
  classes,
  open,
  onClose,
  children,
  ...others
}) => {
  return (
    <Dialog open={open} {...others} onClose={onClose}>
      <div className={classes.closeIconContainer}>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </div>
      {children}
    </Dialog>
  );
};

export default wrapStyles(LHLabelDialog);
