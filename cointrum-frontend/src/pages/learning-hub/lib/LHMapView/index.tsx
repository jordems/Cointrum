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

const LHMapView: React.FunctionComponent<LHMapViewProps> = ({
  classes,
  addSeedtoLabelUL,
  seedtool,
  ulseedsbyLabel
}) => {
  // const handleSeedClick = (e: any) => {
  //   const genSeed: ICreateSeed = {
  //     tempid: uuid(),
  //     data: {
  //       timeframes: [{ price: 1 }, { price: 2 }, { price: 3 }]
  //     }
  //   };
  //   addSeedtoLabelUL(genSeed);
  // };

  return (
    <div className={classes.root}>
      {/* <Button onClick={handleSeedClick}>Seed Generator</Button> */}
      <Chart
        chartID={"MainSeedSelection"}
        minWidth={350}
        mode={seedtool}
        ulseedsbyLabel={ulseedsbyLabel}
        onSeedSelection={addSeedtoLabelUL}
      />
    </div>
  );
};

export default connector(wrapStyles(LHMapView));
