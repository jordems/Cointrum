import { Theme, createStyles, withStyles } from "@material-ui/core";

export const styles = (theme: Theme) =>
  createStyles({
    treeRoot: {
      minWidth: 200,
      alignItems: "center"
    },
    seedText: {
      fontSize: 12
    }
  });

export function wrapStyles(component: any) {
  return withStyles(styles)(component);
}
