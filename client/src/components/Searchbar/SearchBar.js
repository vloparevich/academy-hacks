import React, { Component } from 'react';
import './Search.css';

export default class SearchBar extends Component {
  render() {
    return (
      <div className='searchContainer'>
        <input
          autoFocus
          autoComplete='off'
          name='searchInput'
          placeholder='Search for the language you are willing to learn'
          onChange={(event) =>
            this.props.onSearchQueryChange(event.target.value)
          }
        />
      </div>
    );
  }
}
