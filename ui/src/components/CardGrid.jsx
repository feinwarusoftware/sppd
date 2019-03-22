import React, { Component } from "react";

class CardGrid extends Component {
  render() {
    return (
      <React.Fragment>
        <div class="grid-card col-4 text-center mb-4">
          <div
            className="grid-img img-fluid"
            style={{
              backgroundImage: `url(${require("../static/img/backgrounds/KyleSciCard.jpg")})`
            }}
          />
          <h4 className="mt-2 mb-0 font-weight-bold">Ultra Gay Boy</h4>
          <h5 className="mt-0 font-weight-bold">Epic | Ranged</h5>
          <h6 className="font-weight-bold">
            <span className="light-blue-text">
              <i className="fa fa-bolt" aria-hidden="true" /> 3
            </span>{" "}
            <span className="red-text pl-2">
              <i className="fa fa-heart" aria-hidden="true" /> 127
            </span>{" "}
            <span className="orange-text pl-2">
              <i className="fa fa-shield-alt" aria-hidden="true" />{" "}
              <span id="damage">27</span>
            </span>
          </h6>
        </div>
      </React.Fragment>
    );
  }
}

export default CardGrid;
