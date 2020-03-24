import React from "react";
import { WithStyles, Button } from "@material-ui/core";
import { ConnectedProps } from "react-redux";

import { styles, wrapStyles } from "./styles";
import { connector } from "./redux";
import { ICreateSeed } from "models";

import { uuid } from "uuidv4";

type TEMPSeedGeneratorProps = WithStyles<typeof styles> &
  ConnectedProps<typeof connector>;

const TEMPSeedGenerator: React.FunctionComponent<TEMPSeedGeneratorProps> = ({
  classes,
  addSeedtoLabelUL
}) => {
  const handleSeedClick = (e: any) => {
    const genSeed: ICreateSeed = {
      tempid: uuid(),
      data: {
        timeframes: [{ price: 1 }, { price: 2 }, { price: 3 }]
      }
    };
    addSeedtoLabelUL(genSeed);
  };

  return <Button onClick={handleSeedClick}>Seed Generator</Button>;
};

export default connector(wrapStyles(TEMPSeedGenerator));
