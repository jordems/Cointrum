import { connect } from "react-redux";

import { AppState } from "store";

import { closeLabelDialog } from "store/labels/actions/create.action";

const mapStateToProps = (state: AppState) => ({
  dialogOpen: state.labels.create.dialogOpen
});

export const connector = connect(mapStateToProps, {
  closeLabelDialog
});
