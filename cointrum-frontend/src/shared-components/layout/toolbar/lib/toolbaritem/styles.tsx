import { Theme, createStyles, withStyles } from "@material-ui/core";

export const styles = (theme: Theme) =>
  createStyles({
    link: {
      "&:link": {
        textDecoration: "inherit",
        color: "inherit",
        cursor: "auto"
      },
      "&:visited": {
        textDecoration: "inherit",
        color: "inherit",
        cursor: "auto"
      }
    }
  });

export function wrapStyles(component: any) {
  return withStyles(styles)(component);
}
