import React, { Component } from "react";
import { Navbar, Footer, LoadingIndicator } from "../components";
import MetaTags from 'react-meta-tags';
import i18n from "../i18n";
import { Trans } from "react-i18next";
import { removeUnderscores } from "../utils";

import { loadRequiredImages } from "../card_images";
import { objectFromEntries, cardRarityFromDb, cardThemeFromDb } from "../utils";
import { ctxDrawImageRounded } from "../card_draw";

const rarities = ["common", "rare", "epic", "legendary"];
const castArea = {
  own_area: "Own Area",
  anywhere: "Anywhere"
}

const canvasHeightWidthRatio = 1.5

const canvasWidth = 550;
const canvasHeight = canvasWidth * canvasHeightWidthRatio;

const bgHeightWidthRatio = 630 / 455;

const bgWidth = 455;
const bgHeight = bgWidth * bgHeightWidthRatio;

const testingCardId = "5ca253c86a4a8125802add88";

export default class Card extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
      error: null,
      utype: null,
      uvalue: null
    }

    this.card = null;

    this.canvas = React.createRef();

    // pre-loading
    this._fetchCardData()

      .then(card => {

        this.card = card;

        this.setState({
          loaded: true,
          utype: "l",
          uvalue: 1
        });
      })
      .catch(error => {

        this.setState({
          loaded: true,
          error
        });
      });
  }

  changeLang = lang => {
    i18n.changeLanguage(lang, () => this.forceUpdate())
  }

  _fetchCardData = () => {
    let url;

    if (this.props.location.state == null) {
      url = `api/v1/cards/image/${this.props.location.pathname.slice(1)}`;
    } else {
      url = `api/v1/cards/${this.props.location.state.id}`;
    }

    return new Promise((resolve, reject) => {
      fetch(url)

        .then(res => res.json())
        .then(res => {
          if (res.error != null) {

            return reject(error);
          }

          resolve(res.data)
        })
        .catch(error => {

          reject(error);
        });
    });
  }

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
    const alteredStats = card.tech_tree.slots.slice(0, requiredUpgrades).reduce(addReduceSlot, card.tech_tree.levels.slice(0, requiredLevels).reduce((a, c) => [...a, ...c.slots], []).reduce(addReduceSlot, {}));

    // stat merge
    // deep copy cos gay things
    let alteredCard = JSON.parse(JSON.stringify(card));

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
            return console.error("error applying upgrade stats 1: " + k);
          }
        } else if (k.startsWith("power_")) {
          const powerIndex = a.powers.findIndex(e => e.type === k)

          if (powerIndex !== -1) {
            a.powers[powerIndex].amount += v;
          } else {
            // if power duration is specified, assume
            //  that there is only one power
            if (k === "power_duration") {
              a.powers[0].duration += v;
            } else if (k === "power_range") {
              if(a.powers.length === 0) {
                //Specific cards like enforcer jimmy and dark angel red have the 
                //radius attribute but don't have a power 
                //(its a passive and there is no power radius attribute),
                // so the bot crashes trying to apply the radius upgrade 
                //because it will get the radius in the power array.
                //fix this cuz this is a temporary fix
              } else {
                a.powers[0].radius += v;
              }

            } else {
              return console.error("error applying upgrade stats 2: " + k);
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

      function getPowerAmount(powerType) {
        return alteredCard.powers.find(power => {
          return power.type === powerType
        }).amount;
      }

      if (alteredCard[bracketless] == null) {

        if (bracketless === "power_hero_damage") {
           
          const powerHeroDamage = getPowerAmount("power_damage");

          if (original.image === "CraigAdvCard") {
              return Math.round((powerHeroDamage -1)/5);
          } else if (original.image === "TimmyAdvCard") {
              return Math.round((powerHeroDamage -1)/2);
          } else {
              return Math.round((powerHeroDamage -1)/10);
          }
        } else if (bracketless === "power_duration_min") {
          return alteredCard.powers[0].duration - 1;
        } else if (bracketless === "power_duration_max") {
          return alteredCard.powers[0].duration + 1;
        } else if (bracketless === alteredCard.power_type) {
          return alteredCard.power_amount;
        } else if (bracketless === "power_duration") {
          return alteredCard.powers[0].duration;
          //this is fucked up, I know, baby - do an array for these ones, if string - power_ is "poison, damage, attack_boost, heal", just return getPowerAmount - a.k.a. optimze later
        } else if (bracketless === "power_poison") {
          return getPowerAmount('power_poison');
        } else if (bracketless === "power_damage") {
          return getPowerAmount("power_damage");
        } else if (bracketless === "power_attack_boost") {
          return getPowerAmount("power_attack_boost");
        } else if (bracketless === "power_heal") {
          return getPowerAmount("power_heal");
        } else if (bracketless === "power_hero_heal") {
          const powerHeroHeal = getPowerAmount("power_heal")
            return Math.round((powerHeroHeal - 1)/10);
        } else if (bracketless === "power_max_hp_gain") {
          return getPowerAmount("power_max_hp_gain");
        } else if (bracketless === "power_target") {
          return getPowerAmount("power_target");
        } else if (bracketless === "power_max_hp_loss") {
          return getPowerAmount("power_max_hp_loss");
        } else if (bracketless === "power_attack_decrease") {
          return getPowerAmount("power_attack_decrease");
        }
        else {
          return "undefined";
        }

      } else {
        return alteredCard[bracketless];
      }
    });

    // if power is locked, assume only one power present
    if ((alteredCard.powers[0] || {}).locked === true) {
      alteredCard.description = "Power locked at this level/upgrade."
    }

    return alteredCard;
  }

  _redrawCard = async card => {

    // Load font and images required for card render
    const cardData = {
      rarity: cardRarityFromDb(card.rarity),
      theme: cardThemeFromDb(card.theme),
      type: card.type,
      character_type: card.character_type,
      image: card.image
    };

    let assets;

    try {
      assets = (await Promise.all([document.fonts.load('17px "South Park Ext"'), loadRequiredImages(cardData)])).slice(1);      
      assets = objectFromEntries(assets[0].map(e => [e.asset.split("-").map((f, i) => i === 0 ? f : f[0].toUpperCase() + f.slice(1)).join(""), e.image]));

    } catch(error) {
      console.error(error);
    }

    // Create canvas and get context for drawing
    const canvas = this.canvas.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctxDrawImageRounded(ctx, canvas.width / 2 - bgWidth / 2, canvas.height / 2 - bgHeight / 2, bgWidth, bgHeight, 60, assets.background, canvas.width / 2 - bgWidth / 2, canvas.height / 2 - bgHeight / 2, bgWidth, bgHeight);
    ctx.drawImage(assets.frameOverlay, canvas.width / 2 - bgWidth / 2, canvas.height / 2 - bgHeight / 2, bgWidth, bgHeight);
    ctx.drawImage(assets.frameOutline, canvas.width / 2 - bgWidth / 2, canvas.height / 2 - bgHeight / 2, bgWidth, bgHeight);
    
    if (assets.frameTop != null) {
      ctx.drawImage(assets.frameTop, canvas.width / 2 - bgWidth / 2 - 33, canvas.height / 2 - bgHeight / 2 - 45, bgWidth + 49, 200);
    }
    
    ctx.drawImage(assets.typeIcon, 0, 0, assets.typeIcon.width, assets.typeIcon.height, canvas.width / 2 - bgWidth / 2 - 42, canvas.height / 2 - bgHeight / 2 - 106, assets.typeIcon.width * 1.5, assets.typeIcon.height * 1.5);
    ctx.drawImage(assets.themeIcon, 0, 0, assets.themeIcon.width, assets.themeIcon.height, canvas.width / 2 - bgWidth / 2 + 32, canvas.height / 2 - bgHeight / 2 + 556, assets.themeIcon.width * 1.5, assets.themeIcon.height * 1.5);
    ctx.drawImage(assets.themeStone, 0, 0, assets.themeStone.width, assets.themeStone.height, canvas.width / 2 - bgWidth / 2 + 32 - 25, canvas.height / 2 - bgHeight / 2 + 460, assets.themeStone.width * 1.5, assets.themeStone.height * 1.5);

    // text
    ctx.fillStyle = "#ebe7ca";
    ctx.strokeStyle = "Black";
    ctx.textAlign = "center";

    const name = card.name;
    const mana_cost = card.mana_cost;
    const health = card.health;
    const damage = card.damage;
    const level = `${this.state.utype === "u" ? "u" : "lvl"} ${this.state.uvalue}`;
    const description = card.description;

    ctx.font = "25px South Park Ext";
    ctx.lineWidth = 1;
    ctx.strokeText(name, canvas.width / 2 - bgWidth / 2 + 245, canvas.height / 2 - bgHeight / 2 + 60);
    ctx.fillText(name, canvas.width / 2 - bgWidth / 2 + 245, canvas.height / 2 - bgHeight / 2 + 60);

    ctx.font = "60px South Park Ext";
    ctx.lineWidth = 2;
    ctx.strokeText(mana_cost, canvas.width / 2 - bgWidth / 2 + 60, canvas.height / 2 - bgHeight / 2 + 130);
    ctx.fillText(mana_cost, canvas.width / 2 - bgWidth / 2 + 60, canvas.height / 2 - bgHeight / 2 + 130);

    if (assets.frameOverlay.src.includes("character")) {
      ctx.font = "27px South Park Ext";
      ctx.lineWidth = 1;
      ctx.strokeText(health, canvas.width / 2 - bgWidth / 2 + 58, canvas.height / 2 - bgHeight / 2 + 262);
      ctx.fillText(health, canvas.width / 2 - bgWidth / 2 + 58, canvas.height / 2 - bgHeight / 2 + 262);

      ctx.font = "27px South Park Ext";
      ctx.lineWidth = 1;
      ctx.strokeText(damage, canvas.width / 2 - bgWidth / 2 + 58, canvas.height / 2 - bgHeight / 2 + 388);
      ctx.fillText(damage, canvas.width / 2 - bgWidth / 2 + 58, canvas.height / 2 - bgHeight / 2 + 388);
    }

    ctx.font = "16px South Park Ext";
    ctx.lineWidth = 1;
    ctx.strokeText(level, canvas.width / 2 - bgWidth / 2 + 245, canvas.height / 2 - bgHeight / 2 + 94);
    ctx.fillText(level, canvas.width / 2 - bgWidth / 2 + 245, canvas.height / 2 - bgHeight / 2 + 94);

    // description
    ctx.font = "17px South Park Ext";
    ctx.lineWidth = 1;

    const lineLengthCap = 325;
    const words = description.split(" ");

    let currentWords = [];
    let yoffset = 0;

    let lineCount = 1;
    for (let word of words) {
      if (ctx.measureText([...currentWords, word].join(" ")).width > lineLengthCap) {
        currentWords = [word];
        lineCount++;

        continue;
      }

      currentWords.push(word);
    }

    currentWords = [];

    for (let word of words) {
      if (ctx.measureText([...currentWords, word].join(" ")).width > lineLengthCap) {
        ctx.strokeText(currentWords.join(" "), canvas.width / 2 - bgWidth / 2 + 245, canvas.height / 2 - bgHeight / 2 + 515 + yoffset + (Math.abs(4 - lineCount) * 22 / 2));
        ctx.fillText(currentWords.join(" "), canvas.width / 2 - bgWidth / 2 + 245, canvas.height / 2 - bgHeight / 2 + 515 + yoffset + (Math.abs(4 - lineCount) * 22 / 2));

        currentWords = [word];
        yoffset += 22;

        continue;
      }

      currentWords.push(word);
    }
    ctx.strokeText(currentWords.join(" "), canvas.width / 2 - bgWidth / 2 + 245, canvas.height / 2 - bgHeight / 2 + 515 + yoffset + (Math.abs(4 - lineCount) * 22 / 2));
    ctx.fillText(currentWords.join(" "), canvas.width / 2 - bgWidth / 2 + 245, canvas.height / 2 - bgHeight / 2 + 515 + yoffset + (Math.abs(4 - lineCount) * 22 / 2));
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

    this.setState({
      utype: type,
      uvalue: value
    });
  }

  render() {
    let altered = null;
    if (this.state.loaded === false || this.state.error != null) {
      // aliases referenced later, set to a default value to prevent null reference
      // same with name
      altered = { aliases: [] };
    } else {
      altered = this._calculateCardAugmentData(this.card, this.state.utype, this.state.uvalue);
      this._redrawCard(altered);
    }

    // sections
    const sections = [];

    const createSection = (title, stats, key) => {
      const createSubSection = stats => {
        return (
          <ul className="list-unstyled align">
            {Object.entries(stats).map((e, i) => e[1] == null ? "" :
              <li key={i}>
                <span className="font-weight-bold dark-grey-text"><Trans>{e[0]}</Trans>: </span>
                <span>{e[1]}</span>
              </li>
            )}
          </ul>
        );
      };

      return (
        <div key={key}>
          <h4 className="font-weight-bold mt-5">{title}{Object.keys(stats).length === 0 ? <span> <i className="fas fa-sm fa-times red-text "></i></span> : ""}</h4>
          <div className="divider" />
          {stats instanceof Array ? stats.length > 0 ? stats.map((e, i) => <div key={i}>{createSubSection(e)}</div>) : "" : Object.keys(stats).length > 0 ? createSubSection(stats) : ""}
        </div>
      );
    }

    const deSnake = string => string && string.split("_").join(" ");
    const upperCase = string => string && string.split(" ").map(e => `${e[0].toUpperCase()}${e.slice(1)}`).join(" ");

    // utility
    const card = altered;

    let general = {
      "Cast Area": upperCase(deSnake(card.cast_area))
    };
    if (card.type === "character" && card.character_type !== "totem") {
      general = {
        ...general,
        "Max Velocity": card.max_velocity,
        "Time To Reach Max Velocity": `${card.time_to_reach_max_velocity} seconds`,
        "Agro Range Multiplier": `${card.agro_range_multiplier}x`
      };
    }

    sections.push(createSection(<Trans>General Information</Trans>, general, "general"));

    let powers = [];
    if ((card.powers == null ? 0 : card.powers.length) !== 0) {
      card.powers.forEach(e => {
        let power = {};

        power = {
          ...power,
          "Power Type": e.type == null ? null : removeUnderscores(e.type), 
          "Power Amount": e.amount
        };

        if (e.duration != null) {
          power = {
            ...power,
            "Power Duration": e.duration
          };
        }

        if (e.is_charged) {
          power = {
            ...power,
            "Charged Power Regen": e.charged_regen,
            "Power Range": e.radius
          };
        }

        powers.push(power);
      });
    }

    sections.push(createSection(<Trans>Power Information</Trans>, powers, "powers"));

    let attack = {};
    if (card.can_attack === true) {
      attack = {
        ...attack,
        "Attack Range": card.attack_range,
        "Pre-Attack Delay": card.pre_attack_delay,
        "Knockback": card.knockback,
        "Knockback Angle": `${card.knockback_angle}°`,
        "Time Between Attacks": card.time_between_attacks,
      };
    }

    sections.push(createSection(<Trans>Can Attack?</Trans>, attack, "attack"));

    let aoe = {};
    if (card.has_aoe === true) {
      aoe = {
        ...aoe,
        // this gets added as a span in the createSection() call
        // "AOE Type": card.aoe_type,
        "AOE Damage Percentage": `${card.aoe_damage_percentage}%`,
        "AOE Knockback Percentage": `${card.aoe_knockback_percentage}%`,
        "AOE Radius": card.aoe_radius,
      };
    }

    sections.push(createSection(Object.keys(aoe).length === 0 ? <Trans>AOE Attacks?</Trans> : <span><Trans>AOE Attacks?</Trans> <span>{aoe.aoe_type}</span></span>, aoe, "aoe"));

    let requirements = {
      "Minimum Episode Completed": card.min_episode_completed,
      "Minimum PVP Rank Required": card.min_pvp_rank,
      "Minimum Player Level": card.min_player_level,
      "Minimum PVP Arena": card.min_pvp_arena
    };

    sections.push(createSection(<Trans>Requirements</Trans>, requirements, "requirements"));

    //Matt section
    const awCommands = <ul className="list-unstyled">{[...altered.aliases, altered.name].map((e, i) => (
      <li key={i} className="pb-2">
        <code>-card {e == null ? ["teehee", "rawrxd"][Math.floor(Math.random() * 2)] : e.toLowerCase()} {this.state.utype}{this.state.uvalue}</code>
      </li>
    ))}</ul>;

    return (
      <div>
        <Navbar changeLang={this.changeLang} />

        <MetaTags>
          <title>{altered.name} | Feinwaru SPPD</title>
          <meta
            name="description"
            content={i18n.t("Description")}
          />
          <meta property="og:title" content={altered.name + " | Feinwaru SPPD"} />
          <meta property="og:image" content={"/backgrounds/" + altered.image + ".jpg"} />
          {Object.keys(i18n.store.data).map((e, i) => {
            return <link key={i} rel="alternate" hrefLang={e.toLowerCase()} href={"https://sppd.feinwaru.com/" + altered.image + "?hl=" + e.toLowerCase()} />
          })}
          {Object.keys(i18n.options.fallbackLng).map((e, i) => {
            if (e === "default") {
              return
            } else {
              return <link key={i} rel="alternate" hrefLang={e.toLowerCase()} href={"https://sppd.feinwaru.com/?hl=" + e.toLowerCase()} />
            }
          })}
        </MetaTags>

        <div id="card-page" className="container">
          <div className="row">
            <div className="col-12 col-md-4">
              <LoadingIndicator color="sppd" page="card" />
              <canvas className="img-fluid" ref={this.canvas} width={canvasWidth} height={canvasHeight} />
            </div>
            <div id="card-info" className="col-12 col-md-8">
              <h1 className="font-weight-bold">{altered.name}</h1>
              <h5 id="desc" className="my-3 font-italic">
                {altered.description}
              </h5>
              <h4 id="class" className="font-weight-bold">
                <span className="capitalism"><Trans>{rarities[altered.rarity]}</Trans></span> | <span className="capitalism"><Trans>{altered.type === "spell" ? "spell" : altered.type === "trap" ? "trap" : altered.character_type}</Trans></span>
              </h4>
              <h4 id="quickstats" className="font-weight-bold">
                <span className="light-blue-text">
                  <i className="fa fa-bolt" aria-hidden="true" /> {altered.mana_cost}
                </span>{" "}
                <span className="red-text pl-2">
                  <i className="fa fa-heart" aria-hidden="true" /> {altered.health}
                </span>{" "}
                <span className="orange-text pl-2">
                  <i className="fas fa-swords" aria-hidden="true" />
                  <span id="damage"> {altered.damage}</span>
                </span>
              </h4>

              <h4 className="font-weight-bold mt-3"><Trans>Select an upgrade level</Trans></h4>
              <div className="divider" />
              <div className="form-group">
                <select className="form-control" id="exampleFormControlSelect1" onChange={change => this.handleDropdownChange(change)}>
                  {
                    altered.type === "spell" || altered.type === "trap" || altered.type === "spawn" ?
                      <>
                        <option>{i18n.t("level", {num: 1})}</option>
                        <option>{i18n.t("level", {num: 2})}</option>
                        <option>{i18n.t("level", {num: 3})}</option>
                        <option>{i18n.t("level", {num: 4})}</option>
                        <option>{i18n.t("level", {num: 5})}</option>
                        <option>{i18n.t("level", {num: 6})}</option>
                        <option>{i18n.t("level", {num: 7})}</option>
                      </> :
                      <>
                        <option>{i18n.t("upgrade", {num: 1, total: 70})}</option>
                        <option>{i18n.t("upgrade", {num: 2, total: 70})}</option>
                        <option>{i18n.t("upgrade", {num: 3, total: 70})}</option>
                        <option>{i18n.t("upgrade", {num: 4, total: 70})}</option>
                        <option>{i18n.t("upgrade", {num: 5, total: 70})}</option>
                        <option>{i18n.t("level", {num: 2})}</option>
                        <option>{i18n.t("upgrade", {num: 6, total: 70})}</option>
                        <option>{i18n.t("upgrade", {num: 7, total: 70})}</option>
                        <option>{i18n.t("upgrade", {num: 8, total: 70})}</option>
                        <option>{i18n.t("upgrade", {num: 9, total: 70})}</option>
                        <option>{i18n.t("upgrade", {num: 10, total: 70})}</option>
                        <option>{i18n.t("upgrade", {num: 11, total: 70})}</option>
                        <option>{i18n.t("upgrade", {num: 12, total: 70})}</option>
                        <option>{i18n.t("upgrade", {num: 13, total: 70})}</option>
                        <option>{i18n.t("upgrade", {num: 14, total: 70})}</option>
                        <option>{i18n.t("upgrade", {num: 15, total: 70})}</option>
                        <option>{i18n.t("level", {num: 3})}</option>
                        <option>{i18n.t("upgrade", {num: 16, total: 70})}</option>
                        <option>{i18n.t("upgrade", {num: 17, total: 70})}</option>
                        <option>{i18n.t("upgrade", {num: 18, total: 70})}</option>
                        <option>{i18n.t("upgrade", {num: 19, total: 70})}</option>
                        <option>{i18n.t("upgrade", {num: 20, total: 70})}</option>
                        <option>{i18n.t("upgrade", {num: 21, total: 70})}</option>
                        <option>{i18n.t("upgrade", {num: 22, total: 70})}</option>
                        <option>{i18n.t("upgrade", {num: 23, total: 70})}</option>
                        <option>{i18n.t("upgrade", {num: 24, total: 70})}</option>
                        <option>{i18n.t("upgrade", {num: 25, total: 70})}</option>
                        <option>{i18n.t("level", {num: 4})}</option>
                        <option>{i18n.t("upgrade", {num: 26, total: 70})}</option>
                        <option>{i18n.t("upgrade", {num: 27, total: 70})}</option>
                        <option>{i18n.t("upgrade", {num: 28, total: 70})}</option>
                        <option>{i18n.t("upgrade", {num: 29, total: 70})}</option>
                        <option>{i18n.t("upgrade", {num: 30, total: 70})}</option>
                        <option>{i18n.t("upgrade", {num: 31, total: 70})}</option>
                        <option>{i18n.t("upgrade", {num: 32, total: 70})}</option>
                        <option>{i18n.t("upgrade", {num: 33, total: 70})}</option>
                        <option>{i18n.t("upgrade", {num: 34, total: 70})}</option>
                        <option>{i18n.t("upgrade", {num: 35, total: 70})}</option>
                        <option>{i18n.t("upgrade", {num: 36, total: 70})}</option>
                        <option>{i18n.t("upgrade", {num: 37, total: 70})}</option>
                        <option>{i18n.t("upgrade", {num: 38, total: 70})}</option>
                        <option>{i18n.t("upgrade", {num: 39, total: 70})}</option>
                        <option>{i18n.t("upgrade", {num: 40, total: 70})}</option>
                        <option>{i18n.t("level", {num: 5})}</option>
                        <option>{i18n.t("upgrade", {num: 41, total: 70})}</option>
                        <option>{i18n.t("upgrade", {num: 42, total: 70})}</option>
                        <option>{i18n.t("upgrade", {num: 43, total: 70})}</option>
                        <option>{i18n.t("upgrade", {num: 44, total: 70})}</option>
                        <option>{i18n.t("upgrade", {num: 45, total: 70})}</option>
                        <option>{i18n.t("upgrade", {num: 46, total: 70})}</option>
                        <option>{i18n.t("upgrade", {num: 47, total: 70})}</option>
                        <option>{i18n.t("upgrade", {num: 48, total: 70})}</option>
                        <option>{i18n.t("upgrade", {num: 49, total: 70})}</option>
                        <option>{i18n.t("upgrade", {num: 50, total: 70})}</option>
                        <option>{i18n.t("upgrade", {num: 51, total: 70})}</option>
                        <option>{i18n.t("upgrade", {num: 52, total: 70})}</option>
                        <option>{i18n.t("upgrade", {num: 53, total: 70})}</option>
                        <option>{i18n.t("upgrade", {num: 54, total: 70})}</option>
                        <option>{i18n.t("upgrade", {num: 55, total: 70})}</option>
                        <option>{i18n.t("level", {num: 6})}</option>
                        <option>{i18n.t("upgrade", {num: 56, total: 70})}</option>
                        <option>{i18n.t("upgrade", {num: 57, total: 70})}</option>
                        <option>{i18n.t("upgrade", {num: 58, total: 70})}</option>
                        <option>{i18n.t("upgrade", {num: 59, total: 70})}</option>
                        <option>{i18n.t("upgrade", {num: 60, total: 70})}</option>
                        <option>{i18n.t("upgrade", {num: 61, total: 70})}</option>
                        <option>{i18n.t("upgrade", {num: 62, total: 70})}</option>
                        <option>{i18n.t("upgrade", {num: 63, total: 70})}</option>
                        <option>{i18n.t("upgrade", {num: 64, total: 70})}</option>
                        <option>{i18n.t("upgrade", {num: 65, total: 70})}</option>
                        <option>{i18n.t("upgrade", {num: 66, total: 70})}</option>
                        <option>{i18n.t("upgrade", {num: 67, total: 70})}</option>
                        <option>{i18n.t("upgrade", {num: 68, total: 70})}</option>
                        <option>{i18n.t("upgrade", {num: 69, total: 70})}</option>
                        <option>{i18n.t("upgrade", {num: 70, total: 70})}</option>
                        <option>{i18n.t("level", {num: 7})}</option>
                      </>
                  }
                </select>
              </div>

              <h4 className="font-weight-bold mt-5"><Trans i18nKey="discord-commands"></Trans></h4>
              <div className="divider" />

              {awCommands}

              {sections}

            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
