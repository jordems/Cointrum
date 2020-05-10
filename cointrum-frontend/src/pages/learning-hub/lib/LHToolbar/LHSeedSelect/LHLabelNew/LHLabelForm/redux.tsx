import { connect } from "react-redux";

import { AppState } from "store";

import {
  closeLabelDialog,
  updateLabelName,
  updateLabelDesc,
  updateLabelColour,
} from "store/learninghub/_labels/actions/create.action";

import {
  addLabeltoLibrary,
  editLabelinLibrary,
} from "store/learninghub/_labels/actions/library.action";

const mapStateToProps = (state: AppState) => ({
  dialogOpen: state.learninghub.labels.create.dialogOpen,
  form: state.learninghub.labels.create.form,
  error: state.learninghub.labels.create.error,
  editingLabel: state.learninghub.labels.create.editing,
});

export const connector = connect(mapStateToProps, {
  closeLabelDialog,
  updateLabelName,
  updateLabelDesc,
  updateLabelColour,
  addLabeltoLibrary,
  editLabelinLibrary,
});
