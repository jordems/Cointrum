import React from "react";
import { WithStyles, Dialog } from "@material-ui/core";
import { ConnectedProps } from "react-redux";

import { styles, wrapStyles } from "./styles";
import { connector } from "./redux";

import MapCreationForm from "./../MapCreationForm";

type MapCreationDialogProps = WithStyles<typeof styles> &
  ConnectedProps<typeof connector>;

const MapCreationDialog: React.FunctionComponent<MapCreationDialogProps> = ({
  classes,
  dialogOpen,
  closeMapDialog
}) => {
  return (
    <>
      <Dialog
        open={dialogOpen}
        onClose={closeMapDialog}
        aria-labelledby="create-trading-map-title"
      >
        <MapCreationForm handleDismissDialog={closeMapDialog} />
      </Dialog>
    </>
  );
};

export default connector(wrapStyles(MapCreationDialog));
