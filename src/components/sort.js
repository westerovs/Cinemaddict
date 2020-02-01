import AbstractComponent from './abstract-component';


export const SortType = {
  DATE: `date`,
  RATING: `rating`,
  DEFAULT: `default`,
};


const createSortTemplate = () =>
  `<ul class="sort">
    <li><a href="#" data-sort-type="${SortType.DEFAULT}" class="sort__button sort__button--active">Sort by default</a></li>
    <li><a href="#" data-sort-type="${SortType.DATE}" class="sort__button">Sort by date</a></li>
    <li><a href="#" data-sort-type="${SortType.RATING}" class="sort__button">Sort by rating</a></li>
  </ul>`;


export default class Sort extends AbstractComponent {
  constructor() {
    super();
    this._currentSortType = SortType.DEFAULT;
  }

  getTemplate() {
    return createSortTemplate();
  }

  _setActiveCurrentSortItem(currentSortItem) {
    const activeSortItem = this.getElement().querySelector(`.sort__button--active`);
    activeSortItem.classList.remove(`sort__button--active`);
    currentSortItem.classList.add(`sort__button--active`);
  }

  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `A`) {
        return;
      }

      const sortType = evt.target.dataset.sortType;

      if (this._currentSortType === sortType) {
        return;
      }

      this._currentSortType = sortType;
      this._setActiveCurrentSortItem(evt.target);

      handler(this._currentSortType);
    });
  }

  setSortTypeDefault() {
    const sortByDefaultLink = this.getElement().querySelector(`a[data-sort-type="default"]`);
    sortByDefaultLink.click();
  }
}
