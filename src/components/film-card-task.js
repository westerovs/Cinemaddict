// ********************************************************
// ********************************************************
// *************** Моки фильмов ***************************

// постеры
const posters = [
  `made-for-each-other.png`,
  `popeye-meets-sinbad.png`,
  `sagebrush-trail.jpg`,
  `santa-claus-conquers-the-martians.jpg`,
  `the-dance-of-life.jpg`,
  `the-great-flamarion.jpg`,
  `the-man-with-the-golden-arm.jpg`,
];

// имена
const filmNames = [`Вечное сияние чистого CSS`, `Властелин php`, `Король лвёрстки`, `Достучаться до JS`, `Другие`, `Harry Puthon`, `Joker 2019`, `Спартак`, `Игра престолов`, `Ходячие мертвецы`, `Пила`, `Астрал`, `Бойцовский клуб`, `Большая рыба`, `Titanic`, `Terminator`];

// жарны
const FILM_GENRES = [
  `Musical`,
  `Triller`,
  `for adults`,
  `comedy`,
  `home video`,
  `documental`,
  `drama`,
  `horror`,
];

// описание
const descriptionFilm = [
  `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus reprehenderit ipsa minus itaque!`,
  `Eum non nulla quibusdam rem atque! Quasi quisquam accusantium quas, mollitia pariatur repudiandae in.`,
  `Enim, deleniti, nesciunt.`
];

const descriptionFilmSet = new Set([
  randomItem(descriptionFilm),
  randomItem(descriptionFilm),
  randomItem(descriptionFilm)
]);


// рендер текст
function randomItem(items) {
  let random = Math.floor(Math.random() * items.length);
  return items[random];
}

// рендер случайных чисел
function randomNumber(min = 1, max = 999) {
  return Math.floor(Math.random() * (max - min) + min);
}


// собирает все задачи из массивов в одном объекте
export const createRandomFilm = () => {
  return {
    poster: randomItem(posters),
    name: randomItem(filmNames),
    rating: `${randomNumber(1, 10)} ${randomNumber(1, 10)}`,
    year: randomNumber(1920, 2077),
    time: `${randomNumber(1, 5)}h ${randomNumber(1, 60)}m`,
    genre: randomItem(FILM_GENRES),
    description: randomItem([...descriptionFilmSet]),
    comments: randomNumber(),
    watched: Math.random() > 0.5,
    favorite: Math.random() > 0.5,
    watchlist: Math.random() > 0.5,
  };
};

// ******************** шаблон фильма *********************
export const createFilmCardTemplate = function (film) {
  // createRandomFilmMarkup - вызывает объект задач из createRandomFilm
  const {poster, name, rating, year, time, genre, description, comments, watched, favorite, watchlist} = film;

  return (
    `<article class="film-card">
    <h3 class="film-card__title">${name}</h3>
       <p class="film-card__rating">${rating}</p>
       <p class="film-card__info">
         <span class="film-card__year">${year}</span>
         <span class="film-card__duration">${time}</span>
         <span class="film-card__genre">${genre}</span>
       </p>
       <img src="./images/posters/${poster}" alt="" class="film-card__poster">
       <p class="film-card__description">
        ${description}
       </p>
       <a class="film-card__comments">${comments} comments</a>
       <form class="film-card__controls">
         <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist${watchlist}">Add to watchlist</button>
         <button class="film-card__controls-item button film-card__controls-item--mark-as-watched${watched}">Mark as watched</button>
         <button class="film-card__controls-item button film-card__controls-item--favorite${favorite}">Mark as favorite</button>
       </form>
    </article>`
  );
};

