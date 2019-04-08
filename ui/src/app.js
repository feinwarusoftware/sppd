import React, { Component } from "react";
import ReactDOM from "react-dom";
import 'bootstrap/scss/bootstrap.scss';
import "../src/static/css/fa_all.scss";
import "../style.scss";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import ScrollToTop from "./components/ScrollToTop.jsx";

import Home from "./views/Home.jsx";
import Card from "./views/Card.jsx";
import Error from "./views/Error.jsx";

const history = createBrowserHistory()

ReactDOM.render(
  <Router history={history}>
    <ScrollToTop>
      <Switch>
      <Route exact path="/" component={Home} exact />
      <Route exact path="/:card" component={Card} />
      </Switch>
    </ScrollToTop>
  </Router>,
  document.getElementById("root")
);