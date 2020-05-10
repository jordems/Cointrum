import { connect } from "react-redux";

import { AppState } from "store";

import { setCurrentLabel } from "store/learninghub/_buysell/actions/current.action";

const mapStateToProps = (state: AppState) => ({
  selection: state.learninghub.buysell.current.selection,
});

export const connector = connect(mapStateToProps, {
  setCurrentLabel,
});
