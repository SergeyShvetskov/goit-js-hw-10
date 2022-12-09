export function fetchCountries(name) {
    fetch(`${URL}${name}`)
        .then(resp => {
            console.log(resp.status);
            if (!resp.ok) {
                console.log(resp.status);
      throw Error(`is not ok: ` + resp.status);
            } 
           return resp.json();
        })
        .then(data => {
            items = data;
            console.log(items);
            render();
        })
        .catch(error => {
            Notiflix.Notify.failure("Oops, there is no country with that name");
            console.warn(error);
        })
        .finally(() => {
            hideLoader();
        });
}

const hideLoader = () => {
    refs.loader.classList.remove('show');
};