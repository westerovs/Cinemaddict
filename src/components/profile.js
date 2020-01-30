import {randomNumber} from '../mock/generate-film.js';
import AbstractComponent from './abstract-component.js';


// рейтинг в профиле
const RATINGNAMES = [
  `Movie Buff`,
  `King`,
  `Gury`,
  `Expert`,
  `Honorary man`,
  `Ninja`,
  `Master`,
  `Warrior`,
  `President`,
];

// шаг
const FILMS_RANK_STEP = 10;

// ф-ция присваивает рейтинг от 0 до длинны массива RATINGNAMES
const getRank = (filmsCount = randomNumber(0, 10)) => {
  let index = Math.floor(filmsCount / FILMS_RANK_STEP);
  if (index >= RATINGNAMES.length) {
    index = RATINGNAMES.length - 1;
  }
  return RATINGNAMES[index];
};


const createProfileTemplate = () => {
  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${getRank()}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

export default class Profile extends AbstractComponent {
  getTemplate() {
    return createProfileTemplate();
  }
}
