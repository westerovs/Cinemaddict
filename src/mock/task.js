// рейтинг в профиле
const RatingName = [`Movie Buff`,
  `King`,
  `Gury`,
  `Expert`,
  `Film ninja`,
  `Hard master`,
  `Warrior video`,
];

// имена фильмов
const FilmName = [`Вечное сияние чистого разума`, ` Властелин колец`, `Король лев`, `Достучаться до небес`, `Другие`, `Harry Potter`, `Joker 2019`, `Space`, `Спартак`, `Игра престолов`, `Ходячие мертвецы`, `Пила`, `Астрал`, `Бойцовский клуб`, `Большая рыба`, `Titanic`, `Terminator`];

// описание фильмов
const DescriptionFilmName = [
  `Lorem`,
  `красивая история любви`,
  `Ipsum`
];
const DescriptionSet = new Set([
  randomItem(DescriptionFilmName),
  randomItem(DescriptionFilmName),
  randomItem(DescriptionFilmName)
]);

// постеры
const Posters = [
  `made-for-each-other.png`,
  `popeye-meets-sinbad.png`,
  `sagebrush-trail.jpg`,
  `santa-claus-conquers-the-martians.jpg`,
  `the-dance-of-life.jpg`,
  `the-great-flamarion.jpg`,
  `the-man-with-the-golden-arm.jpg`,
];

// жарны фильмов
const filmGenre = [
  `Musical`,
  `Triller`,
  `for adults`,
  `comedy`,
  `home video`,
  `documental`,
  `drama`,
  `horror`,
];

// рендер текст
function randomItem(item) {
  let random = Math.floor(Math.random() * item.length);
  return item[random];
}

// рендер случайных чисел
function randomNumber(min = 1, max = 60) {
  return Math.floor(Math.random() * (max - min) + min);
}


export {
  randomItem,
  RatingName,
  FilmName,
  DescriptionFilmName,
  DescriptionSet,
  randomNumber,
  Posters,
  filmGenre
};
