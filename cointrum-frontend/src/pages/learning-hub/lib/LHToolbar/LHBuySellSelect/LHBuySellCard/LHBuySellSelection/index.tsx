import React from "react";
import cx from "classnames";
import { WithStyles, Button, ButtonGroup } from "@material-ui/core";

import { styles, wrapStyles } from "./styles";
import { ConnectedProps } from "react-redux";

import { connector } from "./redux";
import { BuySellButtonStates } from "store/learninghub/_buysell/types/current.types";

type LHBuySellSelectionProps = WithStyles<typeof styles> &
  ConnectedProps<typeof connector>;

class LHBuySellSelection extends React.Component<LHBuySellSelectionProps> {
  handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    this.props.setCurrentLabel(e.currentTarget.value as BuySellButtonStates);
  };

  render() {
    const { classes, selection } = this.props;

    return (
      <ButtonGroup orientation="vertical">
        <Button
          className={cx(
            classes.button,
            selection === "BUY" && classes.selected
          )}
          value={"BUY"}
          onClick={this.handleClick}
        >
          Buy
        </Button>
        <Button
          className={cx(
            classes.button,
            selection === "SELL" && classes.selected
          )}
          value={"SELL"}
          onClick={this.handleClick}
        >
          Sell
        </Button>
      </ButtonGroup>
    );
  }
}

export default connector(wrapStyles(LHBuySellSelection));
