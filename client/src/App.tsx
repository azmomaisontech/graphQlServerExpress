import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Auth from "./pages/Auth";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Auth} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default App;
