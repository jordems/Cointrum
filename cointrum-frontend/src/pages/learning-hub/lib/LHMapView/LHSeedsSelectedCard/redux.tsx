import { connect } from "react-redux";

import { AppState } from "store";

import {
  clearSeedsUL,
  removeSeedfromlabelUL,
} from "store/seeds/actions/editor.action";

const mapStateToProps = (state: AppState) => ({
  ulseedsbyLabel: state.seeds.editor.ulseedsbyLabel,
  labels: state.labels.library.labels,
});

export const connector = connect(mapStateToProps, {
  clearSeedsUL,
  removeSeedfromlabelUL,
});
