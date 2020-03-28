import { useTodos } from "../components/TodoContext";
import Todo from "./Todo";
import { makeStyles, Divider } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  todo: {
    marginTop: theme.spacing(0.4),
    marginBottom: theme.spacing(0.4)
  },
  divider: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3)
  }
}));

export default function TodoList() {
  const { todos } = useTodos();

  const undone = Object.values(todos).filter(todo => !todo.done);
  const done = Object.values(todos).filter(todo => todo.done);

  const classes = useStyles();

  return (
    <>
      {undone.map(todo => (
        <div className={classes.todo}>
          <Todo todo={todo} />
        </div>
      ))}

      <Divider
        className={classes.divider}
        style={
          undone.length === 0 || done.length === 0 ? { display: "none" } : {}
        }
      />

      {done.map(todo => (
        <div className={classes.todo}>
          <Todo todo={todo} />
        </div>
      ))}
    </>
  );
}