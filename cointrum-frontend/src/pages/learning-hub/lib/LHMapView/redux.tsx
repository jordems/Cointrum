import { connect } from "react-redux";

import { AppState } from "store";

import { fetchInitialPHDS } from "store/phds/actions/library.action";

const mapStateToProps = (state: AppState) => ({
  error: state.phds.library.error,
  loading: state.phds.library.loading,
});

export const connector = connect(mapStateToProps, {
  fetchInitialPHDS,
});
