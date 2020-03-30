import firebase from "firebase";
import React, { useState, useContext, useEffect } from "react";
import Todo from "../models/todo";

type Props = {
  children: React.ReactNode;
};

const user: firebase.User = null;

const Context = React.createContext({
  user,
  setUser: (user: firebase.User) => {},
  todos: {} as { [id: string]: Todo },
  addTodo: (title: string, estimatedMinutes: number) => {},
  toggleTodo: (id: string) => {}
});

export function useUser() {
  return useContext(Context);
}

function generateID() {
  return `${Math.random()}`;
}

export default function TodoContext(props: Props) {
  const [user, setUser] = useState(null);
  const [todos, setTodos] = useState({});

  useEffect(() => {
    let unsubscribe = () => {};
    if (user) {
      unsubscribe = firebase
        .firestore()
        .collection(user.uid)
        .onSnapshot(querySnapShot => {
          if (querySnapShot.size === 0) {
            const defaultTasks = [
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
            defaultTasks.forEach(t =>
              firebase
                .firestore()
                .collection(user.uid)
                .doc(t.id)
                .set(t)
            );
            return;
          }

          const fetchedTodos = {};
          querySnapShot.forEach(doc => {
            const id = doc.id;
            const todo = {
              id,
              ...doc.data()
            };
            fetchedTodos[id] = todo;
          });
          setTodos({ ...todos, ...fetchedTodos });
        });
    }

    return () => {
      unsubscribe();
    };
  });

  const addTodo = (title: string, estimatedMinutes: number) => {
    if (user) {
      const id = generateID();
      firebase
        .firestore()
        .collection(user.uid)
        .doc(id)
        .set({
          id,
          title,
          estimatedMinutes,
          done: false
        });
    }
  };

  const toggleTodo = (id: string) => {
    if (user) {
      firebase
        .firestore()
        .collection(user.uid)
        .doc(id)
        .update({
          done: !todos[id].done
        });
    }
  };

  return (
    <Context.Provider value={{ user, setUser, todos, addTodo, toggleTodo }}>
      {props.children}
    </Context.Provider>
  );
}
