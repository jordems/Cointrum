import { connect } from "react-redux";

import { AppState } from "store";

import { openEditorLabelDialog } from "store/labels/actions/editor.actions";

const mapStateToProps = (state: AppState) => ({});

export const connector = connect(mapStateToProps, {
  openEditorLabelDialog
});
