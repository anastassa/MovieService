//  фильтрация

class Filter {
    filterRender() {
        let countryHtml = '';
        countries.forEach(({id, country}) => {
            countryHtml += `<option value="${id}">${country}</option>`;
        });
        document.getElementById('country-filter').innerHTML = countryHtml;
        let genresHtml = '';
        genres.forEach(({id, genre}) => {
            genresHtml += `<option value="${id}">${genre}</option>`;
        });
        document.getElementById('genre-filter').innerHTML = genresHtml;
    }
}

const filter = new Filter();

let genres = [{
    "id": 0, "genre": ""
}, {
    "id": 1, "genre": "триллер"
}, {
    "id": 2, "genre": "драма"
}, {
    "id": 3, "genre": "боевик"
}, {
    "id": 4, "genre": "комедия"
}, {
    "id": 5, "genre": "детектив"
}, {
    "id": 6, "genre": "фантастика"
}, {
    "id": 7, "genre": "приключения"
}, {
    "id": 8, "genre": "биография"
}, {
    "id": 9, "genre": "аниме"
}, {
    "id": 10, "genre": "вестерн"
}, {
    "id": 11, "genre": "ужасы"
}, {
    "id": 12, "genre": "фэнтези"
}, {
    "id": 13, "genre": "военный"
}];

let countries = [{
    "id": 0, "country": ""
}, {
    "id": 1, "country": "США"
}, {
    "id": 2, "country": "Россия"
}, {
    "id": 3, "country": "Франция"
}, {
    "id": 4, "country": "Польша"
}, {
    "id": 5, "country": "Великобритания"
}, {
    "id": 6, "country": "Швеция"
}, {
    "id": 7, "country": "Украина"
}, {
    "id": 8, "country": "Испания"
}, {
    "id": 9, "country": "Германия"
}, {
    "id": 10, "country": "Италия"
}, {
    "id": 11, "country": "Гонконг"
}, {
    "id": 12, "country": "Германия"
}, {
    "id": 13, "country": "Швейцария"
}, {
    "id": 14, "country": "Канада"
}, {
    "id": 15, "country": "Мексика"
}, {
    "id": 16, "country": "Япония"
}, {
    "id": 17, "country": "Дания"
}, {
    "id": 18, "country": "Чехия"
}, {
    "id": 19, "country": "Ирландия"
}, {
    "id": 20, "country": "Австрия"
}, {
    "id": 21, "country": "Китай"
},  {
    "id": 22, "country": "Норвегия"
}]