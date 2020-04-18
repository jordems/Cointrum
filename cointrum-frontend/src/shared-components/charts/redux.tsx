import { connect } from "react-redux";

import { AppState } from "store";

import { addSeedtoLabelUL } from "store/seeds/actions/editor.action";
import { testCandles } from "./TESTDATA";

const mapStateToProps = (state: AppState) => ({
  mode: state.seeds.editor.seedtool,
  currentLabel: state.labels.current.label,
  phds: testCandles,
});

export const connector = connect(mapStateToProps, {
  addSeedtoLabelUL,
});
