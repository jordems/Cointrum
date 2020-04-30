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

import { ConnectedProps } from "react-redux";

import { connector } from "./redux";

import { styles, wrapStyles } from "./styles";

type LHToolsCardProps = WithStyles<typeof styles> &
  ConnectedProps<typeof connector>;

const LHToolsCard: React.FunctionComponent<LHToolsCardProps> = ({
  classes,
  ulseedsbyLabel,
  learning,
  seedtool,
  learnSeeds,
  changeSeedTool,
}) => {
  let selectedSeeds = 0;
  Object.keys(ulseedsbyLabel).forEach((labelID) => {
    selectedSeeds += Object.keys(ulseedsbyLabel[labelID]).length;
  });

  const handleToolChange = (
    _e: React.MouseEvent<HTMLElement, MouseEvent>,
    value: "SEEDSELECT" | "VIEW" | "TEST"
  ) => {
    console.log(value);
    if (value) {
      changeSeedTool(value);
    }
  };

  return (
    <Card className={classes.root}>
      <CardContent className={classes.cardContent}>
        <Typography color="textSecondary" className={classes.descTexts}>
          Seed Selection Tools
        </Typography>
        <ToggleButtonGroup
          size="medium"
          value={seedtool}
          onChange={handleToolChange}
          exclusive
        >
          <ToggleButton key={1} value="SEEDSELECT">
            <ColorizeOutlinedIcon />
          </ToggleButton>
          {/* <ToggleButton key={2} value="VIEW">
            <PanToolIcon />
          </ToggleButton> */}
          <ToggleButton key={3} value="TEST">
            <VisibilityIcon />
          </ToggleButton>
        </ToggleButtonGroup>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          color={"primary"}
          disabled={selectedSeeds === 0}
          onClick={learnSeeds}
          className={classes.learnButton}
        >
          {learning ? (
            <CircularProgress />
          ) : (
            <>
              Learn
              <Typography variant="caption">
                ({selectedSeeds && selectedSeeds} seeds)
              </Typography>
            </>
          )}
        </Button>
      </CardActions>
    </Card>
  );
};

export default connector(wrapStyles(LHToolsCard));
