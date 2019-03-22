import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <React.Fragment>
        <nav>
          <div className="container">
            <img src={require("../static/img/sppd_white.svg")} />
            <ul>
              <li>
                <a>Home</a>
              </li>
              <li>
                <a>Random Card</a>
              </li>
              <li>
                <a>Discord Bot</a>
              </li>
              <li>
                <a className="support">Support Us</a>
              </li>
              <li>
                <a>
                  <i className="fas fa-globe-africa" /> EN
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </React.Fragment>
    );
  }
}

export default Navbar;
