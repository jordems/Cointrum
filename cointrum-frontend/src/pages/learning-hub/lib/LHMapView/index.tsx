import React from "react";
import { WithStyles, Button } from "@material-ui/core";
import { ConnectedProps } from "react-redux";

import { styles, wrapStyles } from "./styles";
import { connector } from "./redux";

import Chart from "shared-components/charts/Chart";

import LHSeedSelectedCard from "./LHSeedsSelectedCard";

type LHMapViewProps = WithStyles<typeof styles> &
  ConnectedProps<typeof connector>;

const LHMapView: React.FunctionComponent<LHMapViewProps> = ({ classes }) => {
  return (
    <div className={classes.root}>
      {/* <Button onClick={handleSeedClick}>Seed Generator</Button> */}

      <LHSeedSelectedCard />
      <Chart chartID={"MainSeedSelection"} minWidth={350} />
    </div>
  );
};

export default connector(wrapStyles(LHMapView));
