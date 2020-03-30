import { Paper, Checkbox } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { useTodos } from "../contexts/TodoContext";
import TodoModel from "../models/todo";

type Props = {
  todo: TodoModel;
};

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16)
    }
  },
  content: {
    flex: 1,
    height: theme.spacing(5)
  },
  title: {
    marginRight: theme.spacing(1),
    fontWeight: "bold"
  },
  time: {
    paddingTop: theme.spacing(0.2),
    paddingRight: theme.spacing(1.1),
    paddingLeft: theme.spacing(1.1),
    paddingBottom: theme.spacing(0.2),
    borderStyle: "solid",
    borderColor: "#90caf9",
    borderWidth: theme.spacing(0.5),
    borderRadius: theme.spacing(3),
    backgroundColor: "#90caf9",
    fontWeight: "bold"
  },
  done: {
    textDecoration: "line-through"
  }
}));

export default function Todo(props: Props) {
  const { todo } = props;
  const { toggleTodo } = useTodos();

  const classes = useStyles();

  return (
    <Paper elevation={2} className={classes.root}>
      <div className={classes.content}>
        <Checkbox checked={todo.done} onChange={() => toggleTodo(todo.id)} />
        <span className={todo.done ? classes.done : ""}>
          <span className={classes.title}>{todo.title}</span>
          <span className={classes.time}>@{todo.estimatedMinutes}分</span>
        </span>
      </div>
    </Paper>
  );
}
