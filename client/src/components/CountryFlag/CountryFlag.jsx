import React from 'react';
import countries from '../../resources/countries.json';
import './CountryFlag.css';

const CountryFlag = (props) => {
  const getCountryFlag = () =>
    countries.find((country) => country.name.common === props.countryOfOrigin)
      ?.flag;
  return <span id='countryFlag'>{getCountryFlag()}</span>;
};

export default CountryFlag;
