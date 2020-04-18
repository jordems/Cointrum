import { Theme, createStyles, withStyles } from "@material-ui/core";

export const styles = (theme: Theme) =>
  createStyles({
    root: {
      textAlign: "center",
      margin: ".5em 0",
    },
    cardContent: {
      padding: 6,
    },
    mapTitle: {
      fontSize: 20,
    },
    descTexts: {
      fontSize: 12,
      marginBottom: ".5em",
    },
    learnButton: { margin: "auto", marginBottom: ".5em" },
  });

export function wrapStyles(component: any) {
  return withStyles(styles)(component);
}
