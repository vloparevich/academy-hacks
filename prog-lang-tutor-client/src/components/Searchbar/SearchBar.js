import React, { Component } from "react";
import "./Search.css";

export default class SearchBar extends Component {
  render() {
    return (
      <div className="searchContainer">
        {/* <p>Search</p> */}
        <fieldset>
          <input
            name="searchInput"
            placeholder="Search"
            onChange={(event) =>
              this.props.onSearchQueryChange(event.target.value)
            }
          />

          <legend>SEARCH</legend>
        </fieldset>
      </div>
    );
  }
}
