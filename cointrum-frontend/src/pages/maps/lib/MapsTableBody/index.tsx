import React from "react";
import {
  WithStyles,
  TableRow,
  TableCell,
  LinearProgress
} from "@material-ui/core";

import { styles, wrapStyles } from "./styles";
import { ITradingMap } from "models";

import MapTupleOptions from "./../MapTupleOptions";

type MapsTableBodyProps = WithStyles<typeof styles> & {
  loadingMaps: boolean;
  maps: { [tradingmapid: string]: ITradingMap };
};

const MapsTableBody: React.FunctionComponent<MapsTableBodyProps> = ({
  classes,
  loadingMaps,
  maps
}) => {
  const keyMaps = Object.keys(maps);

  if (loadingMaps) {
    return (
      <TableRow>
        <TableCell colSpan={3}>
          <LinearProgress />
        </TableCell>
      </TableRow>
    );
  }
  return (
    <>
      {keyMaps.map((key: string, idx) => (
        <TableRow key={`TUP${key}`}>
          <TableCell>{maps[key].name}</TableCell>
          <TableCell>{maps[key].exchange}</TableCell>
          <TableCell>
            {maps[key].basecurrency} - {maps[key].altcurrency}
          </TableCell>

          <TableCell className={classes.tupleOptions}>
            <MapTupleOptions map={maps[key]} />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};

export default wrapStyles(MapsTableBody);
