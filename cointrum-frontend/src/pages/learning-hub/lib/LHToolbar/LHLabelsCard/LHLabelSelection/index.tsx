import React from "react";
import { WithStyles, Button, ButtonGroup } from "@material-ui/core";

import { styles, wrapStyles } from "./styles";
import { ConnectedProps } from "react-redux";

import { connector } from "./redux";
import { ILabel } from "models";

type LHLabelSelectionProps = WithStyles<typeof styles> &
  ConnectedProps<typeof connector> & {
    labels: { [labelid: string]: ILabel };
  };

class LHLabelSelection extends React.Component<LHLabelSelectionProps> {
  handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const label = this.props.labels[e.currentTarget.value];
    if (label) {
      this.props.setCurrentLabel(label);
    }
  };

  render() {
    const { classes, labels, current } = this.props;

    return (
      <ButtonGroup orientation="vertical">
        {Object.keys(labels).map(labelKey => (
          <Button
            key={`labelS${labelKey}`}
            className={
              current?._id === labels[labelKey]._id
                ? classes.selected
                : classes.default
            }
            style={
              current?._id === labels[labelKey]._id
                ? undefined
                : {
                    color: labels[labelKey].colour
                  }
            }
            value={labels[labelKey]._id}
            onClick={this.handleClick}
          >
            {labels[labelKey].name}
          </Button>
        ))}
      </ButtonGroup>
    );
  }
}

export default connector(wrapStyles(LHLabelSelection));
