import React from "react";
import {
  WithStyles,
  Grid,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button
} from "@material-ui/core";
import { ConnectedProps } from "react-redux";

import { styles, wrapStyles } from "./styles";
import { connector } from "./redux";
import TypedTextField from "shared-components/form/textfield/TypedTextField";
import { ICreateLabel } from "models";
import TypedColourPicker from "shared-components/form/colourpicker/TypedColourPicker";

type LHLabelFormProps = WithStyles<typeof styles> &
  ConnectedProps<typeof connector>;

const LHLabelForm: React.FunctionComponent<LHLabelFormProps> = ({
  classes,
  form,
  error,
  editingLabel,
  updateLabelName,
  updateLabelDesc,
  updateLabelColour,
  closeLabelDialog,
  addLabeltoLibrary,
  editLabelinLibrary
}) => {
  const onSubmit = (e: any) => {
    e.preventDefault();

    const labelDetails: ICreateLabel = {
      ...form
    };

    if (editingLabel !== undefined) {
      editLabelinLibrary(editingLabel, labelDetails)
        .then(() => {
          closeLabelDialog();
        })
        .catch(err => {});
    } else {
      addLabeltoLibrary(labelDetails)
        .then(() => {
          closeLabelDialog();
        })
        .catch(err => {});
    }
  };

  return (
    <>
      <DialogTitle id="create-label">
        {editingLabel !== undefined ? "Editing Label" : "Create a new Label"}
      </DialogTitle>
      <DialogContent>
        <form onSubmit={onSubmit}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={10}>
              <TypedTextField
                label="Name"
                value={form.name}
                onValueChange={updateLabelName}
                required
              />
            </Grid>
            <Grid item xs={2}>
              <TypedColourPicker
                label="Label Colour"
                colour={form.colour}
                onValueChange={updateLabelColour}
              />
            </Grid>
            <Grid item xs={12}>
              <TypedTextField
                label="Description"
                multiline
                value={form.desc}
                onValueChange={updateLabelDesc}
              />
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeLabelDialog} color={"secondary"}>
          Cancel
        </Button>
        <Button onClick={onSubmit} autoFocus>
          {editingLabel !== undefined ? "Save" : "Create"}
        </Button>
      </DialogActions>
    </>
  );
};

export default connector(wrapStyles(LHLabelForm));
