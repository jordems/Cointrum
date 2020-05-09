import { Theme, createStyles, withStyles } from "@material-ui/core";

export const styles = (theme: Theme) =>
  createStyles({
    root: {
      minHeight: "30em"
    },
    descTexts: {
      fontSize: 12
    }
  });

export function wrapStyles(component: any) {
  return withStyles(styles)(component);
}
