import { connect } from "react-redux";

import { AppState } from "store";

import { closeLabelDialog } from "store/learninghub/_labels/actions/create.action";

const mapStateToProps = (state: AppState) => ({
  dialogOpen: state.learninghub.labels.create.dialogOpen,
});

export const connector = connect(mapStateToProps, {
  closeLabelDialog,
});
