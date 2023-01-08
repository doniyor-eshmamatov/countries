/* ========= change mode codes ====*/

var elBody = document.querySelector('body');
var modeBtn = document.querySelector('.dark-mode');

modeBtn.addEventListener('click', function () {
    elBody.classList.toggle('dark');
});


/*-----------------*/



let elRow = document.querySelector('.list')
let searchInput = document.querySelector('.search-input');

function render(array, node) {
    node.innerHTML = '';
    for (i = 0; i < array.length; i++) {
        let elCard = document.createElement('div');
        elCard.setAttribute('class', 'p-0 col-12 col-lg-4 col-md-6 col-sm-6 col-xl-3');
        elRow.appendChild(elCard);

        let elDiv = document.createElement('div');
        elCard.appendChild(elDiv)

        let elCardLink = document.createElement('a');
        elCardLink.setAttribute('href', './about.html');
        elCardLink.setAttribute('class', 'card p-0')
        elCardLink.style.width = '16rem';
        elDiv.appendChild(elCardLink);

        let elCardImg = document.createElement('img');
        elCardImg.src = array[i].flags.png;
        elCardImg.style.width = '16rem';
        elCardImg.style.height = '10rem';
        elCardImg.style.overflow = 'hidden'
        elCardLink.appendChild(elCardImg);

        let elCardBody = document.createElement('div');
        elCardBody.setAttribute('class', 'card-body p-2');
        elCardBody.style.width = '16rem'
        elCardLink.appendChild(elCardBody);

        let elCardTitle = document.createElement('h5');
        elCardTitle.setAttribute('class', 'card-body d-flex');
        elCardTitle.innerHTML = '<strong>Name: </strong>' + array[i].name.common;
        elCardBody.appendChild(elCardTitle)

        let elCardRegion = document.createElement('p');
        elCardRegion.setAttribute('class', 'card-text d-flex');
        elCardRegion.innerHTML = '<strong>Region: </strong>' + array[i].region;
        elCardBody.appendChild(elCardRegion)

        let elCardCapital = document.createElement('p');
        elCardCapital.setAttribute('class', 'card-text d-flex');
        elCardCapital.innerHTML = '<strong>Capital: </strong>' + array[i].capital;
        elCardBody.appendChild(elCardCapital)
    }
}

fetch('https://restcountries.com/v3.1/all').then(response => response.json())
    .then(data => render(data, elRow));



let sortRegion = document.querySelector('.form-select');
sortRegion.addEventListener('change', () => {
    if (sortRegion.value !== '0') {
        fetch('https://restcountries.com/v3.1/region/' + sortRegion.value).then(response => response.json())
            .then(data => render(data, elRow))
    }
    else {
        fetch('https://restcountries.com/v3.1/all').then(response => response.json())
            .then(data => render(data, elRow));
    }
})

searchInput.addEventListener('input', () => {
    let searchArr = [];

    if (searchInput.value == '') {
        fetch('https://restcountries.com/v3.1/all').then( response => response.json())
        .then(data => render(data, elRow))
    }
    else {
        fetch('https://restcountries.com/v3.1/name/' + searchInput.value).then( response => response.json())
        .then(data => render(data, elRow))
    }
})