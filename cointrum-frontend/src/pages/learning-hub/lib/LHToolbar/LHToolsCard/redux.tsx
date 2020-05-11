import { connect } from "react-redux";

import { AppState } from "store";

import { handleLearn } from "store/learninghub/actions/tools.action";
import { changeTool } from "store/learninghub/actions/tools.action";

const mapStateToProps = (state: AppState) => ({
  ulseedsbyLabel: state.learninghub.seeds.editor.ulseedsbyLabel,
  ulbuysell: state.learninghub.buysell.editor.ulbuysell,
  learning: state.learninghub.seeds.editor.learning,
  currenttool: state.learninghub.tools.currenttool,
});

export const connector = connect(mapStateToProps, {
  handleLearn,
  changeTool,
});
