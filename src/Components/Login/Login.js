import React from "react";
import "./Login.css";
import { Typography, Button, Input } from "@material-ui/core";
import { auth, provider } from "../firebase";
import { useStateValue } from "../StateProvider";
import db from "../firebase";
const Login = () => {
  const [{ users }, dispatch] = useStateValue();

  const handleSubmitClick = (e) => {
    e.preventDefault();
    auth
      .signInWithPopup(provider)
      .then((res) => {
        // If user exists 
        const { user } = res;
        // Adding logged in user
        dispatch({
          type: "SET_LOGGED_USER",
          payload: {
            user: {
              name: user.displayName,
              imageUrl: user.photoURL,
              uid: user.uid,
              email: user.email,
            },
          },
        });

        db.collection("users")
            .doc(user.uid)
            .set({
              name: user.displayName,
              imageUrl: user.photoURL,
              uid: user.uid,
              email: user.email,
            }, {merge: true})
      })
      .catch((error) => {
        // If user doesnot match
        alert(error.message);
      });
  };
  return (
    <div className="login">
      <div className="login__container">
        <img
          src="//external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.gannett-cdn.com%2F-mm-%2F1fc88564ddd62eba5bb1c1e9d8e5a71fae214427%2Fc%3D1054-630-2942-1697%26r%3Dx1683%26c%3D3200x1680%2Flocal%2F-%2Fmedia%2F2015%2F09%2F01%2FUSATODAY%2FUSATODAY%2F635767137264169643-GTY-486163612.jpg&f=1&nofb=1"
          alt="Messenge Logo"
        />
        <Typography variant="h3">Google Messenger</Typography>
        <Typography variant="body1">
          Instantly connect with people in your life.
        </Typography>
        <Typography variant="body1">
          Sign in with Google to get started.
        </Typography>
        <form>
          <Button
            color="secondary"
            variant="contained"
            onClick={handleSubmitClick}
          >
            Continue
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
