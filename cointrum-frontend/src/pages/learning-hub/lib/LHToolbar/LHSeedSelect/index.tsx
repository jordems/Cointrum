import React from "react";

import LHLabelsCard from "./LHLabelsCard";
import LHLabelDialog from "./LHLabelDialog";
import LHLabelNew from "./LHLabelNew";

const LHSeedSelect: React.FunctionComponent<{}> = () => {
  return (
    <>
      <LHLabelsCard />

      <LHLabelDialog />
      <LHLabelNew />
    </>
  );
};

export default LHSeedSelect;
