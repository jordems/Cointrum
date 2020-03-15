import { Theme, createStyles, withStyles } from "@material-ui/core";

export const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(6, 0, 3)
    },
    headerContainer: {
      display: "flex",
      justifyContent: "space-between",
      alignContent: "center",
      alignItems: "center",
      margin: theme.spacing(2, 1, 0, 1.5)
    },
    headerElement: {},
    lightBulb: {
      verticalAlign: "middle",
      marginRight: theme.spacing(1)
    }
  });

export function wrapStyles(component: any) {
  return withStyles(styles)(component);
}
