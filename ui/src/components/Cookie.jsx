import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Cookies from "universal-cookie";
import { Trans } from "react-i18next";

const cookies = new Cookies();

class Cookie extends Component {

  constructor(props) {
    super(props);
    this.cookie = React.createRef();
  }

  componentDidMount() {
    let status = cookies.get("cookie-status");

    if (status == null){
      this.cookie.current.style.display = "block";
    } else if (status === "accepted") {
      this.cookie.current.style.display = "none";
    }
  }

  acceptCookie = () => {
    this.cookie.current.style.display = "none";
    cookies.set("cookie-status", "accepted", { maxAge: 31622400 }); // 1 year
  }

  render() {
    return (
      <React.Fragment>
        <div id="cookie" ref={this.cookie}>
          <div className="container">
            <button onClick={() => {this.acceptCookie()}} className="px-4 btn btn-sm btn-sppd float-right"><Trans>Got It!</Trans></button>         
            <p className="mb-0"><Trans>Cookie Message</Trans></p>
            <a rel="nofollow" href="https://cookiesandyou.com/"><Trans>Learn More</Trans></a>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Cookie;
