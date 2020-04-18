import { connect } from "react-redux";

import { AppState } from "store";

import { learnSeeds, changeSeedTool } from "store/seeds/actions/editor.action";

const mapStateToProps = (state: AppState) => ({
  ulseedsbyLabel: state.seeds.editor.ulseedsbyLabel,
  learning: state.seeds.editor.learning,
  seedtool: state.seeds.editor.seedtool
});

export const connector = connect(mapStateToProps, {
  learnSeeds,
  changeSeedTool
});
