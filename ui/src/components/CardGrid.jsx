import React, { Component } from "react";
import { colours } from "../utils";

class CardGrid extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="grid-card col-6 col-lg-4 col-xl-3 text-center mb-4">
          <div
            className="grid-img img-fluid"
            style={{
              backgroundImage: `url(${
                this.props.image.includes("/")
                  ? this.props.image
                  : require(`../static/img/backgrounds/${this.props.image}.jpg`)
              })`,
              borderImageSource: `linear-gradient(180deg, ${
                colours[
                  this.props.rarity === "common"
                    ? this.props.theme
                    : this.props.rarity
                ]
              } 0%, ${
                colours[
                  this.props.rarity === "common"
                    ? this.props.theme
                    : this.props.rarity
                ]
              } 30%, ${colours[this.props.theme]} 30%, ${
                colours[this.props.theme]
              } 100%)`
            }}
          />
          <h4 className="mt-2 mb-0 font-weight-bold">{this.props.name}</h4>
          <h5 className="mt-0 font-weight-bold capitalism">
            {this.props.rarity} | {this.props.characterType}
          </h5>
          <h6 className="font-weight-bold">
            <span className="light-blue-text">
              <i className="fa fa-bolt" aria-hidden="true" />{" "}
              {this.props.energy}
            </span>{" "}
            <span className="red-text pl-2">
              <i className="fa fa-heart" aria-hidden="true" />{" "}
              {this.props.health}
            </span>{" "}
            <span className="orange-text pl-2">
              <i className="fas fa-swords" aria-hidden="true" />{" "}
              <span id="damage">{this.props.damage}</span>
            </span>
          </h6>
        </div>
      </React.Fragment>
    );
  }
}

export default CardGrid;
