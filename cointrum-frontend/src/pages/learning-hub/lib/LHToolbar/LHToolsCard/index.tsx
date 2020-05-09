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
    value: LearningHubTools
  ) => {
    changeSeedTool(value);
  };

  return (
    <Card className={classes.root}>
      <CardContent className={classes.cardContent}>
        <Typography color="textSecondary" className={classes.descTexts}>
          Tools
        </Typography>
        <ToggleButtonGroup
          size="medium"
          value={seedtool}
          onChange={handleToolChange}
          exclusive
        >
          <ToggleButton key={1} value="BUYSELL">
            <ImportExportOutlined />
          </ToggleButton>
          <ToggleButton key={2} value="SEEDSELECT">
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
