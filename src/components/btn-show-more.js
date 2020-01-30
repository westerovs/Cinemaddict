import AbstractComponent from './abstract-component.js';


const createBtnShowMoreTemplate = () => (
  `<button class="films-list__show-more">Show more</button>`
);


export default class BtnShowMore extends AbstractComponent {
  getTemplate() {
    return createBtnShowMoreTemplate();
  }

  setShowMoreClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
}
