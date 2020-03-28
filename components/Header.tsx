import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core";

import EstimatedTime from "./EstimatedTime";

const useStyles = makeStyles(theme => ({
  toolbar: {
    display: "flex",
    justifyContent: "space-between"
  }
}));

export default function Header() {
  const classes = useStyles();

  return (
    <div>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <Typography variant="h5">next-todo</Typography>
          <EstimatedTime />
        </Toolbar>
      </AppBar>
    </div>
  );
}
