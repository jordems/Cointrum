import { connect } from "react-redux";

import { AppState } from "store";

import { learnSeeds } from "store/seeds/actions/editor.action";
import { changeSeedTool } from "store/learninghub/actions/tools.action";

const mapStateToProps = (state: AppState) => ({
  ulseedsbyLabel: state.seeds.editor.ulseedsbyLabel,
  learning: state.seeds.editor.learning,
  seedtool: state.learninghub.tools.seedtool,
});

export const connector = connect(mapStateToProps, {
  learnSeeds,
  changeSeedTool,
});
