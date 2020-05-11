import React from "react";
import {
  WithStyles,
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  CardActions,
} from "@material-ui/core";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";

import ColorizeOutlinedIcon from "@material-ui/icons/ColorizeOutlined";
import VisibilityIcon from "@material-ui/icons/Visibility";
import ImportExportOutlined from "@material-ui/icons/ImportExportOutlined";

import { ConnectedProps } from "react-redux";

import { connector } from "./redux";

import { styles, wrapStyles } from "./styles";
import { LearningHubTools } from "store/learninghub/types/tools.types";

type LHToolsCardProps = WithStyles<typeof styles> &
  ConnectedProps<typeof connector>;

const LHToolsCard: React.FunctionComponent<LHToolsCardProps> = ({
  classes,
  ulseedsbyLabel,
  ulbuysell,
  learning,
  currenttool,
  handleLearn,
  changeTool,
}) => {
  const canLearn =
    Object.keys(ulseedsbyLabel).length > 0 || Object.keys(ulbuysell).length > 0;

  const handleToolChange = (
    _e: React.MouseEvent<HTMLElement, MouseEvent>,
    value: LearningHubTools
  ) => {
    changeTool(value);
  };

  return (
    <Card className={classes.root}>
      <CardContent className={classes.cardContent}>
        <Typography color="textSecondary" className={classes.descTexts}>
          Tools
        </Typography>
        <ToggleButtonGroup
          size="medium"
          value={currenttool}
          onChange={handleToolChange}
          exclusive
        >
          <ToggleButton key={1} value="BUYSELL">
            <ImportExportOutlined />
          </ToggleButton>
          <ToggleButton key={2} value="SEEDSELECT">
            <ColorizeOutlinedIcon />
          </ToggleButton>
          <ToggleButton key={3} value="TEST">
            <VisibilityIcon />
          </ToggleButton>
        </ToggleButtonGroup>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          color={"primary"}
          disabled={!canLearn}
          onClick={handleLearn}
          className={classes.learnButton}
        >
          {learning ? (
            <CircularProgress color="secondary" />
          ) : (
            <span>Learn</span>
          )}
        </Button>
      </CardActions>
    </Card>
  );
};

export default connector(wrapStyles(LHToolsCard));
