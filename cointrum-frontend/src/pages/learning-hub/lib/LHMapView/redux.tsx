import { connect } from "react-redux";

import { AppState } from "store";

import { addSeedtoLabelUL } from "store/seeds/actions/editor.action";

const mapStateToProps = (state: AppState) => ({
  ulseedsbyLabel: state.seeds.editor.ulseedsbyLabel,
  seedtool: state.seeds.editor.seedtool
});

export const connector = connect(mapStateToProps, {
  addSeedtoLabelUL
});
