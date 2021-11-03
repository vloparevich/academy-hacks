import React, { Component } from 'react';
import './Search.css';

export default class SearchBar extends Component {
  render() {
    return (
      <div>
        {/* <p>Search</p> */}
        <fieldset>
          <input
            name='searchInput'
            onChange={(event) =>
              this.props.onSearchQueryChange(event.target.value)
            }
          />

          <legend>SEARCH</legend>
        </fieldset>
        {/* <div id="checkbox">
          <input
            id="checkbox-instock"
            type="checkbox"
            onChange={(event) => {
              this.props.onCheckboxInStockChange(event.target.checked);
            }}
          />
          <p id="checkboxlabel">Only show products on stock</p>
        </div> */}
      </div>
    );
  }
}
