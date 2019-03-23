import React, { Component } from "react";
import { Navbar, Footer, Search } from "../components";

export default class Card extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div id="card-page" className="container">
          <div className="row">
            <div className="col-4" />
            <div id="card-info" className="col-8">
              <h1 className="font-weight-bold">Bounty Hunter Kyle</h1>
              <h5 id="desc" className="my-3 font-italic">
                Flying. Gives 1 bonus damage to all allies when he hits an
                enemy. Heals 40 Health to all allies when he kills an enemy.
              </h5>
              <h4 id="class" className="font-weight-bold">
                Epic | Ranged
              </h4>
              <h4 id="quickstats" className="font-weight-bold">
                <span className="light-blue-text">
                  <i className="fa fa-bolt" aria-hidden="true" /> 12
                </span>{" "}
                <span className="red-text pl-2">
                  <i className="fa fa-heart" aria-hidden="true" /> 12
                </span>{" "}
                <span className="orange-text pl-2">
                  <i className="fas fa-swords" aria-hidden="true" />{" "}
                  <span id="damage">23</span>
                </span>
              </h4>

              <h4 className="font-weight-bold mt-3">Select an upgrade level</h4>
              <div className="divider" />
              <div className="form-group">
                <select className="form-control" id="exampleFormControlSelect1">
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
                  <span>Own Side</span>
                </li>
                <li>
                  <span className="font-weight-bold dark-grey-text">
                    Max Velocity:
                  </span>
                  <span>0.855</span>
                </li>
                <li>
                  <span className="font-weight-bold dark-grey-text">
                    Time To Reach Max Velocity:
                  </span>
                  <span>0.1 seconds</span>
                </li>
                <li>
                  <span className="font-weight-bold dark-grey-text">
                    Agro Range Multiplier:
                  </span>
                  <span>1.2x</span>
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
