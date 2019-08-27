import React, { Component } from "react";
import { CardGrid, CardList, LoadingIndicator } from "./index";
import Cookies from "universal-cookie";
import { Trans } from "react-i18next";
import { Link } from "react-router-dom";
import i18n from "../i18n";

const themes = ["adventure", "fantasy", "general", "mystical", "sci-fi", "superhero"];
const rarities = ["common", "rare", "epic", "legendary"];
const orderBy = ["name", "theme", "rarity", "energy", "health", "damage"];

const cookies = new Cookies();

const defaultView = "grid";
const defaultAutoload = false;
const defaultHover = true;

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: {
        loaded: false,
        error: null,
        total: 0,
        matched: 0,
        list: []
      },
      filters: {
        name: null,
        theme: null,
        rarity: null,
        sort: "name",
        order: 1
      },
      options: {
        view: cookies.get("view") || defaultView,
        autoload: cookies.get("autoload") === "true" || defaultAutoload,
        hover: cookies.get("hover") === "true" || defaultHover
      },

      // old
      view: cookies.get("view") || defaultView,

      error: null,
      isLoaded: false,

      loadingMoreCards: false
    };

    this.scrollRef = React.createRef();

    //
    this.loadingMoreCards = false;
  }

  _encodeUrl(url, params) {
    if (Object.keys(params).length === 0) {
      return url;
    }

    const [k, v] = Object.entries(params)[0];
    url += `?${k}=${v}`;

    for (let [k, v] of Object.entries(params).slice(1)) {
      url += `&${k}=${v}`;
    }

    return url;
  }

  _fetchCards(params) {
    const baseUrl = "api/v1/cards";

    // its called mana cost in the json
    if (params.sort === "energy") {
      params.sort = "mana_cost";
    }
    const encodedUrl = this._encodeUrl(baseUrl, params);

    //console.log(encodedUrl);

    return new Promise((resolve, reject) => {
      fetch(encodedUrl)
        .then(res => res.json())
        .then(res => {
          if (res.error != null) {
            return reject(res.error);
          }

          resolve(res.data);
        })
        .catch(error => reject);
    });
  }

  _updateCards(filters) {
    if (filters == null) {
      filters = this.state.filters;
    }

    let params = {};
    for (let [k, v] of Object.entries(filters)) {
      if (v != null) {
        params[k] = v;
      }
    }

    this._fetchCards(params)

      .then(data => {
        this.setState({
          cards: {
            loaded: true,
            error: null,
            total: data.total,
            matched: data.matched,
            list: data.cards
          }
        });
      })
      .catch(error => {
        this.setState({
          cards: {
            loaded: true,
            error,
            total: 0,
            matched: 0,
            list: []
          }
        });
      });
  }

  _changeView(view) {
    // set cookie
    cookies.set("view", view, { path: "/" });

    // set state
    this.setState({
      options: {
        ...this.state.options,
        view
      }
    });

    // reload cards - no need for this if its just a view change
    // this._updateCards();
  }

  _changeFilter(filter, value) {
    let filters = {};

    if (filter instanceof Object) {
      for (let [k, v] of Object.entries(filter)) {
        if (v === "") {
          fitler[k] = null;
        }
      }
      filters = {
        ...this.state.filters,
        ...filter
      };
    } else {
      filters = {
        ...this.state.filters,
        ...{ [filter]: value === "" ? null : value }
      };
    }

    this.setState({
      filters
    });

    this._updateCards(filters);
  }

  loadMoreCards() {
    if (this.loadingMoreCards === true) {
      return;
    }
    this.loadingMoreCards = true;
    this.setState({ loadingMoreCards: true });

    if (this.state.cards.list.length === this.state.cards.matched) {
      return;
    }

    let params = {};
    for (let [k, v] of Object.entries(this.state.filters)) {
      if (v != null) {
        params[k] = v;
      }
    }
    params.page = this.state.cards.list.length / 12;

    this._fetchCards(params)

      .then(data => {
        this.loadingMoreCards = false;
        this.setState({ loadingMoreCards: false });

        this.setState({
          cards: {
            loaded: true,
            error: null,
            total: data.total,
            matched: data.matched,
            list: [...this.state.cards.list, ...data.cards]
          }
        });
      })
      .catch(error => {
        this.loadingMoreCards = false;
        this.setState({ loadingMoreCards: false });

        this.setState({
          cards: {
            loaded: true,
            error,
            total: 0,
            matched: 0,
            list: []
          }
        });
      });
  }

  _handleScroll = event => {
    if (this.scrollRef == null || this.scrollRef.current == null) {
      return;
    }

    const top = this.scrollRef.current.getBoundingClientRect().top;

    if (
      top >= 0 &&
      top <= window.innerHeight &&
      this.state.options.autoload === true
    ) {
      this.loadMoreCards();
    }
  };

  componentDidMount() {
    window.addEventListener("scroll", this._handleScroll);

    this._updateCards();
  }

  /*
  componentDidMount() {
    const options = {
      root: this.rootRef.current,
      rootMargin: "0px",
      threshold: 1.0
    }

    const observer = new IntersectionObserver(() => {
      this.loadMoreCards();
    }, options);

    observer.observe(this.rootRef.current);

    this._updateCards();
  }
  */

  componentWillUnmount() {
    window.removeEventListener("scroll", this._handleScroll);
  }

  gridView = () => {
    this._changeView("grid");
  };

  listView = () => {
    this._changeView("list");
  };

  // Adolf Fitler
  filterTheme = theme => {
    if (theme === this.state.filters.theme) {
      return this._changeFilter("theme", null);
    }

    this._changeFilter("theme", theme);
  };

  _rarityAsInt = rarity => {
    switch(rarity) {
      case "common": {
        return 0;
      }
      case "rare": {
        return 1;
      }
      case "epic": {
        return 2;
      }
      case "legendary": {
        return 3;
      }
    }

    return -1;
  }

  filterRarity = rarity => {
    if (this._rarityAsInt(rarity) === this.state.filters.rarity) {
      return this._changeFilter("rarity", null);
    }

    this._changeFilter("rarity", this._rarityAsInt(rarity));
  };

  filterName = name => {
    this._changeFilter("name", name);
  };

  clearFilterName = () => {
    this._changeFilter("name", null);
  };

  toggleSort = sort => {
    if (this.state.filters.sort == null || this.state.filters.sort !== sort) {
      this._changeFilter({
        sort,
        order: 1
      });
    } else {
      if (this.state.filters.order === 1) {
        this._changeFilter({
          sort,
          order: -1
        });
      } else {
        this._changeFilter({
          sort: null,
          order: null
        });
      }
    }
  };

  toggleAutoload = () => {
    if (this.state.options.autoload === false) {
      cookies.set("autoload", true, { path: "/" });

      this.setState({
        options: {
          ...this.state.options,
          autoload: true
        }
      });
    } else {
      cookies.set("autoload", false, { path: "/" });

      this.setState({
        options: {
          ...this.state.options,
          autoload: false
        }
      });
    }
  };

  toggleHover = () => {
    if (this.state.options.hover === false) {
      cookies.set("hover", true, { path: "/" });

      this.setState({
        options: {
          ...this.state.options,
          hover: true
        }
      });
    } else {
      cookies.set("hover", false, { path: "/" });

      this.setState({
        options: {
          ...this.state.options,
          hover: false
        }
      });
    }
  };

  render() {
    let cardsYay = [];

    if (this.state.cards.loaded === true && this.state.error == null) {
      cardsYay = this.state.cards.list.map((e, i) => {
        if (this.state.options.view === "grid") {
          return (
            <CardGrid
              key={i}
              id={e._id}
              name={e.name}
              image={e.image}
              rarity={e.rarity}
              theme={e.theme}
              health={e.health}
              energy={e.mana_cost}
              damage={e.damage}
              type={e.type}
              characterType={e.character_type}
              hover={this.state.options.hover}
            />
          );
        } else if (this.state.options.view === "list") {
          return (
            <CardList
              key={i}
              id={e._id}
              name={e.name}
              description={e.description}
              image={e.image}
              rarity={e.rarity}
              theme={e.theme}
              health={e.health}
              energy={e.mana_cost}
              damage={e.damage}
              type={e.type}
              characterType={e.character_type}

              card={e}
            />
          );
        }
      });
    }

    return (
      <React.Fragment>
        <div className="row">
          <div id="search" className="col-12 px-sm-0">
            <input
              className="form-control form-control-lg"
              type="text"
              placeholder={i18n.t("search", {total: this.state.cards.total})}
              onKeyPress={e => {
                if (e.key === "Enter") {
                  this.filterName(e.target.value);
                }
              }}
              ref="search"
            />
            <i
              className={
                this.state.filters.name == null
                  ? "fas fa-lg fa-search"
                  : "fas fa-lg fa-times"
              }
              onClick={() => {
                if (
                  this.state.filters.name == null &&
                  this.refs.search.value != null
                ) {
                  this.filterName(this.refs.search.value);
                } else {
                  this.refs.search.value = "";
                  this.clearFilterName();
                }
              }}
            />
          </div>
        </div>
        <div id="result-bar" className="row my-5">
          <div id="results" className="col-8 col-md-10 pl-sm-0">
            <h2 className="font-weight-bold mb-0">
              {i18n.t("results", {count: this.state.cards.matched})}
            </h2>
          </div>
          <div id="views" className="col-4 col-md-2 text-right pr-sm-0">
            <i
              title={i18n.t("grid")} 
              onClick={() => this.gridView()}
              active={(this.state.options.view === "grid").toString()}
              className="fas fa-th"
            />
            <i
              title={i18n.t("list")} 
              onClick={() => this.listView()}
              active={(this.state.options.view === "list").toString()}
              className="fas fa-th-list"
            />
            <i
              title={i18n.t("auto-load")}                                                        
              onClick={() => this.toggleAutoload()}
              active={(this.state.options.autoload === true).toString()}
              className="fas fa-spinner"
            />
            <i
              title={i18n.t("hover-effect")}                                                        
              onClick={() => this.toggleHover()}
              active={(this.state.options.hover === true).toString()}
              className="fas fa-arrows-alt-v"
            />
          </div>
        </div>
        <div className="row mt-5">
          <div id="filters" className="col-12 col-md-3 pl-md-0 mb-5">
          <div className="row">
            <div id="order" className="col-6 col-sm-4 col-md-12 mb-5">
              <h4 className="font-weight-bold"><Trans>Order By</Trans></h4>
              <div className="divider" />
              {/*
                <p active="true">
                  <i className="fa fa-sort-amount-down" /> Name
                </p>
                <p>Energy</p>
                <p>Theme</p>
                <p>Rarity</p>
                <p>Damage</p>
                <p>Health</p>
              */}

              {[
                orderBy.map((e, i) => (
                  <p
                    key={i}
                    onClick={() => this.toggleSort(e)}
                    active={(this.state.filters.sort === e).toString()}
                    className={`capitalism`}
                  >
                    <i
                      className={`${
                        this.state.filters.sort === e
                          ? this.state.filters.order === 1
                            ? "fa fa-sort-amount-up"
                            : this.state.filters.order === -1
                            ? "fa fa-sort-amount-down"
                            : ""
                          : ""
                      }`}
                    />{" "}
                    <Trans>{e}</Trans>
                  </p>
                ))
              ]}
            </div>
            <div className="col-6 col-sm-4 col-md-12 mb-4">
              <h4 className="font-weight-bold"><Trans>Theme</Trans></h4>
              <div className="divider" />
              {[
                themes.map((e, i) => (
                  <p
                    key={i}
                    onClick={() => this.filterTheme(e)}
                    active={(this.state.filters.theme === e).toString()}
                    className="capitalism"
                  >
                    <span /> <Trans>{e}</Trans>
                  </p>
                ))
              ]}
            </div>
            <div className="col-6 col-sm-4 col-md-12 ">
              <h4 className="font-weight-bold"><Trans>Rarity</Trans></h4>
              <div className="divider" />
              {[
                rarities.map((e, i) => (
                  <p
                    key={i}
                    onClick={() => this.filterRarity(e)}
                    active={(this.state.filters.rarity === this._rarityAsInt(e)).toString()}
                    className="capitalism"
                  >
                    <span /> <Trans>{e}</Trans>
                  </p>
                ))
              ]}
            </div>
            </div>
          </div>

          <div id="cards" className="col-12 col-md-9">
            <div className="row">
              {this.state.cards.loaded == false ? <LoadingIndicator color="grey" /> : [cardsYay]}
            </div>
            <div className="row justify-content-center">
              {this.state.cards.list.length !== this.state.cards.matched &&
              this.state.options.autoload === false && this.loadingMoreCards === false ? (
                <button
                  onClick={() => this.loadMoreCards()}
                  className="mt-5 px-4 btn btn-sppd"
                >
                  <Trans>Load More...</Trans>
                </button>
              ) : this.state.loadingMoreCards === true ? <LoadingIndicator color="sppd" /> : (
                ""
              )}

              {this.state.cards.list.length !== this.state.cards.matched &&
              this.state.options.autoload === true ? (
                <div ref={this.scrollRef} />
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Search;
