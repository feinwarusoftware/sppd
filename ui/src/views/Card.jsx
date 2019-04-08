import React, { Component } from "react";
import { Navbar, Footer, Search } from "../components";
import MetaTags from 'react-meta-tags';

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

  _fetchCardData = () => {
    let url;

    if (this.props.location.state == null) {
      url = `http://dragon.feinwaru.com/api/v1/cards/image/${this.props.location.pathname.slice(1)}`;
    } else {
      url = `http://dragon.feinwaru.com/api/v1/cards/${this.props.location.state.id}`;
    }

    return new Promise((resolve, reject) => {
      fetch(url)

        .then(res => res.json())
        .then(res => {
          if (res.error != null) {
            /*
            return this.setState({
              loaded: true,
              error: res.error
            });
            */

            return reject(error);
          }

          /*
          this.setState({
            loaded: true,
            data: res.data
          });
          */

          resolve(res.data)
        })
        .catch(error => {
          /*
          this.setState({
            loaded: true,
            error
          });
          */

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

    /*
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
    */

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
              a.powers[0].radius += v;
            } else {
              return console.error("error applying upgrade stats 2: " + k);
            }
          }
          /*
          if (a.power_type === k) {
            a.power_amount += v;
          } else {
            if (a[k] != null) {
              a[k] += v;
            } else {
              return console.error("error applying upgrade stats 2");
            }
          }
          */
        } else {
          return console.error("error applying upgrade stats 3");
        }
      }

      return a;
    }, alteredCard);

    /*
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
    */

    alteredCard.description = alteredCard.description.replace(/\{(.*?)\}/g, match => {
      const bracketless = match.slice(1, match.length - 1);
      //console.log(alteredCard);

      function getPowerAmount(powerType) {
        return alteredCard.powers.find(power => {
          return power.type === powerType
        }).amount;
      }

      if (alteredCard[bracketless] == null) {


        /*if (bracketless === "power_hero_damage" && alteredCard.power_hero_damage == null) {
          console.log ('é nulo' + alteredCard);
          return alteredCard.power_damage / 10;
        }*/
        if (bracketless === "power_hero_damage") {
          let powerAmount = getPowerAmount("power_hero_damage");
          if (powerAmount == null) {
            return getPowerAmount("power_damage") / 10;
          }
          else {
            return powerAmount;
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

  _redrawCard = card => {
    document.fonts.load('17px "South Park Ext"').then(() => {


      const canvas = this.canvas.current;
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const rarity = card.rarity;
      const theme = card.theme;
      const characterType = card.character_type;

      /* --- pasted old code --- */

      // Get the frame outline.
      const frameWidth = 305;
      const frameHeight = 418;

      let x, y, z, w;

      switch (rarity) {
        case 0: // common
          y = 0;
          switch (theme) {
            case "adventure":
              x = frameWidth;
              break;
            case "sci-fi":
              x = frameWidth * 2;
              break;
            case "mystical":
              x = frameWidth * 3;
              break;
            case "fantasy":
              x = frameWidth * 4;
              break;
            case "general":
              x = 0;
              break;
            default:
              //message.reply("theme not found");
              return;
          }
          break;
        default:
          y = frameHeight;
          switch (theme) {
            case "adventure":
              x = frameWidth;
              break;
            case "sci-fi":
              x = frameWidth * 2;
              break;
            case "mystical":
              x = frameWidth * 3;
              break;
            case "fantasy":
              x = frameWidth * 4;
              break;
            case "general":
              x = 0;
              break;
            default:
              //message.reply("theme not found");
              return;
          }
          break;
      }

      z = frameWidth;
      w = frameHeight;

      // Get the frame top.
      const topWidth = 338;
      const topHeight = 107;

      let fx, fy, fz, fw;

      fx = 0;

      switch (rarity) {
        case 0: // common
          fy = undefined;
          break;
        case 1:
          fy = 0;
          break;
        case 2:
          fy = topHeight;
          break;
        case 3:
          fy = topHeight * 2;
          break;
        default:
          //message.reply("rarity not found");
          return;
      }

      fz = topWidth;
      fw = topHeight;

      // Get the icon.
      const iconWidth = 116;
      const iconHeight = 106;

      let ix, iy, iz, iw;

      switch (characterType) {
        case "tank":
          iy = 0;
          break;
        case undefined:
          iy = iconHeight * 2;
          break;
        case "assassin":
          iy = iconHeight * 4;
          break;
        case "ranged":
          iy = iconHeight * 6;
          break;
        case "melee":
          iy = iconHeight * 8;
          break;
        case "totem":
          iy = iconHeight * 10;
          break;
      }

      switch (rarity) {
        case 0: // common
          switch (theme) {
            case "general":
              ix = 0;
              break;
            case "adventure":
              ix = iconWidth;
              break;
            case "sci-fi":
              ix = iconWidth * 2;
              break;
            case "mystical":
              ix = iconWidth * 3;
              break;
            case "fantasy":
              ix = iconWidth * 4;
              break;
          }
          break;
        case 1:
          iy += iconHeight;
          ix = 0;
          break;
        case 2:
          iy += iconHeight;
          ix = iconWidth;
          break;
        case 3:
          iy += iconHeight;
          ix = iconWidth * 2;
          break;
      }

      iz = iconWidth;
      iw = iconHeight;

      // Get the overlay.
      const overlayWidth = 305;
      const overlayHeight = 418;

      let ox, oy, oz, ow;

      oy = 0;

      switch (characterType) {
        case undefined:
          ox = overlayWidth;
          break;
        default:
          ox = 0;
          break;
      }

      oz = overlayWidth;
      ow = overlayHeight;

      // Card theme icons.
      const themeIconWidth = 36;
      const themeIconHeight = 24;

      let tx, ty, tz, tw;

      ty = 0;

      switch (theme) {
        case "general":
          tx = 0;
          break;
        case "adventure":
          tx = themeIconWidth;
          break;
        case "sci-fi":
          tx = themeIconWidth * 2;
          break;
        case "mystical":
          tx = themeIconWidth * 3;
          break;
        case "fantasy":
          tx = themeIconWidth * 4;
          break;
        default:
          //message.reply("theme not found");
          return;
      }

      tz = themeIconWidth;
      tw = themeIconHeight;

      // Crystal things.
      const crystalSheet = {
        x: 0,
        y: 24,
        width: 180,
        height: 76 // 36 + 4 + 36
      };

      const crystalWidth = 36;
      const crystalHeight = 36;

      let cx, cy, cz, cw;

      cy = crystalSheet.y;

      switch (rarity) {
        case 0: // common
          switch (theme) {
            case "general":
              cx = 0;
              break;
            case "adventure":
              cx = crystalWidth;
              break;
            case "sci-fi":
              cx = crystalWidth * 2;
              break;
            case "mystical":
              cx = crystalWidth * 3;
              break;
            case "fantasy":
              cx = crystalWidth * 4;
              break;
            default:
              //message.reply("theme not found");
              return;
          }
          break;
        case 1:
          cy += crystalHeight + 4;
          cx = 17;
          break;
        case 2:
          cy += crystalHeight + 4;
          cx = 34 + crystalWidth;
          break;
        case 3:
          cy += crystalHeight + 4;
          cx = 34 + crystalWidth * 2;
          break;
        default:
          //message.reply("rarity not found");
          return;
      }

      cz = crystalWidth;
      cw = crystalHeight;

      if (rarity === 3) {
        cz += 17;
      }

      /* --- end of old code --- */

      /* --- load images --- */
      const checkImage = path => {
        return new Promise((resolve, reject) => {
          const img = new Image();

          img.onload = () => resolve(img);
          img.onerror = () => reject();

          img.src = path;
        });
      }

      const checkImages = paths => Promise.all(paths.map(checkImage));

      const imageList = {
        charTypeIcons: "http://dragon.feinwaru.com/card-character-type-icons.png",
        cardThemeIcons: "http://dragon.feinwaru.com/card-theme-icons.png",
        frameOutlines: "http://dragon.feinwaru.com/frame-outline.png",
        frameOverlays: "http://dragon.feinwaru.com/frame-overlay.png",
        frameTops: "http://dragon.feinwaru.com/frame-top.png",
        bgImage: `http://dragon.feinwaru.com/backgrounds/${this.card.image}.jpg`
      };

      checkImages(Object.values(imageList)).then(imgs => {

        const mapToObj = map => {
          const obj = {};
          map.forEach((v, k) => { obj[k] = v; });

          return obj;
        }

        const roundedImage = (ctx, x, y, width, height, radius) => {
          ctx.beginPath();
          ctx.moveTo(x + radius, y);
          ctx.lineTo(x + width - radius, y);
          ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
          ctx.lineTo(x + width, y + height - radius);
          ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
          ctx.lineTo(x + radius, y + height);
          ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
          ctx.lineTo(x, y + radius);
          ctx.quadraticCurveTo(x, y, x + radius, y);
          ctx.closePath();
        }

        const images = mapToObj(new Map(imgs.map(e => [Object.entries(imageList).find(f => f[1] === e.src)[0], e])));

        /* --- draw to canvas --- */

        // current canvas w x h: 526 x 769

        // defined at the top of the file!
        // const bgWidth = 455;
        // const bgHeight = 630;

        //console.log(bgHeight);

        ctx.save();
        roundedImage(ctx, canvas.width / 2 - bgWidth / 2, canvas.height / 2 - bgHeight / 2, bgWidth, bgHeight, 60);
        ctx.clip();
        ctx.drawImage(images.bgImage, canvas.width / 2 - bgWidth / 2, canvas.height / 2 - bgHeight / 2, bgWidth, bgHeight);
        ctx.restore();
        ctx.drawImage(images.frameOverlays, ox, oy, oz, ow, canvas.width / 2 - bgWidth / 2, canvas.height / 2 - bgHeight / 2, bgWidth, bgHeight);
        ctx.drawImage(images.frameOutlines, x, y, z, w, canvas.width / 2 - bgWidth / 2, canvas.height / 2 - bgHeight / 2, bgWidth, bgHeight);

        //console.log(canvas.height / 2 - bgHeight / 2);

        if (fy != null) {
          ctx.drawImage(images.frameTops, fx, fy, fz, fw, canvas.width / 2 - bgWidth / 2 - 33, canvas.height / 2 - bgHeight / 2 - 45, bgWidth + 49, 200);
        }

        ctx.drawImage(images.charTypeIcons, ix, iy, iz, iw, canvas.width / 2 - bgWidth / 2 - 42, canvas.height / 2 - bgHeight / 2 - 106, iconWidth * 1.5, iconHeight * 1.5);
        ctx.drawImage(images.cardThemeIcons, tx, ty, tz, tw, canvas.width / 2 - bgWidth / 2 + 32, canvas.height / 2 - bgHeight / 2 + 556, themeIconWidth * 1.5, themeIconHeight * 1.5);

        let xoffset = 0;
        if (rarity === 3) {
          xoffset = 25;
        }

        ctx.drawImage(images.cardThemeIcons, cx, cy, cz, cw, canvas.width / 2 - bgWidth / 2 + 32 - xoffset, canvas.height / 2 - bgHeight / 2 + 460, crystalWidth * 1.5 + xoffset, crystalHeight * 1.5);

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

        // const name = "Oshino Shinobu";
        // const mana_cost = 7;
        // const health = 23;
        // const damage = 27;
        // const level = "lvl 7";
        // const description = "It’s beautiful. I’ve looked at this for 5 hours now.";
        // const description = "Flying. Gives 1 bonus damage to all allies when he hits an enemy. Heals 4 Health to all allies when he kills an enemy.";

        ctx.font = "25px South Park Ext";
        ctx.lineWidth = 1;
        ctx.strokeText(name, canvas.width / 2 - bgWidth / 2 + 245, canvas.height / 2 - bgHeight / 2 + 60);
        ctx.fillText(name, canvas.width / 2 - bgWidth / 2 + 245, canvas.height / 2 - bgHeight / 2 + 60);

        ctx.font = "60px South Park Ext";
        ctx.lineWidth = 2;
        ctx.strokeText(mana_cost, canvas.width / 2 - bgWidth / 2 + 60, canvas.height / 2 - bgHeight / 2 + 130);
        ctx.fillText(mana_cost, canvas.width / 2 - bgWidth / 2 + 60, canvas.height / 2 - bgHeight / 2 + 130);

        if (ox === 0) {
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

        //console.log(lineCount);

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

        // ctx.strokeText(description, 419, 800);
        // ctx.fillText(description, 419, 800);

        /* --- draw to canvas end --- */
      });
    });
    /* --- load images end --- */
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

    //console.log(altered);

    // sections
    const sections = [];

    const createSection = (title, stats) => {
      const createSubSection = stats => {
        return (
          <ul className="list-unstyled align">
            {Object.entries(stats).map((e, i) => e[1] == null ? "" :
              <li key={i}>
                <span className="font-weight-bold dark-grey-text">{e[0]}: </span>
                <span>{e[1]}</span>
              </li>
            )}
          </ul>
        );
      };

      return (
        <div key={title}>
          <h4 className="font-weight-bold mt-5">{title}{Object.keys(stats).length === 0 ? <span> <i className="fas fa-lg fa-times red-text"></i></span> : ""}</h4>
          <div className="divider" />
          {stats instanceof Array ? stats.length > 0 ? stats.map((e, i) => <div key={i}>{createSubSection(e)}</div>) : "" : Object.keys(stats).length > 0 ? createSubSection(stats) : ""}
        </div>
      );
    }

    const deSnake = string => string && string.split("_").join(" ");
    const upperCase = string => string && string.split(" ").map(e => `${e[0].toUpperCase()}${e.slice(1)}`).join(" ");

    // utility
    const card = altered;

    //console.log(card);

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

    sections.push(createSection("General Information", general));

    let powers = [];
    if ((card.powers == null ? 0 : card.powers.length) !== 0) {
      card.powers.forEach(e => {
        let power = {};

        power = {
          ...power,
          "Power Type": e.type,
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
            "Charged Power Radius": e.radius
          };
        }

        powers.push(power);
      });
    }

    sections.push(createSection("Power Information", powers));

    let attack = {};
    if (card.can_attack === true) {
      attack = {
        ...attack,
        "Attack Range": card.attack_range,
        "Pre-Attack Delay": card.pre_attack_delay,
        "Knockback": card.knockback,
        "Knockback Angle": `${card.knockback_angle} at 45°`,
        "Time Between Attacks": card.time_between_attacks,
      };
    }

    sections.push(createSection("Can Attack?", attack));

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

    sections.push(createSection(Object.keys(aoe).length === 0 ? "AOE Attacks?" : <span>AOE Attacks? <span>{aoe.aoe_type}</span></span>, aoe))

    let requirements = {
      "Minimum Episode Completed": card.min_episode_completed,
      "Minimum PVP Rank Required": card.min_pvp_rank,
      "Minimum Player Level": card.min_player_level,
    };

    sections.push(createSection("Requirements", requirements));

    //Matt section
    const awCommands = <ul className="list-unstyled">{[...altered.aliases, altered.name].map((e, i) => (
      <li key={i} className="pb-2">
        <code>-card {e == null ? ["teehee", "rawrxd"][Math.floor(Math.random() * 2)] : e.toLowerCase()} {this.state.utype}{this.state.uvalue}</code>
      </li>
    ))}</ul>;

    return (
      <div>
        <Navbar />
        
        <MetaTags>
          <title>{altered.name} | Feinwaru SPPD</title>
          <meta name="description" content="SPPD is a website created to let users see all the statistics for the game 'South Park: Phone Destroyer' in an easy to use and understand way." />
          <meta property="og:title" content={altered.name + " | Feinwaru SPPD"} />
          <meta property="og:image" content={"/backgrounds/" + altered.image + ".jpg"} />
        </MetaTags>

        <div id="card-page" className="container">
          <div className="row">
            <div className="col-4">
              <canvas className="img-fluid" ref={this.canvas} width={canvasWidth} height={canvasHeight} />
            </div>
            <div id="card-info" className="col-8">
              <h1 className="font-weight-bold">{altered.name}</h1>
              <h5 id="desc" className="my-3 font-italic">
                {altered.description}
              </h5>
              <h4 id="class" className="font-weight-bold">
                <span className="capitalism">{rarities[altered.rarity]}</span> | <span className="capitalism">{altered.type === "spell" ? "spell" : altered.character_type}</span>
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
                  <span id="damage">{altered.damage}</span>
                </span>
              </h4>

              <h4 className="font-weight-bold mt-3">Select an upgrade level</h4>
              <div className="divider" />
              <div className="form-group">
                <select className="form-control" id="exampleFormControlSelect1" onChange={change => this.handleDropdownChange(change)}>
                  {
                    altered.type === "spell" || altered.type === "spawn" ?
                      <>
                        <option>Level 1</option>
                        <option>Level 2</option>
                        <option>Level 3</option>
                        <option>Level 4</option>
                        <option>Level 5</option>
                        <option>Level 6</option>
                        <option>Level 7</option>
                      </> :
                      <>
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
                      </>
                  }
                </select>
              </div>

              <h4 className="font-weight-bold mt-5">AWESOM-O Discord Commands</h4>
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
