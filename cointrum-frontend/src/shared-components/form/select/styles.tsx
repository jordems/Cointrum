import { Theme, createStyles, withStyles } from "@material-ui/core";

export const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: "100%"
    }
  });

export function wrapStyles(component: any) {
  return withStyles(styles)(component);
}
