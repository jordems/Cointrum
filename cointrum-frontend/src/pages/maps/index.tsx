import React from "react";

import {
  WithStyles,
  Paper,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Typography,
  IconButton
} from "@material-ui/core";

import AddIcon from "@material-ui/icons/Add";

import { ConnectedProps } from "react-redux";

import { styles, wrapStyles } from "./styles";
import { connector } from "./redux";

import MapsTableBody from "./lib/MapsTableBody";
import MapCreationDialog from "./lib/MapCreationDialog";

type MapsPageProps = ConnectedProps<typeof connector> &
  WithStyles<typeof styles>;

class MapsPage extends React.Component<MapsPageProps> {
  readonly state: any = {
    message: ""
  };

  componentDidMount() {
    // Fetch Library
    this.props.fetchMapLibrary();
  }

  render() {
    const { classes, current } = this.props;
    const { loadingMaps, maps } = this.props.library;

    return (
      <div>
        <Paper>
          <div className={classes.headerContainer}>
            <div className={classes.headerElement}>
              <Typography variant={"h4"} component={"h1"}>
                Maps
              </Typography>
            </div>
            <div className={classes.headerElement}>
              <IconButton onClick={this.props.openCreateMapDialog}>
                <AddIcon className={classes.addIcon} />
              </IconButton>
            </div>
          </div>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Map Name</TableCell>
                <TableCell>Exchange</TableCell>
                <TableCell>Cycle Duration</TableCell>
                <TableCell>Pair (Base - Alt)</TableCell>
                <TableCell>Date Created</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <MapsTableBody
                loadingMaps={loadingMaps}
                maps={maps}
                currentMap={current.map}
                setCurrentMap={this.props.setCurrentMap}
              />
            </TableBody>
          </Table>
        </Paper>

        <MapCreationDialog />
      </div>
    );
  }
}

export default connector(wrapStyles(MapsPage));
