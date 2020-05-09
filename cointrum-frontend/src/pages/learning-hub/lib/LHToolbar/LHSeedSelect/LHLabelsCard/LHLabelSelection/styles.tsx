import { Theme, createStyles, withStyles } from "@material-ui/core";

export const styles = (theme: Theme) =>
  createStyles({
    button: {
      fontWeight: "normal",
      textTransform: "none",
      minWidth: 125
    },
    selected: {
      fontWeight: "bold",
      color: theme.palette.common.white,
      background: theme.palette.grey[700],
      borderWidth: 2,
      "&:hover": {
        background: theme.palette.grey[700]
      }
    },
    default: {
      borderWidth: 1,
      background: theme.palette.grey[800]
    }
  });

export function wrapStyles(component: any) {
  return withStyles(styles)(component);
}
