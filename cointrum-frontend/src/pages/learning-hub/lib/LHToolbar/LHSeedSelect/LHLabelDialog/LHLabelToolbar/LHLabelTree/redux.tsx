import { connect } from "react-redux";

import { AppState } from "store";

import { openEditLabelDialog } from "store/learninghub/_labels/actions/create.action";

const mapStateToProps = (state: AppState) => ({
  labels: state.learninghub.labels.library.labels,
  seedsbyLabel: state.learninghub.seeds.library.seedsbyLabel,
});

export const connector = connect(mapStateToProps, {
  openEditLabelDialog,
});
