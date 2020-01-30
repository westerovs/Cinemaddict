import {createElement} from '../utils/utils.js';


export default class AbstractComponent {

  constructor() {
    if (new.target === AbstractComponent) {
      throw new Error(`Нельзя использовать абстрактные компоненты, создайте конкретный компонент`);
    }
    this._element = null;
  }

  getTemplate() {
    throw new Error(`Не знаю какой шаблон отрисовать. Воспользуйся наследованием и полиморфизмом`);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  // удаляет объекты из памяти, где из подбирает сборщик мусора
  removeElement() {
    this._element = null;
  }
}
