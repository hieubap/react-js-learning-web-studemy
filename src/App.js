import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./component/Home";
import Welcome from "./component/Welcome";
import Register from "./component/Register";
import { useEffect } from "react";
import firebase from "./firebase";
import VideoCall from "./component/VideoCall";
import useToken from "./component/Common/useToken";
import { headers } from "./component/Common/CommonModal";
import {storeFirebase} from './firebase';

function App() {
  const tokenString = localStorage.getItem("token");
  headers.Authorization = "Bearer " + tokenString;
  // storeFirebase.videoCallApi = localStorage.getItem("videoCallApi");
  // storeFirebase.api = localStorage.getItem("api");

  useEffect(() => {
    console.log(headers, "headers");
    firebase();
  }, []);
  return (
    <Router>
      <Route path={"/"} exact>
        <Welcome />
      </Route>
      <Route path={"/register"} exact>
        <Register />
      </Route>
      <Route path={"/home"} exact>
        <Home />
      </Route>
      <Route path={"/video-call"} exact>
        <VideoCall />
      </Route>
    </Router>
  );
}

export default App;
