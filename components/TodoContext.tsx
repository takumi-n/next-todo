import React, { useState, useContext } from "react";
import Todo from "../models/todo";

type Props = {
  children: React.ReactNode;
};

const Context = React.createContext({
  todos: {} as { [id: string]: Todo },
  addTodo: (title: string, estimatedMinutes: number) => {},
  toggleTodo: (id: string) => {}
});

export function useTodos() {
  return useContext(Context);
}

function generateID() {
  return `${Math.random()}`;
}

export default function TodoContext(props: Props) {
  const [example1, example2] = [
    {
      id: generateID(),
      title: "タスクを作ってみよう",
      estimatedMinutes: 1,
      done: false
    },
    {
      id: generateID(),
      title: "タスクを完了してみよう",
      estimatedMinutes: 1,
      done: false
    }
  ];

  const [todos, setTodos] = useState({
    [example1.id]: example1,
    [example2.id]: example2
  } as { [key: string]: Todo });

  const addTodo = (title: string, estimatedMinutes: number) => {
    const id = generateID();
    const todo = {
      id,
      title,
      estimatedMinutes,
      done: false
    };

    setTodos({
      ...todos,
      [id]: todo
    });
  };

  const toggleTodo = (id: string) => {
    todos[id].done = !todos[id].done;
    setTodos({ ...todos });
  };

  return (
    <Context.Provider value={{ todos, addTodo, toggleTodo }}>
      {props.children}
    </Context.Provider>
  );
}
