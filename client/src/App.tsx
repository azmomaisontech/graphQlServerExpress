import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Events from "./pages/Events";
import Booking from "./pages/Booking";
import Navbar from "./components/Navbar/Navbar";
import { AuthState } from "./context/GraphqlState";
import "./App.css";

const App = () => {
  return (
    <AuthState>
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
    </AuthState>
  );
};

export default App;
