import { connect } from "react-redux";

import { AppState } from "store";

import { handleChartSelection } from "store/learninghub/actions/tools.action";
import { fetchPHDSRange } from "store/phds/actions/library.action";

const mapStateToProps = (state: AppState) => ({
  phds: state.phds.library.phdselements,
  error: state.phds.library.error,
  loading: state.phds.library.loading,
  labels: state.learninghub.labels.library.labels,
  ulseedsbyLabel: state.learninghub.seeds.editor.ulseedsbyLabel,
  cycleduration: state.maps.current.map?.cycleduration,
  currenttool: state.learninghub.tools.currenttool,
});

export const connector = connect(mapStateToProps, {
  handleChartSelection,
  fetchPHDSRange,
});
