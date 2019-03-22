import React from "react";
import ReactDOM from "react-dom";
import 'bootstrap/scss/bootstrap.scss';
import "../src/static/css/fa_all.scss";
import "../style.scss";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { Home, Error } from "./views";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/" component={Home} exact />
      <Route component={Error} />
    </Switch>
        
  </BrowserRouter>,
  document.getElementById("root")
);