import {createElement} from '../utils.js';

// контейнер для фильмов
const createFilmsListTemplate = () => (
  `<section class="films">
    <section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
      <div class="films-list__container">
      </div>
    </section>
    <section class="films-list--extra">
      <h2 class="films-list__title">Top rated</h2>
      <div id="top-rated" class="films-list__container">
      </div>
    </section>
    <section class="films-list--extra">
      <h2 class="films-list__title">Most commented</h2>
      <div id="most-commented" class="films-list__container" >
      </div>
    </section>
  </section>`
);


export default class FilmsList {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilmsListTemplate();
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
