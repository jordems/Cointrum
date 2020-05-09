import { connect } from "react-redux";

import { AppState } from "store";

import { handleSelection } from "store/learninghub/actions/tools.action";
import { fetchPHDSRange } from "store/phds/actions/library.action";

const mapStateToProps = (state: AppState) => ({
  phds: state.phds.library.phdselements,
  error: state.phds.library.error,
  loading: state.phds.library.loading,
  labels: state.labels.library.labels,
  ulseedsbyLabel: state.seeds.editor.ulseedsbyLabel,
  cycleduration: state.maps.current.map?.cycleduration,
  seedtool: state.learninghub.tools.seedtool,
});

export const connector = connect(mapStateToProps, {
  handleSelection,
  fetchPHDSRange,
});
