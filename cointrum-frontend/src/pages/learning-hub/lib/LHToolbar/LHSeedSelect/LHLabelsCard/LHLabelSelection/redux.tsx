import { connect } from "react-redux";

import { AppState } from "store";

import { setCurrentLabel } from "store/labels/actions/current.action";

const mapStateToProps = (state: AppState) => ({
  current: state.labels.current.label
});

export const connector = connect(mapStateToProps, {
  setCurrentLabel
});
