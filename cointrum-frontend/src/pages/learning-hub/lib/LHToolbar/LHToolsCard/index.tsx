import React from "react";
import {
  WithStyles,
  Card,
  CardContent,
  Typography,
  Button,
  Divider
} from "@material-ui/core";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";

import SpaceBarIcon from "@material-ui/icons/SpaceBar";
import ColorizeOutlinedIcon from "@material-ui/icons/ColorizeOutlined";
import VisibilityIcon from "@material-ui/icons/Visibility";

import { ConnectedProps } from "react-redux";

import { connector } from "./redux";

import { styles, wrapStyles } from "./styles";

type LHToolsCardProps = WithStyles<typeof styles> &
  ConnectedProps<typeof connector>;

const LHToolsCard: React.FunctionComponent<LHToolsCardProps> = ({
  classes,
  ulseedsbyLabel
}) => {
  const selectedSeeds = Object.keys(ulseedsbyLabel).length;

  return (
    <Card style={{ textAlign: "center" }}>
      <CardContent>
        <Typography color="textSecondary" className={classes.descTexts}>
          Seed Selection Tools
        </Typography>
        <ToggleButtonGroup size="medium" value={"test1"} exclusive>
          <ToggleButton key={2} value="test1">
            <ColorizeOutlinedIcon />
          </ToggleButton>
          <ToggleButton key={1} value="test2">
            <SpaceBarIcon />
          </ToggleButton>
          <ToggleButton key={3} value="test3">
            <VisibilityIcon />
          </ToggleButton>
        </ToggleButtonGroup>
        <Divider />
        <Button
          variant="contained"
          color={"primary"}
          disabled={selectedSeeds === 0}
        >
          Learn
          <Typography variant="caption">
            ({selectedSeeds && selectedSeeds} seeds)
          </Typography>
        </Button>
      </CardContent>
    </Card>
  );
};

export default connector(wrapStyles(LHToolsCard));
