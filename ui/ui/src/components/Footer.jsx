import React, { Component } from "react";
import i18n from "../i18n";
import { Trans } from "react-i18next";

class Footer extends Component {
  render() {
    return (
      <React.Fragment>
        <footer>
          <img
            draggable="false"
            className="swoosh"
            src={require("../static/img/footer.svg")}
          />
          <div className="footer-contents">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-xs-12 col-md-6 col-lg-3">
                  <img
                    draggable="false"
                    className="img-fluid mx-auto px-4 mb-3"
                    src={require("../static/img/feinwaru_logo.svg")}
                  />
                  <p>
                    &copy; 2017 - {new Date().getFullYear()} <Trans>Copyright</Trans>
                  </p>
                </div>
                <div className="col-12 col-sm-6 col-lg-3">
                  <h2>{i18n.t("About Feinwaru").split(" ").slice(0, -1).join(" ").toUpperCase()}</h2>
                  <h1>{i18n.t("About Feinwaru").split(" ").pop().toUpperCase()}</h1>
                  <ul>
                    <li>
                      <a href="https://awesomo.feinwaru.com/soontm"><Trans>Our Team</Trans></a>
                    </li>
                    <li>
                      <a href="https://awesomo.feinwaru.com/soontm"><Trans>Branding</Trans></a>
                    </li>
                    <li>
                      <a href="https://discord.feinwaru.com/">Discord</a>
                    </li>
                    <li>
                      <a href="https://awesomo.feinwaru.com/soontm"><Trans>Careers</Trans></a>
                    </li>
                  </ul>
                </div>
                <div className="col-12 col-sm-6 col-lg-3">
                  <h2>{i18n.t("Our Projects").split(" ").slice(0, -1).join(" ").toUpperCase()}</h2>
                  <h1>{i18n.t("Our Projects").split(" ").pop().toUpperCase()}</h1>
                  <ul>
                    <li>
                      <a href="https://awesomo.feinwaru.com/">AWESOM-O</a>
                    </li>
                    <li>
                      <a href="https://sppd.feinwaru.com/">SPPD</a>
                    </li>
                    <li>
                      <a href="https://awesomo.feinwaru.com/soontm"><Trans>SPPD Mobile</Trans></a>
                    </li>
                    <li>
                      <a href="https://awesomo.feinwaru.com/soontm"><Trans>more...</Trans></a>
                    </li>
                  </ul>
                </div>
                <div className="col-12 col-sm-6 col-lg-3">
                  <h2>{i18n.t("Extra Resources").split(" ").slice(0, -1).join(" ").toUpperCase()}</h2>
                  <h1>{i18n.t("Extra Resources").split(" ").pop().toUpperCase()}</h1>
                  <ul>
                    <li>
                      <a href="https://awesomo.feinwaru.com/docs/welcome"><Trans>Help & Support</Trans></a>
                    </li>
                    <li>
                      <a href="https://github.com/feinwarusoftware/sppd"><Trans>Developers</Trans></a>
                    </li>
                    <li>
                      <a href="https://github.com/feinwarusoftware/sppd/issues/new"><Trans>Feedback</Trans></a>
                    </li>
                    <li>
                      <a href="https://awesomo.feinwaru.com/soontm"><Trans>Terms & Privacy</Trans></a>
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
