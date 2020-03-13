import { createMuiTheme } from "@material-ui/core/styles";

import deepPurple from "@material-ui/core/colors/deepPurple";
import gray from "@material-ui/core/colors/grey";

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: deepPurple,
    secondary: gray
  },
  overrides: {
    MuiLink: {
      root: {
        "&:link": {
          textDecoration: "inherit",
          color: "inherit",
          cursor: "auto"
        },
        "&:visited": {
          textDecoration: "inherit",
          color: "inherit",
          cursor: "auto"
        }
      }
    }
  }
});

export default theme;
