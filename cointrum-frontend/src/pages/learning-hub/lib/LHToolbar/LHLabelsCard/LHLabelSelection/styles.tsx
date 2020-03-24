import { Theme, createStyles, withStyles } from "@material-ui/core";

export const styles = (theme: Theme) =>
  createStyles({
    selected: {
      background: theme.palette.grey[200],
      border: 2,
      "&:hover": {
        background: theme.palette.grey[200]
      },
      color: "#424242"
    },
    default: {
      color: theme.palette.primary.contrastText,
      background: theme.palette.grey[700],
      border: 1
    }
  });

export function wrapStyles(component: any) {
  return withStyles(styles)(component);
}
