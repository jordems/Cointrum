import { Theme, createStyles, withStyles } from "@material-ui/core";

export const styles = (theme: Theme) =>
  createStyles({
    closeIconContainer: {
      position: "absolute",
      top: 0,
      right: 0
    }
  });

export function wrapStyles(component: any) {
  return withStyles(styles)(component);
}
