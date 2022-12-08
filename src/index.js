import './css/styles.css';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const getItemtemplate = ({name, capital, population, flags, languages}) =>
    `<li class="news-item">
        <p> name: ${name.official}</p>
      <p>capital: ${capital}</p>
      <p>population: ${population}</p>
      <p>flags: ${flags.svg}</p>
      <p>languages: ${languages}</p>
        </li>
    `;

    const URL = 'https://restcountries.com/v3.1/name/';
// const URL = 'https://hn.algolia.com/api/v1/search';
const refs = {
    form: document.querySelector('.news-form'),
    list: document.querySelector('.news-list'),
    submitButton: document.querySelector('.news-submit'),
    loader: document.querySelector('.news-loader'),
    
}

let items = [];

const render = () => {
    // console.log(items);
    const list = items.map(getItemtemplate);
    refs.list.innerHTML = "";
    refs.list.insertAdjacentHTML('beforeend', list.join(''));
};

const showLoader = () => {
    refs.loader.classList.add('show');
};

const hideLoader = () => {
    refs.loader.classList.remove('show');
};

const lockForm = () => {
    refs.submitButton.setAttribute('disabled', true);
};
const unlockForm = () => {
    refs.submitButton.removeAttribute('disabled');
};

const handleSubmit = e => {
    const {value} = e.target.elements.query;
    
    e.preventDefault();
    showLoader();
    lockForm();
    // fetch('https://restcountries.com/v3.1/name/{name}');
    // fetch(`${URL}?query=${value}`)
    fetch(`${URL}${value}`)
        
        // .then(resp => resp.json())
        .then(resp => {
            // console.log(resp);
            // console.log(resp.json());
           return resp.json();
        })

        .then(data => {
            items = data;
            console.log(items);

//    for (const product of data.products) {
//        console.log(product);
//     }

            render();
        })
        .catch(error => {
            console.log(error);
        })
        .finally(() => {
            hideLoader();
            unlockForm();
        });
};

refs.form.addEventListener('submit', handleSubmit);


// const inputText = document.querySelector('input#search-box');

// inputText.addEventListener('input', onInput)

// function onInput(event) {
//     console.log(event.target.value);
//     Notiflix.Notify.success(event.target.value);
// }

