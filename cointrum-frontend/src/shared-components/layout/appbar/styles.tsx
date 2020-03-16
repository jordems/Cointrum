import { Theme, createStyles, withStyles } from "@material-ui/core";

export const styles = (theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer - 1,
      paddingLeft: 240
    }
  });

export function wrapStyles(component: any) {
  return withStyles(styles)(component);
}
