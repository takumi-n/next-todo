import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import firebase from "firebase/app";

import { useUser } from "../contexts/UserContext";
import EstimatedTime from "./EstimatedTime";
import FirebaseAuth from "./LogIn";

const useStyles = makeStyles(theme => ({
  toolbar: {
    display: "flex",
    justifyContent: "space-between"
  }
}));

export default function Header() {
  const classes = useStyles();
  const { user } = useUser();

  return (
    <div>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <Typography variant="h5">next-todo</Typography>
          {user ? (
            <p>
              <EstimatedTime />
              <span onClick={() => firebase.auth().signOut()}>ログアウト</span>
            </p>
          ) : (
            <FirebaseAuth />
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
