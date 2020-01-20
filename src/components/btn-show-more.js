import {createElement} from '../utils.js';

// кнопка show-more
const createBtnShowMoreTemplate = () => (
  `<button class="films-list__show-more">Show more</button>`
);


export default class BtnShowMore {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createBtnShowMoreTemplate();
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

