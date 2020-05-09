import { connect } from "react-redux";

import { AppState } from "store";

const mapStateToProps = (state: AppState) => ({
  // current: state.labels.current.label
});

export const connector = connect(mapStateToProps, {
  // setCurrentLabel
});
