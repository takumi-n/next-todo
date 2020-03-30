import firebase from "firebase/app";
import "firebase/auth";

import { useEffect } from "react";

const config = {
  apiKey: "AIzaSyAJre7eKLjwexuglB79oH8mLJd_IdbJnEI",
  authDomain: "next-todo-11e52.firebaseapp.com",
  databaseURL: "https://next-todo-11e52.firebaseio.com",
  projectId: "next-todo-11e52",
  storageBucket: "next-todo-11e52.appspot.com",
  messagingSenderId: "412868552617",
  appId: "1:412868552617:web:63fa454e8880a8b198c6b8",
  measurementId: "G-EH1FCXKSKN"
};

export default function FirebaseAuth() {
  useEffect(() => {
    firebase.initializeApp(config);
  });

  return (
    <div
      onClick={() => {
        firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
      }}
    >
      ログイン
    </div>
  );
}
