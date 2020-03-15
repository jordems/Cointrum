import React from "react";

import {
  WithStyles,
  Paper,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Typography
} from "@material-ui/core";

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
    const { classes } = this.props;
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
              <MapCreationDialog />
            </div>
          </div>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Map Name</TableCell>
                <TableCell>Exchange</TableCell>
                <TableCell>Currency Pair</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <MapsTableBody loadingMaps={loadingMaps} maps={maps} />
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}

export default connector(wrapStyles(MapsPage));
