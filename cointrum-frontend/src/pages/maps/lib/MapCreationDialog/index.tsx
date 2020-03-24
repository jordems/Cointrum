import React from "react";
import { WithStyles } from "@material-ui/core";
import { ConnectedProps } from "react-redux";

import { styles, wrapStyles } from "./styles";
import { connector } from "./redux";

import TypedDialog from "shared-components/dialog/TypedDialog";

import MapCreationForm from "./MapCreationForm";

type MapCreationDialogProps = WithStyles<typeof styles> &
  ConnectedProps<typeof connector>;

const MapCreationDialog: React.FunctionComponent<MapCreationDialogProps> = ({
  classes,
  dialogOpen,
  closeMapDialog
}) => {
  return (
    <>
      <TypedDialog
        open={dialogOpen}
        onClose={closeMapDialog}
        aria-labelledby="create-trading-map"
      >
        <MapCreationForm handleDismissDialog={closeMapDialog} />
      </TypedDialog>
    </>
  );
};

export default connector(wrapStyles(MapCreationDialog));
