import { connect } from "react-redux";

import { AppState } from "store";

import { closeLabelDialog } from "store/learninghub/_labels/actions/editor.action";

const mapStateToProps = (state: AppState) => ({
  dialogOpen: state.learninghub.labels.editor.dialogOpen,
});

export const connector = connect(mapStateToProps, {
  closeLabelDialog,
});
