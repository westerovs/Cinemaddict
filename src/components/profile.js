// import {randomItem, randomNumber} from '../mock/task.js';
import {createElement} from '../utils.js';

// рейтинг в профиле
const RATINGNAMES = [
  `Movie Buff`,
  `King`,
  `Gury`,
  `Expert`,
  `Ninja`,
  `Master`,
  `Warrior`,
];

const FILMS_RANK_STEP = 10;

// ???
const getRank = (filmsCount) => {
  let index = Math.floor(filmsCount / FILMS_RANK_STEP);
  if (index >= RATINGNAMES.length) {
    index = RATINGNAMES.length - 1;
  }
  return RATINGNAMES[index];
};


const createProfileTemplate = () => {
  return (
    `<section class="header__profile profile">
      <p class="profile__rating"></p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

// класс который экспортируется из этого компонента по умолчанию
export default class Profile {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createProfileTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
