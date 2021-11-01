import React, { Component } from 'react';
import './Search.css';

export default class SearchBar extends Component {
  render() {
    return (
      <div>
        <p>Search</p>
        <input
          name='searchInput'
          onChange={(event) =>
            this.props.onSearchQueryChange(event.target.value)
          }
        />
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
