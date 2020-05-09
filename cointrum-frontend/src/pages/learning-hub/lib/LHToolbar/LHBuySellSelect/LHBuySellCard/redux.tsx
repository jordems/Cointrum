import { connect } from "react-redux";

import { AppState } from "store";

// import { openCreateLabelDialog } from "store/labels/actions/create.action";
// import { openEditorLabelDialog } from "store/labels/actions/editor.action";

// import { fetchLabelLibrary } from "store/labels/actions/library.action";
// import { fetchSeedsByLabel } from "store/seeds/actions/library.action";

const mapStateToProps = (state: AppState) => ({
  // labels: state.labels.library.labels,
  // loading: state.labels.library.loadingLabels,
  // error: state.labels.library.error
});

export const connector = connect(mapStateToProps, {
  // openCreateLabelDialog,
  // openEditorLabelDialog,
  // fetchLabelLibrary,
  // fetchSeedsByLabel
});
