import { connect } from "react-redux";

import { AppState } from "store";

import { openCreateLabelDialog } from "store/learninghub/_labels/actions/create.action";
import { openEditorLabelDialog } from "store/learninghub/_labels/actions/editor.action";

import { fetchLabelLibrary } from "store/learninghub/_labels/actions/library.action";
import { fetchSeedsByLabel } from "store/learninghub/_seeds/actions/library.action";

const mapStateToProps = (state: AppState) => ({
  labels: state.learninghub.labels.library.labels,
  loading: state.learninghub.labels.library.loadingLabels,
  error: state.learninghub.labels.library.error,
});

export const connector = connect(mapStateToProps, {
  openCreateLabelDialog,
  openEditorLabelDialog,
  fetchLabelLibrary,
  fetchSeedsByLabel,
});
