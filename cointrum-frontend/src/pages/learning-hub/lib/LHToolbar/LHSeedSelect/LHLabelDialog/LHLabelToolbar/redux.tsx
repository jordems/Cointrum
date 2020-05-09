import { connect } from "react-redux";

import { AppState } from "store";

import { closeMapDialog } from "store/maps/actions/create.action";

const mapStateToProps = (state: AppState) => ({
  dialogOpen: state.maps.create.dialogOpen
});

export const connector = connect(mapStateToProps, {
  closeMapDialog
});
