import AbstractComponent from './abstract-component';


const createFilmsListTitleTemplate = (films) => {
  return `<h2 class="films-list__title ${films.length ? `visually-hidden` : ``}">
    ${films.length ? `All movies. Upcoming` : `Loading...`}
  </h2>`;
};


export default class FilmsListTitle extends AbstractComponent {
  constructor(films) {
    super();
    this._films = films;
  }

  getTemplate() {
    return createFilmsListTitleTemplate(this._films);
  }
}
