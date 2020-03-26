import { Theme, createStyles, withStyles } from "@material-ui/core";

const drawerWidth = 225;

export const styles = (theme: Theme) =>
  createStyles({
    drawer: {
      width: drawerWidth,
      flexShrink: 0
    },
    drawerPaper: {
      width: drawerWidth,
      zIndex: 2,
      marginTop: 64
    },
    toolbar: theme.mixins.toolbar
  });

export function wrapStyles(component: any) {
  return withStyles(styles)(component);
}
