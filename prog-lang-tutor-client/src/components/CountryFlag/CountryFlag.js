import React, { Component } from 'react';
import countries from '../../resources/countries.json';

export default class CountryFlag extends Component {
  getCountryFlag = () => {
    const incomingCountryValue = this.props.countryOfOrigin;
    const nationalFlag = countries.find(
      (country) => country.name.common === incomingCountryValue
    )?.flag;
    return nationalFlag;
  };

  render() {
    return <span>{this.getCountryFlag()}</span>;
  }
}
