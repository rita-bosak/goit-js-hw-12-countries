'use strict';

import './sass/main.scss';
import fetchCountries from './partials/js/fetchCountries';
import dropdownTpl from './partials/templates/dropdown-tpl.hbs';
import countryTpl from './partials/templates/countries-tpl.hbs';
import '@pnotify/core/dist/BrightTheme.css';
const debounce = require('lodash.debounce');
const { error } = require('@pnotify/core');

const refs = {
  inputSearchQuery: document.getElementById('search-input'),
  dropdown: document.querySelector('.dropdown'),
  countryContainer: document.querySelector('.country-container'),
  resultContainer: document.querySelector('.result-container'),
};

refs.inputSearchQuery.addEventListener('input', debounce(handleInputSearchQuery, 500));

function handleInputSearchQuery() {
  const searchQuery = refs.inputSearchQuery.value;

  fetchCountries(searchQuery).then(resultByArrayLength);
}

function resultByArrayLength(array) {
  if (array.length > 10) {
    refs.dropdown.innerHTML = '';
    refs.countryContainer.innerHTML = '';

    return error({
      title: false,
      text: 'Too many matches found. Please enter a more spesific query!',
      closer: false,
      sticker: false,
      hide: true,
      delay: 500,
      remove: true,
    });
  } else if (array.length <= 10 && array.length >= 2) {
    refs.countryContainer.innerHTML = '';
    return renderDropdownMarkup(array);
  } else if (array.length === 1) {
    refs.dropdown.innerHTML = '';
    return renderCountryMarkup(array);
  }
}

function renderDropdownMarkup(array) {
  return (refs.dropdown.innerHTML = dropdownTpl(array));
}

function renderCountryMarkup(array) {
  return (refs.countryContainer.innerHTML = countryTpl(array));
}
