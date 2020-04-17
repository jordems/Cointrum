import { Theme, createStyles, withStyles } from "@material-ui/core";

export const styles = (theme: Theme) =>
  createStyles({
    root: {
      position: "absolute",
      right: 236,
      width: 200,
      maxHeight: 415,
      zIndex: 3,
      backgroundColor: "rgba(66,66,66,.4)",
      opacity: 0.6,
      "&:hover": {
        opacity: 1,
      },
    },
    card: {
      textAlign: "center",
    },
    descTexts: {
      fontSize: 12,
    },
    rootList: {
      width: "100%",
      maxWidth: 250,
      backgroundColor: theme.palette.background.paper,
    },
    listItem: {
      padding: 0,
      paddingLeft: theme.spacing(2),
      margin: 0,
    },
    nestedListItem: {
      padding: 0,
      paddingLeft: theme.spacing(4),
      margin: 0,
    },
    nestedListText: {
      fontSize: 12,
    },
    nestedListDeleteIconButton: {
      padding: 0,
    },
    nestedListDeleteIcon: {
      width: ".6em",
      height: ".6em",
    },
  });

export function wrapStyles(component: any) {
  return withStyles(styles)(component);
}
