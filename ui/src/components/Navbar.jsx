import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.navbar = React.createRef();
  }

  componentDidMount() {
    /* ~~ Fancy OwO Console Log UwU ycnaF ~~ */
    console.log(`%cSPPD by Feinwaru`, "font-weight: bold; font-size: 50px; color: #1E98A1");
    console.log("GitHub: https://github.com/feinwarusoftware/sppd");
    console.log("Discord: https://discord.feinwaru.com/");
    console.log("API Docs: https://github.com/feinwarusoftware/sppd/blob/master/docs/api.md");
  }

  mobileDropdown = () => {
    if (this.navbar.current.classList.contains("dropped")) {
      this.navbar.current.classList.remove("dropped");
    } else {
      this.navbar.current.classList.add("dropped");
    }
  }

  randomCard = () => {
    fetch("http://dragon.feinwaru.com/api/v1/cards/list")
      .then(res => res.json())
      .then(
        (result) => {
          let random = result.data[Math.floor(Math.random() * result.data.length)];

          window.location.href = "/" + random.image
        },
        (error) => {
          console.error("AHHHHHHHHH")
        }
      );
  }

  render() {

    return (
      <React.Fragment>
        <nav ref={this.navbar} >
          <div className="container">
            <Link to={{ pathname: "/" }}><img src={require("../static/img/sppd_white.svg")} /></Link>
            <i onClick={() => this.mobileDropdown()} id="dropdown" className="fas fa-bars float-right fa-2x"></i>
            <ul>
              <li>
                <Link to={{ pathname: "/" }}>Home</Link>
              </li>
              <li>
                <a onClick={() => this.randomCard()}>Random Card</a>
              </li>
              <li>
                <a href="https://awesomo.feinwaru.com/">Discord Bot</a>
              </li>
              <li>
                <a href="https://patreon.com/awesomo" className="support">Support Us</a>
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
