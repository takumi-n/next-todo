import {
  Paper,
  IconButton,
  makeStyles,
  Theme,
  Typography,
  Snackbar
} from "@material-ui/core";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import InputBase from "@material-ui/core/InputBase";
import Queue from "@material-ui/icons/Queue";
import { useState, ChangeEvent, useEffect } from "react";

import { useTodos } from "./TodoContext";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    height: theme.spacing(7)
  },
  input: {
    flex: 1
  },
  titlePaper: {
    marginTop: "auto",
    marginBottom: "auto",
    marginRight: theme.spacing(1),
    paddingTop: theme.spacing(0.4),
    paddingLeft: theme.spacing(1.5),
    paddingRight: theme.spacing(1.5),
    paddingBottom: theme.spacing(0.4),
    backgroundColor: "#90caf9"
  }
}));

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function TodoInput() {
  const { addTodo } = useTodos();
  const [isTimeInput, setIsTimeInput] = useState(false);
  const [text, setText] = useState("");
  const [estimatedMinutes, setEstimatedMinutes] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  let inputBoxText = "";
  if (isTimeInput) {
    inputBoxText = estimatedMinutes > 0 ? `${estimatedMinutes}` : "";
  } else {
    inputBoxText = text;
  }

  useEffect(() => {
    const backspaceWatcher = (e: KeyboardEvent) => {
      if (e.key === "Backspace" && inputBoxText === "") {
        setIsTimeInput(false);
      }
    };
    window.addEventListener("keydown", backspaceWatcher);

    return () => {
      window.removeEventListener("keydown", backspaceWatcher);
    };
  });

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.value === "@") {
      setErrorMessage("最初にタスクのタイトルを入力してください");
      return;
    }

    if (e.target.value.substr(-1) === "@" && !isTimeInput) {
      setText(e.target.value);
      setIsTimeInput(true);
      e.target.value = "";
      return;
    }

    if (isTimeInput) {
      const minutes = parseInt(e.target.value);
      if (minutes < 1) {
        return;
      }

      setEstimatedMinutes(minutes);
      return;
    }

    setText(e.target.value);
  }

  function reset() {
    setText("");
    setEstimatedMinutes(0);
    setIsTimeInput(false);
  }

  function handleClose() {
    setErrorMessage("");
  }

  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Snackbar
        open={errorMessage !== ""}
        autoHideDuration={2500}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
      {isTimeInput ? (
        <Paper elevation={2} className={classes.titlePaper}>
          <Typography>{text.slice(0, -1)}</Typography>
        </Paper>
      ) : (
        ""
      )}
      <InputBase
        className={classes.input}
        placeholder={
          isTimeInput ? "かかる時間（分）を入力" : "タスク名@かかる時間"
        }
        value={inputBoxText}
        onChange={handleInputChange}
      />
      <IconButton
        onClick={() => {
          addTodo(text, estimatedMinutes);
          reset();
        }}
      >
        <Queue />
      </IconButton>
    </Paper>
  );
}
