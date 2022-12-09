export default function fetchCountries(name) {
  const URL = 'https://restcountries.com/v3.1/name/';

  return fetch(`${URL}${name}?fields=name,capital,population,flags,languages`);
}
