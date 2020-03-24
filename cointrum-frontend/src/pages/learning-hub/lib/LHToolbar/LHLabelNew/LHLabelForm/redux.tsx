import { connect } from "react-redux";

import { AppState } from "store";

import {
  closeLabelDialog,
  updateLabelName,
  updateLabelDesc,
  updateLabelColour
} from "store/labels/actions/create.action";

import {
  addLabeltoLibrary,
  editLabelinLibrary
} from "store/labels/actions/library.action";

const mapStateToProps = (state: AppState) => ({
  dialogOpen: state.labels.create.dialogOpen,
  form: state.labels.create.form,
  error: state.labels.create.error,
  editingLabel: state.labels.create.editing
});

export const connector = connect(mapStateToProps, {
  closeLabelDialog,
  updateLabelName,
  updateLabelDesc,
  updateLabelColour,
  addLabeltoLibrary,
  editLabelinLibrary
});
