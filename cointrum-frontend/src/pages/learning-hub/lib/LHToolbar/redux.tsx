import { connect } from "react-redux";

import { AppState } from "store";

const mapStateToProps = (state: AppState) => ({
  current: state.maps.current,
  currenttool: state.learninghub.tools.currenttool,
});

export const connector = connect(mapStateToProps);
