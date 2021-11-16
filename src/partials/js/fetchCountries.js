export default function fetchCountries(searchQuery) {
  const BASE_URL = 'https://restcountries.com/v2';

  return fetch(`${BASE_URL}/name/${searchQuery}`).then(response => response.json());
}
