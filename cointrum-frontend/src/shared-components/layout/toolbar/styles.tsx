import { Theme, createStyles, withStyles } from "@material-ui/core";

const drawerWidth = 240;

export const styles = (theme: Theme) =>
  createStyles({
    drawer: {
      width: drawerWidth,
      flexShrink: 0
    },
    drawerPaper: {
      width: drawerWidth
    },
    toolbar: theme.mixins.toolbar
  });

export function wrapStyles(component: any) {
  return withStyles(styles)(component);
}
