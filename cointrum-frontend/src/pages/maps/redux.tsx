import { connect } from "react-redux";

import { AppState } from "store";

const mapStateToProps = (state: AppState) => ({
  test: state.learning.test
});

export const connector = connect(mapStateToProps, {});
