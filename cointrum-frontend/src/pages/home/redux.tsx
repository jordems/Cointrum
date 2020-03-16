import { connect } from "react-redux";

import { AppState } from "store";

import {
  addMessagetoTest,
  removeMessagefromTest
} from "store/learning/actions/test.action";

const mapStateToProps = (state: AppState) => ({
  test: state.learning.test
});

export const connector = connect(mapStateToProps, {
  addMessagetoTest,
  removeMessagefromTest
});
