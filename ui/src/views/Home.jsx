import React, { Component } from "react";
import { Navbar, Footer, Search, News, Cookie } from "../components";
import { withRouter } from "react-router-dom";
import MetaTags from "react-meta-tags";
import { Trans } from "react-i18next";
import i18n from "../i18n";
// const Nav = withRouter(Navbar);

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = { width: window.innerWidth };
    this.nav = React.createRef();

    let images = [
      {
        image:
          "https://cdn.discordapp.com/attachments/508629797421973504/557583753048883210/unknown.png",
        artists: [
          {
            name: "Phinbella Flynn",
            link:
              "https://www.deviantart.com/phinbella-flynn/art/Kyle-of-the-Drows-Elves-758454504"
          }
        ]
      },
      {
        image:
          "https://cdn.discordapp.com/attachments/508629797421973504/557583946972659713/unknown.png",
        artists: [
          {
            name: "Phinbella Flynn",
            link:
              "https://www.deviantart.com/phinbella-flynn/art/Imp-Tweek-and-Pastor-Craig-759904344"
          }
        ]
      },
      {
        image:
          "https://cdn.discordapp.com/attachments/508629797421973504/557584096780615684/unknown.png",
        artists: [
          {
            name: "Phinbella Flynn",
            link:
              "https://www.deviantart.com/phinbella-flynn/art/Ninjew-761261363"
          }
        ]
      },
      {
        image:
          "https://cdn.discordapp.com/attachments/508629797421973504/557583867305918475/unknown.png",
        artists: [
          {
            name: "Phinbella Flynn",
            link:
              "https://www.deviantart.com/phinbella-flynn/art/Sci-Fi-battle-Collab-with-FoxReed-754690512"
          },
          {
            name: "FoxReed",
            link:
              "https://www.deviantart.com/foxreed/art/Sci-Fi-Battle-754690201"
          }
        ]
      },
      //Second Update Boyos
      {
        image:
          "https://cdn.discordapp.com/attachments/558375135719981056/573976217640894481/unknown.png",
        artists: [
          {
            name: "Nally#1608",
            link:
              "https://discordapp.com/invite/sppd"
          }
        ]
      },
      {
        image:
          "https://cdn.discordapp.com/attachments/558375135719981056/573976246065561610/unknown.png",
        artists: [
          {
            name: "Nally#1608",
            link:
              "https://discordapp.com/invite/sppd"
          }
        ]
      },
      {
        image:
          "https://cdn.discordapp.com/attachments/558375135719981056/573976741610258482/unknown.png",
        artists: [
          {
            name: "FoxReed",
            link:
              "https://www.deviantart.com/foxreed/art/Heroes-762266460"
          }
        ]
      },
      {
        image:
        "https://cdn.discordapp.com/attachments/558375135719981056/573977304825331736/unknown.png",
        artists: [
          {
            name: "FoxReed",
            link:
            "https://www.deviantart.com/foxreed/art/Toolshed-750657405"
          }
        ]
      },
      {
        image:
          "https://cdn.discordapp.com/attachments/558375135719981056/573989130531373098/unknown.png",
        artists: [
          {
            name: "Phinbella Flynn",
            link:
              "https://www.deviantart.com/phinbella-flynn/art/Barbarian-Tweek-766698197"
          }
        ]
      },
      {
        image:
          "https://cdn.discordapp.com/attachments/558375135719981056/573985627285225491/unknown.png",
        artists: [
          {
            name: "Phinbella Flynn",
            link:
              "https://www.deviantart.com/phinbella-flynn/art/Clyde-s-brithday-768309950"
          }
        ]
      }
    ];

    this.randomImage = images[Math.floor(Math.random() * images.length)];
  }

  componentDidMount = () => {
    this.updateWindowDimensions();
    this.updateScrollPosition();
    window.addEventListener("resize", this.updateWindowDimensions);
    window.addEventListener("scroll", this.updateScrollPosition);

    let navchild = this.nav.current.navbar.current;
  };

  componentWillUnmount = () => {
    window.removeEventListener("resize", this.updateWindowDimensions);
    window.removeEventListener("scroll", this.updateScrollPosition);
  };

  updateWindowDimensions = () => {
    this.setState({ width: window.innerWidth });
  };

  updateScrollPosition = () => {
    //console.log(this.nav);

    if (window.scrollY < 60) {
      this.nav.current.navbar.current.classList.add("trans");
    } else {
      this.nav.current.navbar.current.classList.remove("trans");
    }

    //this.setState({ scroll: window.scrollY });
  };

  changeLang = lang => {
    i18n.changeLanguage(lang, () => this.forceUpdate())
  }

  render() {
    return (
      <div>
        <MetaTags>
          <title>{i18n.t("Card List")} | Feinwaru SPPD</title>
          <meta
            name="description"
            content={i18n.t("Description")}
          />
          <meta property="og:title" content="Card List | Feinwaru SPPD" />
          <meta
            property="og:image"
            content="https://cdn.discordapp.com/attachments/558375135719981056/564821280944029716/cards.png"
          />
          {Object.keys(i18n.store.data).map((e, i) => {
            return <link key={i} rel="alternate" hrefLang={e.toLowerCase()} href={"https://sppd.feinwaru.com/?hl=" + e.toLowerCase()} />
          })}
          {Object.keys(i18n.options.fallbackLng).map((e, i) => {
            if (e === "default") {
              return
            } else {
              return <link key={i} rel="alternate" hrefLang={e.toLowerCase()} href={"https://sppd.feinwaru.com/?hl=" + e.toLowerCase()} />
            }
          })}
        </MetaTags>

        <Navbar ref={this.nav} changeLang={this.changeLang} />
        <Cookie />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-100 banner"
          viewBox={`${
            this.state.width > 1920 ? "0" : (1920 - this.state.width) / 2
          } 0 ${this.state.width > 1920 ? "1920" : this.state.width} 491.125`}
          filter="brightness(.5)"
        >
          <defs>
            <clipPath id="banner">
              <path
                d="M-1,325.3s370.314,177.1,930.267,91.215S1919,502.764,1919,502.764V11.639L-.991,11.684Z"
                transform="translate(1 -11.639)"
              />
            </clipPath>
          </defs>
          <image
            xlinkHref={this.randomImage.image}
            clipPath="url(#banner)"
            width="1920"
            height="500"
          />
        </svg>
        <div className="container my-5">
          <div
            className="credits row"
            style={{
              marginTop: "-80px",
              marginBottom: "10px",
              textAlign: "right"
            }}
          >
            <div className="col-12">
              {(() => {
                const links = this.randomImage.artists.map((e, i) => (
                  <a key={i} href={e.link}>
                    {e.name}
                  </a>
                ));

                return (
                  <span>
                    {" "}
                    <Trans>Banner</Trans>{" "}
                    {links.map((ay, ya, yaa) =>
                      ya === yaa.length - 1 ? ay : <span key={ya}>{ay}, </span>
                    )}
                  </span>
                );
              })()}
            </div>
          </div>
          <News />
          <Search />
        </div>
        <Footer />
      </div>
    );
  }
}

export default Index;
