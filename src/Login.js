import React from "react";
import { actionTypes } from "./reducer";
import { useStateValue } from "./StateProvider";
import "./login.css";

import { Button } from "@material-ui/core";
import { auth, provider } from "./firebase";

function Login() {
  // eslint-disable-next-line no-empty-pattern
  const [{}, dispatch] = useStateValue();

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((res) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: res.user,
        });
      })
      .catch((err) => alert(err.message));
  };

  return (
    <div className="login">
      <div className="login-container">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt=""
        />
        <div className="login-text">Sign in to WhatsApp</div>
        <Button type="submit" onClick={signIn}>
          Sign in with Google
        </Button>
      </div>
    </div>
  );
}

export default Login;
