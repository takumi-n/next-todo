import Page from "../components/Page";
import TodoList from "../components/TodoList";
import TodoInput from "../components/TodoInput";
import { makeStyles } from "@material-ui/core/styles";

import WithAuth from "../lib/auth/WithAuth";

const useStyles = makeStyles(theme => ({
  input: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3)
  }
}));

export default function Index() {
  const classes = useStyles();

  return (
    <Page>
      <WithAuth>
        <div className={classes.input}>
          <TodoInput />
        </div>
        <TodoList />
      </WithAuth>
    </Page>
  );
}
