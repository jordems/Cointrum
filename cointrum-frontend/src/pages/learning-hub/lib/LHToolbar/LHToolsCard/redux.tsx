import { connect } from "react-redux";

import { AppState } from "store";

import { learnSeeds } from "store/learninghub/_seeds/actions/editor.action";
import { changeTool } from "store/learninghub/actions/tools.action";

const mapStateToProps = (state: AppState) => ({
  ulseedsbyLabel: state.learninghub.seeds.editor.ulseedsbyLabel,
  learning: state.learninghub.seeds.editor.learning,
  currenttool: state.learninghub.tools.currenttool,
});

export const connector = connect(mapStateToProps, {
  learnSeeds,
  changeTool,
});
