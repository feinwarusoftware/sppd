import { hot } from "react-hot-loader/root";
import React, { useEffect } from "react";
import "bootstrap/scss/bootstrap.scss";
import "../src/static/css/fa_all.scss";
import "../style.scss";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import ScrollToTop from "./components/ScrollToTop.jsx";
import "./i18n";

import Home from "./views/Home.jsx";
import Card from "./views/Card.jsx";
import Error from "./views/Error.jsx";
const history = createBrowserHistory();

// const devMode = process.env.NODE_ENV !== "production";

const App = () => {
  useEffect(() => {
    /* ~~ Fancy OwO Console Log UwU ycnaF ~~ */
    console.log(
      `%cSPPD by Feinwaru`,
      "font-weight: bold; font-size: 50px; color: #1E98A1"
    );
    console.log("GitHub: https://github.com/feinwarusoftware/sppd");
    console.log("Discord: https://discord.feinwaru.com/");
    console.log(
      "API Docs: https://github.com/feinwarusoftware/sppd/blob/master/docs/api.md"
    );
  }, []);
  
  return (
    <Router history={history}>
      <ScrollToTop>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/error" component={Error} />
          <Route exact path="/:card" component={Card} />
        </Switch>
      </ScrollToTop>
    </Router>
  );
};

const app = process.env.NODE_ENV === "development" ? hot(App) : App;
export default app;
