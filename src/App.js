import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./component/Home";
import Welcome from "./component/Welcome";
import Register from "./component/Register";
function App() {
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
    </Router>
  );
}

export default App;
