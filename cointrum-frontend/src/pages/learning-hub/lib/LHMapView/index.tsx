import React from "react";
import { WithStyles, Button } from "@material-ui/core";
import { ConnectedProps } from "react-redux";

import { styles, wrapStyles } from "./styles";
import { connector } from "./redux";
import { ICreateSeed } from "models";

import { uuid } from "uuidv4";
import Chart from "shared-components/charts/Chart";

type LHMapViewProps = WithStyles<typeof styles> &
  ConnectedProps<typeof connector>;

const LHMapView: React.FunctionComponent<LHMapViewProps> = ({ classes }) => {
  return (
    <div className={classes.root}>
      {/* <Button onClick={handleSeedClick}>Seed Generator</Button> */}
      <Chart chartID={"MainSeedSelection"} minWidth={350} />
    </div>
  );
};

export default connector(wrapStyles(LHMapView));
