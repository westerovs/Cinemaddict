// рейтинг в профиле
const RATINGNAME = [`Movie Buff`,
  `King`,
  `Gury`,
  `Expert`,
  `Film ninja`,
  `Hard master`,
  `Warrior video`,
];


// имена фильмов
const filmNames = [`Вечное сияние чистого CSS`, `Властелин php`, `Король лев`, `Достучаться до JS`, `Другие`, `Harry Potter`, `Joker 2019`, `SpaceX`, `Спартак`, `Игра престолов`, `Ходячие мертвецы`, `Пила`, `Астрал`, `Бойцовский клуб`, `Большая рыба`, `Titanic`, `Terminator`];


const descriptionFilmName = [
  `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus reprehenderit ipsa minus itaque!`,
  `Eum non nulla quibusdam rem atque! Quasi quisquam accusantium quas, mollitia pariatur repudiandae in.`,
  `Enim, deleniti, nesciunt.`
];


const DescriptionSet = new Set([
  randomItem(descriptionFilmName),
  randomItem(descriptionFilmName),
  randomItem(descriptionFilmName)
]);


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


// жарны фильмов
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


// cтраны
const COUNTRYNAMES = [
  `USA`,
  `ALBANIA`,
  `TAJIKISTAN`,
  `FINLAND`,
  `USSR`,
];


// месяца
const MONTHNAMES = [
  `January`,
  `February`,
  `March`,
  `April`,
  `May`,
  `June`,
  `July`,
  `August`,
  `September`,
  `October`,
  `November`,
  `December`,
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
  RATINGNAME,
  filmNames,
  randomNumber,
  descriptionFilmName,
  DescriptionSet,
  posters,
  FILMGENRE,
  MONTHNAMES,
  COUNTRYNAMES
};
