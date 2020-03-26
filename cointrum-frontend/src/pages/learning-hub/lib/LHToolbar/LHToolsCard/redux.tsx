import { connect } from "react-redux";

import { AppState } from "store";

import { learnSeeds } from "store/seeds/actions/editor.action";

const mapStateToProps = (state: AppState) => ({
  ulseedsbyLabel: state.seeds.editor.ulseedsbyLabel,
  learning: state.seeds.editor.learning
});

export const connector = connect(mapStateToProps, { learnSeeds });
