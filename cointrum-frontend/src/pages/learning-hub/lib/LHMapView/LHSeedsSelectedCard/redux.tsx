import { connect } from "react-redux";

import { AppState } from "store";

import {
  clearSeedsUL,
  removeSeedfromlabelUL,
} from "store/learninghub/_seeds/actions/editor.action";

const mapStateToProps = (state: AppState) => ({
  ulseedsbyLabel: state.learninghub.seeds.editor.ulseedsbyLabel,
  labels: state.learninghub.labels.library.labels,
});

export const connector = connect(mapStateToProps, {
  clearSeedsUL,
  removeSeedfromlabelUL,
});
