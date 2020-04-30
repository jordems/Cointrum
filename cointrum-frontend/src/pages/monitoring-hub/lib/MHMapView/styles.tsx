import { Theme, createStyles, withStyles } from "@material-ui/core";

export const styles = (theme: Theme) =>
  createStyles({
    root: {
      marginRight: 225
    }
  });

export function wrapStyles(component: any) {
  return withStyles(styles)(component);
}
