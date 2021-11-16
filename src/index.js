'use strict';

import './sass/main.scss';
import fetchCountries from './partials/js/fetchCountries';
import dropdownTpl from './partials/templates/dropdown-tpl.hbs';
import countryTpl from './partials/templates/countries-tpl.hbs';

const debounce = require('lodash.debounce');
const refs = {
  inputSearchQuery: document.getElementById('search-input'),
  dropdown: document.querySelector('.dropdown'),
  countryContainer: document.querySelector('.country-container'),
};

refs.inputSearchQuery.addEventListener('input', debounce(handleInputSearchQuery, 500));

function handleInputSearchQuery() {
  const searchQuery = refs.inputSearchQuery.value;

  fetchCountries(searchQuery).then(resultByArrayLength);
}

function resultByArrayLength(array) {
  if (array.length <= 10 && array.length >= 2) {
    return renderDropdownMarkup(array);
  } else if (array.length === 1) {
    return renderCountryMarkup(array);
  }
  return console.log('(( ');
}

function renderDropdownMarkup(array) {
  return (refs.dropdown.innerHTML = dropdownTpl(array));
}

function renderCountryMarkup(array) {
  return (refs.countryContainer.innerHTML = countryTpl(array));
}
