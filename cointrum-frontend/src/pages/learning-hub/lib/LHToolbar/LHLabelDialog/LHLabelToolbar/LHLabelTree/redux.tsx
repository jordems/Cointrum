import { connect } from "react-redux";

import { AppState } from "store";

import { openEditLabelDialog } from "store/labels/actions/create.action";

const mapStateToProps = (state: AppState) => ({
  labels: state.labels.library.labels,
  seedsbyLabel: state.seeds.library.seedsbyLabel
});

export const connector = connect(mapStateToProps, {
  openEditLabelDialog
});
