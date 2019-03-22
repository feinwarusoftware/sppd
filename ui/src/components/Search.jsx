import React, { Component } from "react";
import { CardGrid } from "./index";

class Search extends Component {
  render() {
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
            <h2 className="font-weight-bold mb-0">102 Matching Results</h2>
          </div>
          <div id="views" className="col-2 text-right">
            <i active="true" className="fas fa-th" />
            <i className="fas fa-th-list" />
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
              <p>Theme</p>
            </div>
            <div className="mb-4">
              <h4 className="font-weight-bold">Theme</h4>
              <div className="divider" />
              <p active="true">
                <span /> Adventure
              </p>
              <p>
                <span /> Fantasy
              </p>
              <p>
                <span /> General
              </p>
              <p>
                <span /> Mystical
              </p>
              <p>
                <span /> Sci-Fi
              </p>
            </div>
            <div>
              <h4 className="font-weight-bold">Rarity</h4>
              <div className="divider" />
              <p active="true">
                <span /> Common
              </p>
              <p>
                <span /> Rare
              </p>
              <p>
                <span /> Epic
              </p>
              <p>
                <span /> Legendary
              </p>
            </div>
          </div>

          <div id="cards" className="col-9">
            <div className="row">
              <CardGrid />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Search;
