import React from "react";
import {
  WithStyles,
  Select,
  MenuItem,
  InputLabel,
  FormControl
} from "@material-ui/core";

import { styles, wrapStyles } from "./styles";

type TypedSelectProps = WithStyles<typeof styles> & {
  label: string;
  value: string;
  onValueChange: (text: string) => void;
  options: Array<string>;
};

class TypedSelect extends React.Component<TypedSelectProps> {
  handleonChange = (
    e: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>,
    child: React.ReactNode
  ) => {
    const changedValue = e.target.value;

    typeof changedValue === "string" &&
      this.props.onValueChange &&
      this.props.onValueChange(changedValue);
  };

  render() {
    const { options, label, value, classes } = this.props;
    return (
      <FormControl className={classes.root}>
        <InputLabel id={`InputLabel${label}`}>{label}</InputLabel>
        <Select
          labelId={`InputLabel${label}`}
          value={value}
          onChange={this.handleonChange}
        >
          {options.map(opt => (
            <MenuItem key={`Option:${opt}`} value={opt}>
              {opt}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }
}

export default wrapStyles(TypedSelect);
