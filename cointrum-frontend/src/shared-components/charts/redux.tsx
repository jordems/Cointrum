import { connect } from "react-redux";

import { AppState } from "store";

import { addSeedtoLabelUL } from "store/seeds/actions/editor.action";
import { testCandles } from "./TESTDATA";

const mapStateToProps = (state: AppState) => ({
  ulseedsbyLabel: state.seeds.editor.ulseedsbyLabel,
  mode: state.seeds.editor.seedtool,
  labels: state.labels.library.labels,
  phds: testCandles,
});

export const connector = connect(mapStateToProps, {
  addSeedtoLabelUL,
});
