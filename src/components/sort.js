import AbstractComponent from './abstract-component.js';


// Cортировка
const createSortTemplate = () => (
  `<ul class="sort">
    <li><a href="#" class="sort__button sort__button-default sort__button--active">Sort by default</a></li>
    <li><a href="#" class="sort__button sort__button-date">Sort by date</a></li>
    <li><a href="#" class="sort__button sort__button-rating">Sort by rating</a></li>
  </ul>`
);

// класс который экспортируется из этого компонента по умолчанию
export default class Sort extends AbstractComponent {
  // метод getTemplate возвращает разметку(в виде строки)
  getTemplate() {
    return createSortTemplate();
  }
}
