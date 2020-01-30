import {formatDuration, formatDate} from '../utils/moment.js';

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
const filmNames = [
  `Вечное сияние чистого JS`,
  `Властелин php`,
  `Король less`,
  `Достучаться до JS`,
  `Другие`,
  `Harry Potter`,
  `Joker 2019`,
  `Спартак`,
  `Игра престолов`,
  `Ходячие мертвецы`,
  `Пила`,
  `Астрал`,
  `Бойцовский клуб`,
  `Большая рыба`,
  `Titanicss`,
  `Terminator`,
  `Tom and Jerry`,
];

// жарны
const FILM_GENRES = [
  `Мюзикл`,
  `Триллер`,
  `Комедия`,
  `Home-video`,
  `Фантастика`,
  `Мелодрама`,
  `Документальный`,
  `Исторический`,
  `Драма`,
  `Ужасы`,
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


// ****************** ↓ для поп-апа ↓ ******************

// жарны pop
const GenresSet = new Set([
  randomItem(FILM_GENRES),
  randomItem(FILM_GENRES),
  randomItem(FILM_GENRES),
]);

// оригинальное название
const original = [
  `The Great Flamarion`,
  `Dragon Age`,
  `Final fantasy`,
  `Grand mother JS`,
];

// режисёр
const director = [
  `James Cameron`,
  `Michael Bay`,
  `Tim Burton`,
];

// сценаристы
const writers = [
  `Anthony Mann`,
  `Jack London`,
  `John Tolkien`,
  `Alexander Rodionovich`,
  `Eduard severe`,
  `Yolter Smitt`,
];

const writersSet = new Set([
  randomItem(writers),
  randomItem(writers),
  randomItem(writers),
]);

// актёры
const actors = [
  `Erich von Stroheim`,
  `Mary Beth Hughes`,
  `Dan Duryea`,
  `Thiel Schweiger`,
  `Sasha grey`,
  `Nicolas cage`,
];

const actorsSet = new Set([
  randomItem(actors),
  randomItem(actors),
  randomItem(actors),
]);


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

// полное описание
const fullDescription = [
  `Драма «Крупная рыба» хоть и «прикидывается» фэнтезийным фильмом, все же является довольно нехарактерной картиной для Тима Бертона. Прославленный сказочник исследует тему взаимоотношений отцов и детей в близкой ему манере, однако оставляет принятие окончательного решения за зрителем. Фильм начинается с того, как в родительский дом приезжает обычный офисный служащий по имени Уилл. Причиной приезда послужила тяжелая болезнь отца Эдварда Блума, с которым у сына всю жизнь были натянутые отношения. В отличие от папы, Уилл всегда был очень практичен и не оставлял в своей жизни места для пустых фантазий. Эдвард же, наоборот, любил травить байки о его прошлой жизни, уверяя, что все это было на самом деле. Даже находясь одной ногой в могиле, он не перестает рассказывать удивительные истории о великанах, оборотнях, ведьмах и магических городах, с которыми ему довелось столкнуться во время путешествий в молодости. `,
  `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet dolorum delectus debitis molestiae consequuntur, non harum libero minima animi rerum eaque voluptas, voluptatibus, ducimus earum adipisci blanditiis. Itaque, pariatur excepturi.`,
  `Далеко-далеко за словесными горами в стране, гласных и согласных живут рыбные тексты. Раз подзаголовок вскоре всеми использовало ее напоивший залетают ты, текста! Его приставка ее океана своего вершину, сих букв однажды над.`,
];

// рендер текст
function randomItem(items) {
  let random = Math.floor(Math.random() * items.length);
  return items[random];
}

// рендер случайных чисел
function randomNumber(min = 1, max = 999) {
  return Math.floor(Math.random() * (max - min) + min);
}


// -------------------------------------------------------------
// функция по созданию шаблона карточки фильма, чтобы она на вход принимала данные — объект из предыдущего шага.
const randomParameters = () => {
  return {
    poster: randomItem(posters),
    name: randomItem(filmNames),
    comments: randomNumber(),

    rating: `${randomNumber(1, 10)}.${randomNumber(1, 10)}`,
    year: randomNumber(1920, 2019),
    time: `${randomNumber(1, 5)}h ${randomNumber(1, 60)}m`,
    genre: randomItem(FILM_GENRES),
    description: randomItem([...descriptionFilmSet]),

    watched: Math.random() > 0.5,
    favorite: Math.random() > 0.5,
    watchlist: Math.random() > 0.5,

    // доп. для поп-апа
    original: randomItem(original),
    director: randomItem(director),
    writers: [...writersSet].join(`, `),
    actors: [...actorsSet].join(`, `),
    age: randomNumber(3, 18),
    release: `${randomNumber(1, 31)} ${randomItem(MONTHNAMES)} ${randomNumber(1920, 2019)}`,
    countrynames: randomItem(COUNTRYNAMES),
    monthnames: randomItem(MONTHNAMES),
    ganrePop: [...GenresSet].join(` `),
    fullDescription: randomItem(fullDescription),
  };
};


// -------------------------------------------------------------
// создание карточек фильма
const createRandomFilms = (count) => {
  const result = new Array(count).fill(``);
  return result.map(() => {
    return randomParameters();
  });
};


export {
  randomNumber,
  createRandomFilms,
};
