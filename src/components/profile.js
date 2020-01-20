// import {randomItem, randomNumber} from '../mock/task.js';
import {createElement} from '../utils.js';

// рейтинг в профиле
// const RATINGNAME = [
//   `Movie Buff`,
//   `King`,
//   `Gury`,
//   `Expert`,
//   `Ninja`,
//   `Master`,
//   `Warrior`,
// ];


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
