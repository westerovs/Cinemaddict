import SmartComponent from "./smart-component";
import {FilterTypes} from "../utils/const";

export default class Menu extends SmartComponent {
  constructor(filters) {
    super();
    this._filters = filters;
    this._currenFilterType = FilterTypes.DEFAULT;
  }

  renderFilters(filters) {
    return filters.map((filter) =>
      `<a href="#" data-filter-type="${filter.type}" class="main-navigation__item ${this._currenFilterType === filter.type ? `main-navigation__item--active` : ``}">${filter.title} <span class="main-navigation__item-count">${filter.count}</span></a>`
    ).join(`\n`);
  }

  getTemplate() {
    return `<nav class="main-navigation">
    <a href="#all" data-filter-type="all" class="main-navigation__item ${this._currenFilterType === FilterTypes.DEFAULT ? `main-navigation__item--active` : ``}">All movies</a>
    ${this.renderFilters(this._filters)}
    <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
  </nav>`;
  }

  set filters(newFilters) {
    this._filters = newFilters;
  }

  set currentFilterType(filterType) {
    this._currenFilterType = filterType;
  }

  onMenuItemClick(handler) {
    this.getElement().addEventListener(`click`, handler);
    this._onFilterChange = handler;
  }

  onStatsClick(handler) {
    this.getElement().querySelector(`.main-navigation__item--additional`).addEventListener(`click`, handler);
    this._onStatsClick = handler;
  }

  recoverListeners() {
    this._subscribeOnEvents();
  }

  _subscribeOnEvents() {
    this.getElement().addEventListener(`click`, this._onFilterChange);
    this.getElement().querySelector(`.main-navigation__item--additional`).addEventListener(`click`, this._onStatsClick);
  }
}
