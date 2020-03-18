import React from "react";
import { WithStyles, Card, CardContent, Typography } from "@material-ui/core";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";

import SpaceBarIcon from "@material-ui/icons/SpaceBar";
import ColorizeOutlinedIcon from "@material-ui/icons/ColorizeOutlined";
import VisibilityIcon from "@material-ui/icons/Visibility";

import { styles, wrapStyles } from "./styles";

type LHToolsCardProps = WithStyles<typeof styles> & {};

const LHToolsCard: React.FunctionComponent<LHToolsCardProps> = ({
  classes
}) => {
  return (
    <Card style={{ textAlign: "center" }}>
      <CardContent>
        <Typography color="textSecondary" className={classes.descTexts}>
          Seed Selection Tools
        </Typography>
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
      </CardContent>
    </Card>
  );
};

export default wrapStyles(LHToolsCard);
