import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <React.Fragment>
        <footer>
          <img
            className="swoosh"
            src={require("../static/img/footer.svg")}
          />
          <div className="footer-contents">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-xs-12 col-md-6 col-lg-3">
                  <img
                    className="img-fluid mx-auto px-4 mb-3"
                    src={require("../static/img/feinwaru_logo.svg")}
                  />
                  <p>
                    &copy; 2017 - {new Date().getFullYear()} Copyright: Feinwaru
                    Software
                  </p>
                </div>
                <div className="col-6 col-lg-3">
                  <h2>ABOUT</h2>
                  <h1>FEINWARU</h1>
                  <ul>
                    <li>
                      <a>Our Team</a>
                    </li>
                    <li>
                      <a>Branding</a>
                    </li>
                    <li>
                      <a>Discord</a>
                    </li>
                    <li>
                      <a>Careers</a>
                    </li>
                  </ul>
                </div>
                <div className="col-6 col-lg-3">
                  <h2>OUR</h2>
                  <h1>PROJECTS</h1>
                  <ul>
                    <li>
                      <a>AWESOM-O</a>
                    </li>
                    <li>
                      <a>SPPD</a>
                    </li>
                    <li>
                      <a>SPPD Mobile</a>
                    </li>
                    <li>
                      <a>more...</a>
                    </li>
                  </ul>
                </div>
                <div className="col-6 col-lg-3">
                  <h2>EXTRA</h2>
                  <h1>RESOURCES</h1>
                  <ul>
                    <li>
                      <a>Help & Support</a>
                    </li>
                    <li>
                      <a>Developers</a>
                    </li>
                    <li>
                      <a>Feedback</a>
                    </li>
                    <li>
                      <a>Terms & Privacy</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </React.Fragment>
    );
  }
}

export default Footer;
