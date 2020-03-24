import { Theme, createStyles, withStyles } from "@material-ui/core";

export const styles = (theme: Theme) =>
  createStyles({
    mapTitle: {
      fontSize: 20
    },
    descTexts: {
      fontSize: 12
    }
  });

export function wrapStyles(component: any) {
  return withStyles(styles)(component);
}
