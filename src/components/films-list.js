import AbstractComponent from './abstract-component';


const createFilmsListTemplate = () => `<section class="films-list"></section>`;


export default class FilmsList extends AbstractComponent {
  getTemplate() {
    return createFilmsListTemplate();
  }
}
