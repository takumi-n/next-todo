import firebase from "firebase";
import React, { useState, useContext } from "react";

type Props = {
  children: React.ReactNode;
};

const user: firebase.User = null;

const Context = React.createContext({
  user,
  setUser: (user: firebase.User) => {}
});

export function useUser() {
  return useContext(Context);
}

export default function TodoContext(props: Props) {
  const [user, setUser] = useState(null);

  return (
    <Context.Provider value={{ user, setUser }}>
      {props.children}
    </Context.Provider>
  );
}
