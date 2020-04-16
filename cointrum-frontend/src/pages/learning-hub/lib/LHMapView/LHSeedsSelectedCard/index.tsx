import React from "react";
import {
  WithStyles,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  CardActions,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { ConnectedProps } from "react-redux";

import { styles, wrapStyles } from "./styles";
import { connector } from "./redux";

type LHSeedsSelectedProps = WithStyles<typeof styles> &
  ConnectedProps<typeof connector>;

const LHSeedsSelectedCard: React.FunctionComponent<LHSeedsSelectedProps> = ({
  classes,
  ulseedsbyLabel,
  labels,
}) => {
  return (
    <Paper>
      <Card style={{ textAlign: "center" }}>
        <CardContent>
          <Typography color="textSecondary" className={classes.descTexts}>
            Selected Seeds (unlearned)
          </Typography>
          {/*TODO Display Each Unlearned Seed with Option to Delete or view it on screen*/}
          <List>
            {Object.keys(ulseedsbyLabel).map((labelID) => {
              const labelDetails = labels[labelID];

              const seedIDs =
                ulseedsbyLabel[labelID] && Object.keys(ulseedsbyLabel[labelID]);

              return (
                <ListItem key={`ulSelected${labelID}`}>
                  <ListItemText
                    primary={labelDetails.name}
                    style={{ color: labelDetails.colour }}
                  />

                  <List>
                    {seedIDs &&
                      seedIDs.map((seedID, idx) => {
                        const seed = ulseedsbyLabel[labelID][seedID];

                        return (
                          <ListItemText key={`ulSelectedSeed${seedID}`}>
                            {idx + 1}: {seed.tempid}
                          </ListItemText>
                        );
                      })}
                  </List>
                </ListItem>
              );
            })}
          </List>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            style={{ marginLeft: "auto" }}
            // onClick={openEditorLabelDialog}
          >
            Clear
          </Button>
        </CardActions>
      </Card>
    </Paper>
  );
};

export default connector(wrapStyles(LHSeedsSelectedCard));
