import React from "react";

import { WithStyles } from "@material-ui/core";

import { styles, wrapStyles } from "./styles";

import { CompactPicker } from "react-color";

type TypedColourPickerProps = WithStyles<typeof styles> & {
  label: string;
  colour: string;
  onValueChange: (hex: string) => void;
};

class TypedColourPicker extends React.Component<TypedColourPickerProps> {
  readonly state = {
    displayPicker: false
  };

  handleonChange = (e: any) => {
    this.props.onValueChange(e.hex);
    this.handleClosePicker();
  };

  handleOpenPicker = () => {
    this.setState({ displayPicker: true });
  };

  handleClosePicker = () => {
    this.setState({ displayPicker: false });
  };

  render() {
    const { classes, colour } = this.props;
    const { displayPicker } = this.state;
    return (
      <div>
        <div className={classes.swatch} onClick={this.handleOpenPicker}>
          <div className={classes.colourBox} style={{ background: colour }} />
        </div>
        {displayPicker && (
          <div className={classes.popover}>
            <div className={classes.cover} onClick={this.handleClosePicker} />
            <CompactPicker color={colour} onChange={this.handleonChange} />
          </div>
        )}
      </div>
    );
  }
}

export default wrapStyles(TypedColourPicker);
