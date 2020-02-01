import AbstractComponent from './abstract-component';


const createFilmsListContainerTemplate = () => `<div class="films-list__container"></div>`;


export default class FilmsListContainer extends AbstractComponent {
  getTemplate() {
    return createFilmsListContainerTemplate();
  }
}
