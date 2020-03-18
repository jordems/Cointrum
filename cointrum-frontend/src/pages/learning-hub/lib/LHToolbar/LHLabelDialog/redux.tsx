import { connect } from "react-redux";

import { AppState } from "store";

import { closeLabelDialog } from "store/labels/actions/editor.actions";

const mapStateToProps = (state: AppState) => ({
  dialogOpen: state.labels.editor.dialogOpen
});

export const connector = connect(mapStateToProps, {
  closeLabelDialog
});
