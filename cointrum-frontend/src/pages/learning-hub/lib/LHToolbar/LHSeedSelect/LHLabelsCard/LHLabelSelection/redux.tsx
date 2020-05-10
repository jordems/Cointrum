import { connect } from "react-redux";

import { AppState } from "store";

import { setCurrentLabel } from "store/learninghub/_labels/actions/current.action";

const mapStateToProps = (state: AppState) => ({
  current: state.learninghub.labels.current.label,
});

export const connector = connect(mapStateToProps, {
  setCurrentLabel,
});
