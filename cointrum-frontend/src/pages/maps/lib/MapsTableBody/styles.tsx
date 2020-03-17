import { Theme, createStyles, withStyles } from "@material-ui/core";

export const styles = (theme: Theme) =>
  createStyles({
    mapSelectionTuple: {
      textDecoration: "underline",
      "&:hover": {
        background: theme.palette.secondary.main,
        cursor: "pointer",
        color: theme.palette.secondary.light
      }
    },
    tupleOptions: {
      textAlign: "right"
    }
  });

export function wrapStyles(component: any) {
  return withStyles(styles)(component);
}
