/* eslint-disable */
import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import PersonDetails from "./components/PersonDetails";
import history from "./components/history";

function App() {
  return (
    <Router history={history}>
      <div>
        <img
          src={require("./logo.png")}
          alt="logo"
          height="40px"
          width="40px"
          style={{ marginBottom: "14px" }}
        />
        <span>
          <span className="pay">PAY</span>
          <span className="debt">DEBT</span>
        </span>
      </div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/sheet/:id" component={PersonDetails} />
      </Switch>
    </Router>
  );
}

export default App;
