import AbstractComponent from './abstract-component.js';


// кнопка show-more
const createBtnShowMoreTemplate = () => (
  `<button class="films-list__show-more">Show more</button>`
);


export default class BtnShowMore extends AbstractComponent {
  getTemplate() {
    return createBtnShowMoreTemplate();
  }
}
