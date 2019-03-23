import React from "react";
import ReactDOM from "react-dom";
import 'bootstrap/scss/bootstrap.scss';
import "../src/static/css/fa_all.scss";
import "../style.scss";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "./views/Home.jsx";
import Card from "./views/Card.jsx";
import Error from "./views/Error.jsx";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} exact />
      <Route exact path="/:card" component={Card} />
    </Switch>
        
  </BrowserRouter>,
  document.getElementById("root")
);