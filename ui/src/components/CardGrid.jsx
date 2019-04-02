import React, { Component } from "react";
import { colours } from "../utils";

import { Redirect } from "react-router";

class CardGrid extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false
    };
  }

  handleCardClick = () => {
    this.setState({
      redirect: true
    });
  }

  render() {
    if (this.state.redirect === true) {
      return ( 
        <Redirect
          push
          to={{
            pathname: `/${this.props.image.includes("/") ? this.props.id : this.props.image}`,
            state: {
              id: this.props.id
            }
          }} />
      );
    }

    let rarityString;
    switch(this.props.rarity) {
      case 0: {
        rarityString = "common";
        break;
      };
      case 1: {
        rarityString = "rare";
        break;
      };
      case 2: {
        rarityString = "epic";
        break;
      };
      case 3: {
        rarityString = "legendary";
        break;
      }
    }

    let charTypeString;
    if (this.props.type === "spell") {
      charTypeString = "spell";
    } else {
      charTypeString = this.props.characterType;
    }

    return (
      <React.Fragment>
        <div className="grid-card col-6 col-lg-4 col-xl-3 text-center mb-4">
          <div
            onClick={() => this.handleCardClick()}

            className="grid-img img-fluid"
            style={{
              backgroundImage: `url(${
                this.props.image.includes("/")
                  ? this.props.image
                  : require(`../static/img/backgrounds/${this.props.image}.jpg`)
              })`,
              borderImageSource: `linear-gradient(180deg, ${
                colours[
                  rarityString === "common"
                    ? this.props.theme
                    : rarityString
                ]
              } 0%, ${
                colours[
                  rarityString === "common"
                    ? this.props.theme
                    : rarityString
                ]
              } 30%, ${colours[this.props.theme]} 30%, ${
                colours[this.props.theme]
              } 100%)`
            }}
          />
          <h4 className="mt-2 mb-0 font-weight-bold">{this.props.name}</h4>
          <h5 className="mt-0 font-weight-bold capitalism">
            {rarityString} | {charTypeString}
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
