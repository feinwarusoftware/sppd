import React, { Component } from "react";
import { CardGrid, CardList } from "./index";

const themes = ["adventure", "fantasy", "general", "mystical", "sci-fi"];
const rarities = ["common", "rare", "epic", "legendary"];

class Search extends Component {

  constructor(props) {
    super(props);

    this.state = {
      view: "grid",
      error: null,
      isLoaded: false,

      // filters
      filter: {
        sort: null,
        theme: null,
        rarity: null
      }
    };

  }

  componentDidMount() {
    let request = "http://localhost/api/v1/cards";

    fetch(request)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            cards: result.data.cards
          });
        },
        // warning (nsfw): we don't swallow
        // Salies note: in fact, I do.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  changeView = view => {
    this.setState({ view });
  }

  // Adolf Fitler
  filterTheme = theme => {
    if (theme === this.state.filter.theme) {
      theme = null;
    }

    let request = "http://localhost/api/v1/cards";

    let first = true;

    if (theme != null) {
      if (first === true) {
        request += "?";
        first = false;
      } else {
        request += "&";
      }
      request += `theme=${theme}`;
    }

    if (this.state.filter.rarity != null) {
      if (first === true) {
        request += "?";
        first = false;
      } else {
        request += "&";
      }
      request += `rarity=${this.state.filter.rarity}`;
    }

    fetch(request)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            cards: result.data.cards,
            filter: {
              theme,
              rarity: this.state.filter.rarity
            }
          });
        },
        // warning (nsfw): we don't swallow
        // Salies note: in fact, I do.
        (error) => {
          this.setState({
            isLoaded: true,
            error,
            filter: {
              theme,
              rarity: this.state.filter.rarity
            }
          });
        }
      );
  }

  filterRarity = rarity => {
    if (rarity === this.state.filter.rarity) {
      rarity = null;
    }

    let request = "http://localhost/api/v1/cards";

    let first = true;

    if (this.state.filter.theme != null) {
      if (first === true) {
        request += "?";
        first = false;
      } else {
        request += "&";
      }
      request += `theme=${this.state.filter.theme}`;
    }

    if (rarity != null) {
      if (first === true) {
        request += "?";
        first = false;
      } else {
        request += "&";
      }
      request += `rarity=${rarity}`;
    }

    fetch(request)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            cards: result.data.cards,
            filter: {
              rarity,
              theme: this.state.filter.theme
            }
          });
        },
        // warning (nsfw): we don't swallow
        // Salies note: in fact, I do.
        (error) => {
          this.setState({
            isLoaded: true,
            error,
            filter: {
              rarity,
              theme: this.state.filter.theme
            }
          });
        }
      );
  }

  render() {
    let cardsYay = [];

    if (this.state.isLoaded && this.state.error == null){
      
        cardsYay = this.state.cards.map((e, i) => {
          if (this.state.view === "grid") {
            return <CardGrid key={i} name={e.name} image={e.image} rarity={e.rarity} theme={e.theme} health={e.health} energy={e.mana_cost} damage={e.damage} characterType={e.character_type} />
          } else if (this.state.view === "list"){
            return <CardList key={i} name={e.name} description={e.description} image={e.image} rarity={e.rarity} theme={e.theme} health={e.health} energy={e.mana_cost} damage={e.damage} characterType={e.character_type} />
          }
        }
        );
    }

    return (
      <React.Fragment>
        <div className="row">
          <div id="search" className="col-12">
            <input
              className="form-control form-control-lg"
              type="text"
              placeholder="Search 102 cards for..."
            />
            <i className="fas fa-search fa-lg" />
          </div>
        </div>
        <div id="result-bar" className="row my-5">
          <div id="results" className="col-10">
            <h2 className="font-weight-bold mb-0">{cardsYay.length} Matching Results</h2>
          </div>
          <div id="views" className="col-2 text-right">
            <i onClick={() => this.changeView("grid")} active={(this.state.view === "grid").toString()} className="fas fa-th" />
            <i onClick={() => this.changeView("list")} active={(this.state.view === "list").toString()} className="fas fa-th-list" />
            <i className="fas fa-spinner" />
          </div>
        </div>
        <div className="row mt-5">
          <div id="filters" className="col-3">
            <div id="order" className="mb-4">
              <h4 className="font-weight-bold">Order By</h4>
              <div className="divider" />
              <p active="true">
                <i className="fa fa-sort-amount-down" /> Name
              </p>
              <p>Energy</p>
              <p>Rarity</p>
              <p>Theme</p>
              <p>Damage</p>
              <p>Health</p>
            </div>
            <div className="mb-4">
              <h4 className="font-weight-bold">Theme</h4>
              <div className="divider" />
              {
                [themes.map((e, i) => 
                  <p key={i} onClick={() => this.filterTheme(e)} active={(this.state.filter.theme === e).toString()} className="capitalism">
                    <span /> {e}
                  </p>
                )]
              }
            </div>
            <div>
              <h4 className="font-weight-bold">Rarity</h4>
              <div className="divider" />
              {
                [rarities.map((e, i) => 
                  <p key={i} onClick={() => this.filterRarity(e)} active={(this.state.filter.rarity === e).toString()} className="capitalism">
                    <span /> {e}
                  </p>
                )]
              }
            </div>
          </div>

          <div id="cards" className="col-9">
            <div className="row">
              {[cardsYay]}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Search;
