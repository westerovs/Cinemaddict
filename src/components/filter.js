import SmartComponent from "./smart-component";

export default class Filter extends SmartComponent {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  renderFilters(filters) {
    return filters.map((filter) =>
      `<a href="#watchlist" class="main-navigation__item">${filter.title} <span class="main-navigation__item-count">${filter.count}</span></a>`
    ).join(`\n`);
  }

  getTemplate() {
    return `<nav class="main-navigation">
    <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
    ${this.renderFilters(this._filters)}
    <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
  </nav>`;
  }

  set filters(newFilters) {
    this._filters = newFilters;
  }

  recoverListeners() {
    this._subscribeOnEvents();
  }

  _subscribeOnEvents() {}
}
