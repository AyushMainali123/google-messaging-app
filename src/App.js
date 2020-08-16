import React, { useEffect } from "react";
import "./App.css";
import Login from "./Components/Login/Login";
import { useStateValue } from "./Components/StateProvider";
import Chat from "./Components/Chat/Chat";
import Sidebar from "./Components/Sidebar/Sidebar";
import db from "./Components/firebase";
import { BrowserRouter as Router, Route } from "react-router-dom";
function App() {
  const [{ currentUser }, dispatch] = useStateValue();

  useEffect(() => {
    db.collection("users")
      .orderBy("name")
      .onSnapshot((snapshot) => {
        const users = snapshot.docs.map((doc) => ({...doc.data()}));
        dispatch({
          type: "SET_USERS",
          payload: {
            users,
          },
        });
      });
  }, []);

  return (
    <div className="app">
      <Router>
        {!Object.keys(currentUser).length ? (
          <Login />
        ) : (
          <>
            <Sidebar />
            <Route path="/room/:uid">
              <Chat />
            </Route>
          </>
        )}
      </Router>
    </div>
  );
}

export default App;
