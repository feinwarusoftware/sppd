import React, { Component } from "react";
import { colours } from "../utils";
import { Trans } from "react-i18next"
import { Redirect } from "react-router";

const STATIC_ROOT = process.env.NODE_ENV === "development" ? "http://localhost:1337" : "https://sppd.feinwaru.com";
const API_ROOT = `${STATIC_ROOT}/api/v1`;

class CardGrid extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
      redirect: false,
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error, errorInfo) {
    console.error(error, errorInfo);
  }

  // Copied from Card.jsx, would add to a lib file but running out of time.
  _calculateCardAugmentData = (original, utype, uvalue) => {
    const card = original;

    const upgradeSequence = [4, 10, 10, 15, 15, 15];

    const baseLevel = 1;
    const baseUpgrade = 1;

    const type = utype;
    if (type == null) {
      return console.error("no type specified");
    }
    if (type !== "u" && type !== "l") {
      return console.error("incorrect type specified");
    }

    const value = parseInt(uvalue);
    if (isNaN(value) === true) {
      return console.error("no value specified");
    }
    if (typeof value !== "number") {
      return console.error("incorrect value specified");
    }
    if (value < 1 || (type === "l" && value > 7) || (type === "u" && value > 70)) {
      return console.error("out of bounds value specified");
    }

    let requiredLevels = 0;
    let requiredUpgrades = 0;

    if (type === "u") {
      let currentLevels = 0;
      let currentUpgrades = 0;

      for (let i = 0; i < upgradeSequence.length; i++) {
        currentUpgrades += upgradeSequence[i];
        
        if (value < (currentUpgrades + baseUpgrade + 1)) {
          break;
        }

        currentLevels++;
      }

      requiredLevels = currentLevels;
      requiredUpgrades = value - baseUpgrade;
    }

    if (type === "l") {
      requiredLevels = value - baseLevel;
      requiredUpgrades = upgradeSequence.slice(0, requiredLevels).reduce((a, c) => a + c, 0);
    }

    const addReduceSlot = (a, c) => a[c.property] == null ? { ...a, [c.property]: c.value } : { ...a, [c.property]: a[c.property] + c.value };
    const alteredStats = card.tech_tree.slots.slice(0, requiredUpgrades).reduce(addReduceSlot, card.tech_tree.levels.slice(0, requiredLevels).reduce((a, c) => [ ...a, ...c.slots ], []).reduce(addReduceSlot, {}));

    // stat merge
    let alteredCard = { ...card };

    if (alteredStats.power_unlock != null) {
      alteredCard.is_power_locked = false;
      delete alteredStats.power_unlock;
    }

    alteredCard = [alteredStats].reduce((a, c) => {
      for (let [k, v] of Object.entries(c)) {
        if (k.startsWith("stat_")) {
          if (a[k.slice(5)] != null) {
            a[k.slice(5)] += v;
          } else if (a[k.slice(9)] != null) { 
            a[k.slice(9)] += v;
          } else {
            return console.error("error applying upgrade stats 1");
          }
        } else if (k.startsWith("power_")) {
          if (a.power_type === k) {
            a.power_amount += v;
          } else {
            if (a[k] != null) {
              a[k] += v;
            } else {
              return console.error("error applying upgrade stats 2");
            }
          }
        } else {
          return console.error("error applying upgrade stats 3");
        }
      }

      return a;
    }, alteredCard);

    alteredCard.description = alteredCard.description.replace(/\{(.*?)\}/g, match => {
      const bracketless = match.slice(1, match.length - 1);
      //console.log(alteredCard);

      function getPowerAmount(powerType){
        return (alteredCard.powers.find(power => {
          return power.type === powerType
        }) || {}).amount;
      }

      if (alteredCard[bracketless] == null) {


        /*if (bracketless === "power_hero_damage" && alteredCard.power_hero_damage == null) {
          console.log ('é nulo' + alteredCard);
          return alteredCard.power_damage / 10;
        }*/
        if (bracketless === "power_hero_damage"){
          let powerAmount = getPowerAmount("power_hero_damage");
          if(powerAmount == null){
            return getPowerAmount("power_damage") / 10;
          }
          else{
            return powerAmount;
          }
        } else if (bracketless === "power_duration_min") {
          return alteredCard.powers[0].duration - 1;
        } else if (bracketless === "power_duration_max") {
          return alteredCard.powers[0].duration + 1;
        } else if (bracketless === alteredCard.power_type) {
          return alteredCard.power_amount;
        } else if(bracketless === "power_duration") {
          return alteredCard.powers[0].duration;
          //this is fucked up, I know, baby - do an array for these ones, if string - power_ is "poison, damage, attack_boost, heal", just return getPowerAmount - a.k.a. optimze later
        } else if(bracketless === "power_poison") {
          return getPowerAmount('power_poison');
        } else if(bracketless === "power_damage"){
          return getPowerAmount("power_damage");
        } else if(bracketless === "power_attack_boost") {
          return getPowerAmount("power_attack_boost");
        } else if(bracketless === "power_heal") {
          return getPowerAmount("power_heal");
        } else if(bracketless === "power_max_hp_gain") {
          return getPowerAmount("power_max_hp_gain");
        } else if(bracketless === "power_target") {
          return getPowerAmount("power_target");
        } else if(bracketless === "power_max_hp_loss") {
          return getPowerAmount("power_max_hp_loss");
        } else if(bracketless === "power_attack_decrease") {
          return getPowerAmount("power_attack_decrease");
        }
        else {
          return "undefined";
        }

      } else {
        return alteredCard[bracketless];
      }
    });

    if ((alteredCard.powers[0] || {}).locked === true) {
      alteredCard.description = "Power locked at this level/upgrade."
    }

    return alteredCard;
  }
  //

  handleCardClick = () => {
    this.setState({
      redirect: true
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <h1>something went wrong :(</h1>
      );
    }

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
    } else if (this.props.type === "trap"){
      charTypeString = "trap"
    } else {
      charTypeString = this.props.characterType;
    }

    // shitty temp error handling
    let altered = null;
    try {
      altered = this._calculateCardAugmentData({ ...this.props.card, tech_tree: { slots: [], levels: [] } }, "l", 10);
    
      if (altered == null) {
        throw new Error("well... something went wrong here");
      }
    } catch (error) {
      altered = {
        description: "something went wrong :(",
      };

      console.error(error);
    }

    return (
      <React.Fragment>
        <div className="grid-card list col-12 col-sm-6 mb-3">
          <div
            onClick={() => this.handleCardClick()}

            className="inner"
            style={{
              backgroundImage: `url(${STATIC_ROOT}${this.props.image_url || `/backgrounds/${this.props.image}.jpg`})`,
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
          >
            <div className="inner-content px-3">
              <h4 className="mt-2 mb-0 font-weight-bold">{this.props.name}</h4>
              <h5 className="mt-0 font-weight-bold capitalism">
                {<Trans>{rarityString}</Trans>} | <Trans>{charTypeString}</Trans>
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
                  <i className="fa fa-swords" aria-hidden="true" />{" "}
                  {this.props.damage}
                </span>
              </h6>
              <p>{altered.description}</p>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default CardGrid;
