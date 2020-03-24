import React from "react";
import {
  WithStyles,
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
  CircularProgress
} from "@material-ui/core";

import LHLabelSelection from "./LHLabelSelection";

import { styles, wrapStyles } from "./styles";
import { ConnectedProps } from "react-redux";

import { connector } from "./redux";

type LHLabelsCardProps = WithStyles<typeof styles> &
  ConnectedProps<typeof connector>;

class LHLabelsCard extends React.Component<LHLabelsCardProps> {
  componentDidMount() {
    this.props.fetchLabelLibrary();
  }

  render() {
    const {
      classes,
      labels,
      loading,
      error,
      openCreateLabelDialog,
      openEditorLabelDialog
    } = this.props;

    return (
      <Card style={{ textAlign: "center" }}>
        <CardContent>
          <Typography color="textSecondary" className={classes.descTexts}>
            Labels
          </Typography>
          {loading ? (
            <CircularProgress />
          ) : (
            <LHLabelSelection labels={labels} />
          )}
        </CardContent>
        <CardActions>
          <Button size="small" onClick={openCreateLabelDialog}>
            New Label
          </Button>
          <Button
            size="small"
            style={{ marginLeft: "auto" }}
            onClick={openEditorLabelDialog}
          >
            Edit Labels
          </Button>
        </CardActions>
      </Card>
    );
  }
}

export default connector(wrapStyles(LHLabelsCard));
