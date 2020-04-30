import React from "react";
import {
  WithStyles,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
} from "@material-ui/core";

import DeleteIcon from "@material-ui/icons/Delete";
import { ConnectedProps } from "react-redux";

import { styles, wrapStyles } from "./styles";
import { connector } from "./redux";

type LHSeedsSelectedProps = WithStyles<typeof styles> &
  ConnectedProps<typeof connector>;

const LHSeedsSelectedCard: React.FunctionComponent<LHSeedsSelectedProps> = ({
  classes,
  ulseedsbyLabel,
  labels,
  clearSeedsUL,
  removeSeedfromlabelUL,
}) => {
  if (Object.keys(ulseedsbyLabel).length < 1) {
    return null;
  }

  return (
    <Paper className={classes.root}>
      <Card className={classes.card}>
        <CardContent>
          <Typography color="textSecondary" className={classes.descTexts}>
            Selected Seeds (unlearned)
          </Typography>
          {/*TODO Display Each Unlearned Seed with Option to Delete or view it on screen*/}
          <List component="nav" className={classes.rootList}>
            {Object.keys(ulseedsbyLabel).map((labelID) => {
              const labelDetails = labels[labelID];

              const seedIDs =
                ulseedsbyLabel[labelID] && Object.keys(ulseedsbyLabel[labelID]);

              return [
                <ListItem
                  key={`ulSelectedLabel${labelID}`}
                  className={classes.listItem}
                >
                  <ListItemText
                    primary={labelDetails.name}
                    style={{ color: labelDetails.colour, margin: 0 }}
                  />
                </ListItem>,
                <List
                  key={`ulSelectedSeedList${labelID}`}
                  component="div"
                  disablePadding
                >
                  {seedIDs &&
                    seedIDs.map((seedID, idx) => {
                      return (
                        <ListItem
                          key={`ulSelectedSeed${seedID}`}
                          className={classes.nestedListItem}
                        >
                          <ListItemText
                            primary={
                              <span className={classes.nestedListText}>
                                Seed: {idx + 1}
                              </span>
                            }
                            style={{ margin: 0 }}
                          />
                          <ListItemIcon>
                            <IconButton
                              className={classes.nestedListDeleteIconButton}
                              onClick={() =>
                                removeSeedfromlabelUL(labelID, seedID)
                              }
                            >
                              <DeleteIcon
                                className={classes.nestedListDeleteIcon}
                              />
                            </IconButton>
                          </ListItemIcon>
                        </ListItem>
                      );
                    })}
                </List>,
              ];
            })}
          </List>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            style={{ marginLeft: "auto" }}
            onClick={clearSeedsUL}
          >
            Clear
          </Button>
        </CardActions>
      </Card>
    </Paper>
  );
};

export default connector(wrapStyles(LHSeedsSelectedCard));
