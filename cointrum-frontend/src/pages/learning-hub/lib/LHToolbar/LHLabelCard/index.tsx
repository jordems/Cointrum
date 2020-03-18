import React from "react";
import {
  WithStyles,
  Card,
  CardContent,
  Typography,
  ButtonGroup,
  Button,
  CardActions
} from "@material-ui/core";

import { styles, wrapStyles } from "./styles";
import { ConnectedProps } from "react-redux";

import { connector } from "./redux";

type LHLabelCardProps = WithStyles<typeof styles> &
  ConnectedProps<typeof connector>;

const LHLabelCard: React.FunctionComponent<LHLabelCardProps> = ({
  classes,
  openEditorLabelDialog
}) => {
  return (
    <Card style={{ textAlign: "center" }}>
      <CardContent>
        <Typography color="textSecondary" className={classes.descTexts}>
          Labels
        </Typography>
        <ButtonGroup orientation="vertical">
          <Button value={"label1"}>Label 1</Button>
          <Button value={"label2"}>Label 2</Button>
          <Button value={"label3"}>Label 3</Button>
        </ButtonGroup>
      </CardContent>
      <CardActions>
        <Button size="small">New Label</Button>
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
};

export default connector(wrapStyles(LHLabelCard));
