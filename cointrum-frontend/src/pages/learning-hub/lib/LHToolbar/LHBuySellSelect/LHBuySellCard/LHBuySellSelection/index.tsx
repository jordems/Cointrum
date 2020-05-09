import React from "react";
import cx from "classnames";
import { WithStyles, Button, ButtonGroup } from "@material-ui/core";

import { styles, wrapStyles } from "./styles";
import { ConnectedProps } from "react-redux";

import { connector } from "./redux";

type LHBuySellSelectionProps = WithStyles<typeof styles> &
  ConnectedProps<typeof connector>;

class LHBuySellSelection extends React.Component<LHBuySellSelectionProps> {
  handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    //const label = this.props.labels[e.currentTarget.value];
    // if (label) {
    //   //this.props.setCurrentLabel(label);
    // }
  };

  render() {
    const { classes } = this.props;

    return (
      <ButtonGroup orientation="vertical">
        <Button
          className={cx(classes.button, classes.selected)}
          value={"BUY"}
          onClick={this.handleClick}
        >
          Buy
        </Button>
        <Button
          className={cx(classes.button, classes.selected)}
          value={"Sell"}
          onClick={this.handleClick}
        >
          Sell
        </Button>
      </ButtonGroup>
    );
  }
}

export default connector(wrapStyles(LHBuySellSelection));
