import React from "react";
import {
  WithStyles,
  Card,
  CardActions,
  CardContent,
  Typography
} from "@material-ui/core";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";

import SpaceBarIcon from "@material-ui/icons/SpaceBar";
import ColorizeOutlinedIcon from "@material-ui/icons/ColorizeOutlined";
import VisibilityIcon from "@material-ui/icons/Visibility";

import { styles, wrapStyles } from "./styles";
import { ITradingMap } from "models";

type LHToolsCardProps = WithStyles<typeof styles> & {
  currentTradingMap: ITradingMap | null;
};

const LHToolsCard: React.FunctionComponent<LHToolsCardProps> = ({
  classes,
  currentTradingMap
}) => {
  return (
    <Card style={{ textAlign: "left" }}>
      <CardContent>
        <Typography component="h2" className={classes.mapTitle}>
          Seed Selection
        </Typography>
        <Typography color="textSecondary" className={classes.descTexts}>
          Tools
        </Typography>
      </CardContent>
      <CardActions>
        <ToggleButtonGroup size="medium" value={"test1"} exclusive>
          <ToggleButton key={2} value="test2">
            <ColorizeOutlinedIcon />
          </ToggleButton>
          <ToggleButton key={1} value="test1">
            <SpaceBarIcon />
          </ToggleButton>
          <ToggleButton key={3} value="test3">
            <VisibilityIcon />
          </ToggleButton>
        </ToggleButtonGroup>
      </CardActions>
    </Card>
  );
};

export default wrapStyles(LHToolsCard);
