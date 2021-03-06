import { Theme, createStyles, withStyles } from "@material-ui/core";

export const styles = (theme: Theme) =>
  createStyles({
    deleteButton: {
      color: "red"
    }
  });

export function wrapStyles(component: any) {
  return withStyles(styles)(component);
}
