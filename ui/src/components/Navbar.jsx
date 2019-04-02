import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Navbar extends Component {

  constructor(props) {
    super(props);
  
    this.navbar = React.createRef();
  }

  mobileDropdown = () => {
    if (this.navbar.current.classList.contains('dropped')){
      this.navbar.current.classList.remove('dropped');
    } else {
      this.navbar.current.classList.add('dropped');
    }
  }

  render() {
    return (
      <React.Fragment>
        <nav ref={this.navbar} >
          <div className="container">
            <img src={require("../static/img/sppd_white.svg")} />
            <i onClick={() => this.mobileDropdown()} id="dropdown" className="fas fa-bars float-right fa-2x"></i>
            <ul>
              <li>
                <Link to={{pathname: "/"}}>Home</Link>
              </li>
              <li>
                <a>Random Card</a>
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
