import React from "react";
import { WithStyles, TextField } from "@material-ui/core";

import { styles, wrapStyles } from "./styles";

type TypedTextFieldProps = WithStyles<typeof styles> & {
  onValueChange: (text: string) => void;
};

class TypedTextField extends React.Component<TypedTextFieldProps> {
  handleonChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const changedValue = e.target.value;

    this.props.onValueChange && this.props.onValueChange(changedValue);
  };

  render() {
    const { classes } = this.props;
    return (
      <TextField
        className={classes.root}
        {...this.props}
        onChange={this.handleonChange}
      />
    );
  }
}

export default wrapStyles(TypedTextField);
