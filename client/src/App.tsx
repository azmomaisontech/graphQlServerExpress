import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Events from "./pages/Events";
import Booking from "./pages/Booking";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";

const App = () => {
  return (
    <Router>
      <Navbar />
      <main className="main-content">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/auth" component={Auth} />
          <Route exact path="/events" component={Events} />
          <Route exact path="/bookings" component={Booking} />
          <Redirect to="/" />
        </Switch>
      </main>
    </Router>
  );
};

export default App;
