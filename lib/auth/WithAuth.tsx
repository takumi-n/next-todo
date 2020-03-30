import { ReactNode } from "react";
import { useUser } from "../../contexts/UserContext";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "../../components/Alert";

type Props = {
  children: ReactNode;
};

const useStyles = makeStyles(theme => ({
  alert: {
    marginTop: theme.spacing(3)
  }
}));

export default function WithAuth(props: Props) {
  const { user } = useUser();

  const classes = useStyles();

  return user ? (
    <>{props.children}</>
  ) : (
    <Alert className={classes.alert} severity="info">
      ログインしてください
    </Alert>
  );
}
