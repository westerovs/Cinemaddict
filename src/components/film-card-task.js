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
const FILMGENRE = [
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

// просмотрен - нет
function randomWatched() {
  let random = Boolean(Math.random() >= 0.5);
  if (random >= 0.5) {
    return `film-card__controls-item--active`;
  } else {
    return ``;
  }
}

// фаворит - нет
function randomFavorite() {
  let random = Boolean(Math.random() >= 0.5);
  if (random >= 0.5) {
    return `film-card__controls-item--active`;
  } else {
    return ``;
  }
}

// список просмотров - нет
function randomWatchlist() {
  let random = Boolean(Math.random() >= 0.5);
  if (random >= 0.5) {
    return `film-card__controls-item--active`;
  } else {
    return ``;
  }
}

// собирает все задачи из массивов в одном объекте
export const createRandomFilm = () => {
  return {
    poster: randomItem(posters),
    name: randomItem(filmNames),
    rating: `${randomNumber(1, 10)} ${randomNumber(1, 10)}`,
    year: randomNumber(1920, 2077),
    time: `${randomNumber(1, 5)}h ${randomNumber(1, 60)}m`,
    genre: randomItem(FILMGENRE),
    description: randomItem([...descriptionFilmSet]),
    comments: randomNumber(),
    watched: randomWatched(),
    favorite: randomFavorite(),
    watchlist: randomWatchlist(),
  };
};


// ********************************************************
// ********************************************************
// ******************** шаблон фильма *********************
export const createFilmCardkTemplate = function () {
  // filmRandom - вызывает объект задач из createRandomFilm
  const filmRandom = createRandomFilm();

  return (
    `<article class="film-card">
    <h3 class="film-card__title">${filmRandom.name}</h3>
    <p class="film-card__rating">${filmRandom.rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${filmRandom.year}</span>
      <span class="film-card__duration">${filmRandom.time}</span>
      <span class="film-card__genre">${filmRandom.genre}</span>
    </p>
    <img src="./images/posters/${filmRandom.poster}" alt="" class="film-card__poster">
    <p class="film-card__description">
      ${filmRandom.description}
    </p>
    <a class="film-card__comments">${filmRandom.comments} comments</a>
    <form class="film-card__controls">
      <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${filmRandom.watchlist}">Add to watchlist</button>
      <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${filmRandom.watched}">Mark as watched</button>
      <button class="film-card__controls-item button film-card__controls-item--favorite ${filmRandom.favorite}">Mark as favorite</button>
    </form>
    </article>`
  );
};


/*
абстрактно фильм для тебя - это объект с полями, которые я перечислил.
Вот у тебя функция должна возвращать объект с такими полями. И каждое поле заполняется случайно, с помощью функции getRandom и массива

что у меня сейчас и происходит
массив попадает в генератор и фильм принимает данные из генератора... так ?

- Не совсем. Ты возвращаешь массив. А надо один фильм Объектом

- Вот и напиши функцию, которая возвращает такой объект. Только назови нормально. Название функции это глагол.

- Как generateTask, также ты должен написать generateFilm

она в себя около 5 функций принимает каждая функция в себя по массиву принимает
так ?

Не принимает, а внутри себя вызывает Генерируя случайно каждое поле

Вот, ты вызываешь функцию, и зачем то передаешь параметр year, хотя она не принимает параметры
К тому же переменной year нет в коде, поэтому ошибка
const film = createRandomFilm ();
console.log(film.year);
*/
