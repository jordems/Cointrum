import React from "react";
import {
  WithStyles,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  Button
} from "@material-ui/core";
import { ConnectedProps } from "react-redux";

import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import { styles, wrapStyles } from "./styles";
import { connector } from "./redux";
import { ITradingMap } from "models";

type MapTupleOptionsProps = WithStyles<typeof styles> &
  ConnectedProps<typeof connector> & {
    map: ITradingMap;
  };

interface MapTupleOptionsState {
  deleteDialogActive: boolean;
}

class MapTupleOptions extends React.Component<MapTupleOptionsProps> {
  readonly state: MapTupleOptionsState = {
    deleteDialogActive: false
  };

  handleEditClick = () => {
    const { map } = this.props;

    this.props.openEditMapDialog(map);
  };

  handleDeleteClick = () => {
    this.setState({ deleteDialogActive: true });
  };

  handleDismissDeleteDialog = () => {
    this.setState({ deleteDialogActive: false });
  };
  handleDeleteMap = () => {
    this.props.removeMapfromLibrary(this.props.map._id);
    this.setState({ deleteDialogActive: false });
  };

  render() {
    const { deleteDialogActive } = this.state;
    const { map, classes } = this.props;
    return (
      <>
        <IconButton onClick={this.handleEditClick}>
          <EditIcon />
        </IconButton>

        <IconButton onClick={this.handleDeleteClick}>
          <DeleteIcon color="error" />
        </IconButton>
        <Dialog
          open={deleteDialogActive}
          onClose={this.handleDismissDeleteDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Are you sure you want to delete "{map.name}"?
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Once deleted, it is gone forever. There is no way to get it back!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleDismissDeleteDialog} autoFocus>
              Keep
            </Button>
            <Button
              className={classes.deleteButton}
              onClick={this.handleDeleteMap}
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

export default connector(wrapStyles(MapTupleOptions));
