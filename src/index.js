import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const URL = 'https://restcountries.com/v3.1/name/';

const refs = {
    form: document.querySelector('.news-form'),
    list: document.querySelector('.news-list'),
    submitButton: document.querySelector('.news-submit'),
    loader: document.querySelector('.news-loader'),
}

const inputText = document.querySelector('input#search-box');

inputText.addEventListener('input', debounce(handleSubmit2, DEBOUNCE_DELAY));
function handleSubmit2(params) {
    params.preventDefault;
    console.log(params.target.value); 
}

let items = [];

const getItemtemplateMin = ({name, flags }) => {
    let result = `<li class="news-list-li"> 
    <img width = 30px src=${flags.svg}>
    <span class="name-country"> ${name.official}</span>
    </li>`;
    return result;
}

const getItemtemplateMax = ({name, capital, population, flags, languages}) => {
    let lang = Object.values(languages).join(", ");
    // console.log(lang);
    let result = `<li class="news-item">
       <img width = 30px src=${flags.svg} alt=${name}> 
    <span class="name-country-big"> ${name.official}</span>
      <p><b>Capital:</b> ${capital}</p>
      <p><b>Population:</b> ${population}</p>
      <p><b>Languages:</b> ${lang}</p>
        </li>
    `;
    return result;
    };

const render = () => {

    // console.log(items.length);
    if (items.length > 10) {
        Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
    } else if (items.length <= 10 && items.length >= 2) { 
        const list = items.map(getItemtemplateMin);
        refs.list.innerHTML = "";
        refs.list.insertAdjacentHTML('beforeend', list.join(''));
    } else if (items.length == 1 ){
        const list = items.map(getItemtemplateMax);
        refs.list.innerHTML = "";
        refs.list.insertAdjacentHTML('beforeend', list.join(''));
    }
    
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
    
    const { value } = e.target.elements.query;
    e.preventDefault();
    // const { value } = e.target.value;

    const valueTrim = value.trim();
    console.log(valueTrim);
    if (valueTrim) {

    
    refs.list.innerHTML = "";
    showLoader();
    lockForm();
    fetch(`${URL}${valueTrim}`)
        
        .then(resp => {
           return resp.json();
        })

        .then(data => {
            items = data;
            render();
        })
        .catch(error => {
            console.log(error);
        })
        .finally(() => {
            hideLoader();
            unlockForm();
        });
    }
 
};

// refs.form.addEventListener('submit', handleSubmit);


// const inputText = document.querySelector('input#search-box');

// inputText.addEventListener('input', onInput)

// function onInput(event) {
//     console.log(event.target.value);
//     Notiflix.Notify.success(event.target.value);
// }

