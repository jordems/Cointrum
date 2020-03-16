import { Theme, createStyles, withStyles } from "@material-ui/core";

export const styles = (theme: Theme) =>
  createStyles({
    addIcon: {
      color: "#424242",
      backgroundColor: theme.palette.secondary.light,
      borderRadius: 12,
      margin: ".2em"
    }
  });

export function wrapStyles(component: any) {
  return withStyles(styles)(component);
}
