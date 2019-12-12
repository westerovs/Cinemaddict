// рейтинг в профиле
const RATINGNAME = [
  `Movie Buff`,
  `King`,
  `Gury`,
  `Expert`,
  `Film ninja`,
  `Hard master`,
  `Warrior video`,
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
function randomItem(items) {
  let random = Math.floor(Math.random() * items.length);
  return items[random];
}
// рендер случайных чисел
function randomNumber(min = 1, max = 60) {
  return Math.floor(Math.random() * (max - min) + min);
}


export {
  RATINGNAME,
  MONTHNAMES,
  COUNTRYNAMES,
  randomItem,
  randomNumber,
};
