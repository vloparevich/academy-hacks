import React from 'react';
import countries from '../../resources/countries.json';
import './CountryFlag.css';

const CountryFlag = (props) => {
  const getCountryFlag = () => {
    const incomingCountryValue = props.countryOfOrigin;
    const nationalFlag = countries.find(
      (country) => country.name.common === incomingCountryValue
    )?.flag;
    return nationalFlag;
  };
  return <span id='countryFlag'>{getCountryFlag()}</span>;
};

export default CountryFlag;
