import React, { Component } from "react";
import { Navbar, Footer, Search } from "../components";

const rarities = ["common", "rare", "epic", "legendary"];
const castArea = {
  own_area:"Own Area",
  anywhere:"Anywhere"
}

const testingCardId = "5c9a44366b2ebf33e83fa4c1";

export default class Card extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
      error: null,
      data: null,
      // type: "u",
      // value: 1,
      altered: null
    }
  }

  fetchCardData = () => {
    const url = `http://localhost/api/v1/cards/${testingCardId}`;

    fetch(url)
    
    .then(res => res.json())
    .then(res => {
      if (res.error != null) {
        return this.setState({
          loaded: true,
          error: res.error
        });
      }

      this.setState({
        loaded: true,
        data: res.data
      });
    })
    .catch(error => {
      this.setState({
        loaded: true,
        error
      });
    });
  }

  updateCardData = (utype, uvalue) => {
    const card = this.state.data;

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

      if (alteredCard[bracketless] == null) {
        if (bracketless === alteredCard.power_type) {
          return alteredCard.power_amount;
        } else {
          return "undefined";
        }
      } else {
        return alteredCard[bracketless];
      }
    });

    if (alteredCard.is_power_locked === true) {
      alteredCard.description = "Power locked at this level/upgrade."
    }

    this.setState({
      altered: alteredCard
    });
  }

  handleDropdownChange = change => {
    const dropdownText = change.target.value;
    const split = dropdownText.split(" ");
    
    let type = null;
    let value = null;

    if (split[0].toLowerCase() === "upgrade") {
      type = "u";
    } else {
      type = "l";
    }

    const num = parseInt(split[1]);
    // yes i realise im handling this error twice now, fuck me
    if (isNaN(num) === true) {
      return console.error("u/l value nan");
    }

    value = num;

    this.updateCardData(type, value);
  }

  render() {
    if (this.state.loaded === false || this.state.error != null) {
      this.fetchCardData();
      
      return <h1>loading...</h1>
    }

    if (this.state.altered == null) {
      this.updateCardData("u", 1);

      return <h1>still loading...</h1>
    }

    return (
      <div>
        <Navbar />
        <div id="card-page" className="container">
          <div className="row">
            <div className="col-4" />
            <div id="card-info" className="col-8">
              <h1 className="font-weight-bold">{this.state.altered.name}</h1>
              <h5 id="desc" className="my-3 font-italic">
                {this.state.altered.description}
              </h5>
              <h4 id="class" className="font-weight-bold">
                <span className="capitalism">{rarities[this.state.altered.rarity]}</span> | <span className="capitalism">{this.state.altered.type === "spell" ? "spell" : this.state.altered.character_type}</span>
              </h4>
              <h4 id="quickstats" className="font-weight-bold">
                <span className="light-blue-text">
                  <i className="fa fa-bolt" aria-hidden="true" /> {this.state.altered.mana_cost}
                </span>{" "}
                <span className="red-text pl-2">
                  <i className="fa fa-heart" aria-hidden="true" /> {this.state.altered.health}
                </span>{" "}
                <span className="orange-text pl-2">
                  <i className="fas fa-swords" aria-hidden="true" />
                  <span id="damage">{this.state.altered.damage}</span>
                </span>
              </h4>

              <h4 className="font-weight-bold mt-3">Select an upgrade level</h4>
              <div className="divider" />
              <div className="form-group">
                <select className="form-control" id="exampleFormControlSelect1" onChange={change => this.handleDropdownChange(change)}>
                  <option>Upgrade 1 / 70</option>
                  <option>Upgrade 2 / 70</option>
                  <option>Upgrade 3 / 70</option>
                  <option>Upgrade 4 / 70</option>
                  <option>Upgrade 5 / 70</option>
                  <option>Level 2</option>
                  <option>Upgrade 6 / 70</option>
                  <option>Upgrade 7 / 70</option>
                  <option>Upgrade 8 / 70</option>
                  <option>Upgrade 9 / 70</option>
                  <option>Upgrade 10 / 70</option>
                  <option>Upgrade 11 / 70</option>
                  <option>Upgrade 12 / 70</option>
                  <option>Upgrade 13 / 70</option>
                  <option>Upgrade 14 / 70</option>
                  <option>Upgrade 15 / 70</option>
                  <option>Level 3</option>
                  <option>Upgrade 16 / 70</option>
                  <option>Upgrade 17 / 70</option>
                  <option>Upgrade 18 / 70</option>
                  <option>Upgrade 19 / 70</option>
                  <option>Upgrade 20 / 70</option>
                  <option>Upgrade 21 / 70</option>
                  <option>Upgrade 22 / 70</option>
                  <option>Upgrade 23 / 70</option>
                  <option>Upgrade 24 / 70</option>
                  <option>Upgrade 25 / 70</option>
                  <option>Level 4</option>
                  <option>Upgrade 26 / 70</option>
                  <option>Upgrade 27 / 70</option>
                  <option>Upgrade 28 / 70</option>
                  <option>Upgrade 29 / 70</option>
                  <option>Upgrade 30 / 70</option>
                  <option>Upgrade 31 / 70</option>
                  <option>Upgrade 32 / 70</option>
                  <option>Upgrade 33 / 70</option>
                  <option>Upgrade 34 / 70</option>
                  <option>Upgrade 35 / 70</option>
                  <option>Upgrade 36 / 70</option>
                  <option>Upgrade 37 / 70</option>
                  <option>Upgrade 38 / 70</option>
                  <option>Upgrade 39 / 70</option>
                  <option>Upgrade 40 / 70</option>
                  <option>Level 5</option>
                  <option>Upgrade 41 / 70</option>
                  <option>Upgrade 42 / 70</option>
                  <option>Upgrade 43 / 70</option>
                  <option>Upgrade 44 / 70</option>
                  <option>Upgrade 45 / 70</option>
                  <option>Upgrade 46 / 70</option>
                  <option>Upgrade 47 / 70</option>
                  <option>Upgrade 48 / 70</option>
                  <option>Upgrade 49 / 70</option>
                  <option>Upgrade 50 / 70</option>
                  <option>Upgrade 51 / 70</option>
                  <option>Upgrade 52 / 70</option>
                  <option>Upgrade 53 / 70</option>
                  <option>Upgrade 54 / 70</option>
                  <option>Upgrade 55 / 70</option>
                  <option>Level 6</option>
                  <option>Upgrade 56 / 70</option>
                  <option>Upgrade 57 / 70</option>
                  <option>Upgrade 58 / 70</option>
                  <option>Upgrade 59 / 70</option>
                  <option>Upgrade 60 / 70</option>
                  <option>Upgrade 61 / 70</option>
                  <option>Upgrade 62 / 70</option>
                  <option>Upgrade 63 / 70</option>
                  <option>Upgrade 64 / 70</option>
                  <option>Upgrade 65 / 70</option>
                  <option>Upgrade 66 / 70</option>
                  <option>Upgrade 67 / 70</option>
                  <option>Upgrade 68 / 70</option>
                  <option>Upgrade 69 / 70</option>
                  <option>Upgrade 70 / 70</option>
                  <option>Level 7</option>
                </select>
              </div>

              <h4 className="font-weight-bold mt-5">General Information</h4>
              <div className="divider" />

              <ul className="list-unstyled align">
                <li>
                  <span className="font-weight-bold dark-grey-text">
                    Cast Area:
                  </span>
                  <span>{castArea["temp"]}</span>
                </li>
                <li>
                  <span className="font-weight-bold dark-grey-text">
                    Max Velocity:
                  </span>
                  <span>{"temp"}</span>
                </li>
                <li>
                  <span className="font-weight-bold dark-grey-text">
                    Time To Reach Max Velocity:
                  </span>
                  <span>{"temp"} seconds</span>
                </li>
                <li>
                  <span className="font-weight-bold dark-grey-text">
                    Agro Range Multiplier:
                  </span>
                  <span>{"temp"}x</span>
                </li>
              </ul>

              <h4 className="font-weight-bold mt-5">Power Information</h4>
              <div className="divider" />

              <ul className="list-unstyled">
                <li className="power-stat kylehack">
                  <span className="font-weight-bold dark-grey-text">
                    Attack Boost:
                  </span>
                  <span id="PowerAttackBoost" className="power-stat-value">
                    1
                  </span>
                  <span
                    className="badge ThemeColour Sci"
                    id="PowerAttackBoost-increase-amount"
                  />
                </li>
                <li className="power-stat" >
                  <span className="font-weight-bold dark-grey-text">
                    Attack Decrease:
                  </span>
                  <span id="PowerAttackDecrease" className="power-stat-value">
                    N/A
                  </span>
                  <span
                    className="badge ThemeColour Sci"
                    id="PowerAttackDecrease-increase-amount"
                  />
                </li>
                <li className="power-stat" >
                  <span className="font-weight-bold dark-grey-text">
                    Power Damage:
                  </span>
                  <span id="PowerDamage" className="power-stat-value">
                    N/A
                  </span>
                  <span
                    className="badge ThemeColour Sci"
                    id="PowerDamage-increase-amount"
                  />
                </li>
                <li className="power-stat kylehack">
                  <span className="font-weight-bold dark-grey-text">Duration:</span>
                  <span id="PowerDuration" className="power-stat-value">
                    Infinite seconds
                  </span>
                  <span
                    className="badge ThemeColour Sci"
                    id="PowerDuration-increase-amount"
                  />
                </li>
                <li className="power-stat">
                  <span className="font-weight-bold dark-grey-text">Heal:</span>
                  <span id="PowerHeal" className="power-stat-value">
                    40
                  </span>
                  <span
                    className="badge ThemeColour Sci"
                    id="PowerHeal-increase-amount"
                  />
                </li>
                <li className="power-stat" >
                  <span className="font-weight-bold dark-grey-text">
                    Hero Damage:
                  </span>
                  <span className="power-stat-value">N/A</span>
                </li>
                <li className="power-stat" >
                  <span className="font-weight-bold dark-grey-text">
                    Hero Heal:
                  </span>
                  <span className="power-stat-value">N/A</span>
                </li>
                <li className="power-stat" >
                  <span className="font-weight-bold dark-grey-text">Poison:</span>
                  <span className="power-stat-value">N/A</span>
                </li>
                <li className="power-stat" >
                  <span className="font-weight-bold dark-grey-text">
                    Max HP Gain:
                  </span>
                  <span id="PowerMaxHPGain" className="power-stat-value">
                    N/A
                  </span>
                  <span
                    className="badge ThemeColour Sci"
                    id="PowerMaxHPGain-increase-amount"
                  />
                </li>
                <li className="power-stat" >
                  <span className="font-weight-bold dark-grey-text">
                    Max HP Loss:
                  </span>
                  <span id="PowerMaxHPLoss" className="power-stat-value">
                    N/A
                  </span>{" "}
                  <span
                    className="badge ThemeColour Sci"
                    id="PowerMaxHPLoss-increase-amount"
                  />
                </li>
                <li className="power-stat" >
                  <span className="font-weight-bold dark-grey-text">
                    Poision Amount:
                  </span>
                  <span id="PowerPoisonAmount" className="power-stat-value">
                    N/A
                  </span>{" "}
                  <span
                    className="badge ThemeColour Sci"
                    id="PowerPoisonAmount-increase-amount"
                  />
                </li>
                <li className="power-stat" >
                  <span className="font-weight-bold dark-grey-text">
                    Summon Level:
                  </span>
                  <span id="PowerSummonLevel" className="power-stat-value">
                    N/A
                  </span>{" "}
                  <span
                    className="badge ThemeColour Sci"
                    id="PowerSummonLevel-increase-amount"
                  />
                </li>
                <li className="power-stat" >
                  <span className="font-weight-bold dark-grey-text">
                    Target Amount:
                  </span>
                  <span id="PowerTarget" className="power-stat-value">
                    0
                  </span>{" "}
                  <span
                    className="badge ThemeColour Sci"
                    id="PowerTarget-increase-amount"
                  />
                </li>
                <li className="power-stat kylehack tokenhack">
                  <span className="font-weight-bold dark-grey-text">
                    Charged Power Radius:
                  </span>
                  <span id="PowerRange" className="power-stat-value">
                    Global
                  </span>{" "}
                  <span
                    className="badge ThemeColour Sci"
                    id="PowerRange-increase-amount"
                  />
                </li>
                <li
                  className="power-stat kylehack tokenhack"
                  
                >
                  <span className="font-weight-bold dark-grey-text">
                    Charged Power Regen:
                  </span>
                  <span className="power-stat-value">0</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
