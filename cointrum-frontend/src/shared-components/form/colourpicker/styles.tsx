import { Theme, createStyles, withStyles } from "@material-ui/core";

export const styles = (theme: Theme) =>
  createStyles({
    swatch: {
      padding: "5px",
      background: "#fff",
      borderRadius: "2px",
      boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
      display: "inline-block",
      cursor: "pointer"
    },
    colourBox: {
      width: "40px",
      height: "25px",
      borderRadius: "2px"
    },
    popover: {
      position: "absolute",
      zIndex: 2,
      right: 90
    },
    cover: {
      position: "fixed",
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    }
  });

export function wrapStyles(component: any) {
  return withStyles(styles)(component);
}
