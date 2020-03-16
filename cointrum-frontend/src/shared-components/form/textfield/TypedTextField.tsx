import React from "react";
import { WithStyles, TextField } from "@material-ui/core";

import { styles, wrapStyles } from "./styles";

type TypedTextFieldProps = WithStyles<typeof styles> & {
  label?: string;
  value: string;
  required?: boolean;
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
    const { classes, label, value, required } = this.props;
    return (
      <TextField
        className={classes.root}
        label={label}
        value={value}
        required={required}
        onChange={this.handleonChange}
      />
    );
  }
}

export default wrapStyles(TypedTextField);
