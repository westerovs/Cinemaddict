import {createElement} from '../utils.js';

// Cортировка
export const createSortTemplate = () => (
  `<ul class="sort">
    <li><a href="#" class="sort__button sort__button-default sort__button--active">Sort by default</a></li>
    <li><a href="#" class="sort__button sort__button-date">Sort by date</a></li>
    <li><a href="#" class="sort__button sort__button-rating">Sort by rating</a></li>
  </ul>`
);

// класс который экспортируется из этого компонента по умолчанию
export default class Sort {
  constructor() {
    // нужно указать поле элемент в котором будет храниться DOM узел
    // null т.к на момент создания экземпляра нет никаких DOM узлов
    this._element = null;
  }

  // метод getTemplate возвращает разметку(в виде строки)
  getTemplate() {
    return createSortTemplate();
  }

  getElement() {
    // далее мы эту строку(getTemplate) передаём createElement`У
    // проверка: cуществует ли у этого инстанса(экземпляра) элемент
    // если у this._element будет null, то мы сюда провалимся и запишем в this._element
    // функцию createElement с результатом getTemplate
    if (!this._element) {
      // тут хранится dom узел из createElement
      this._element = createElement(this.getTemplate());
    }
    // возвращает dom узел
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}


