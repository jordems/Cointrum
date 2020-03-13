import { connect } from "react-redux";

import { AppState } from "store";

const mapStateToProps = (state: AppState) => ({
  current: state.maps.current
});

export const connector = connect(mapStateToProps);
