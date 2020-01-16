import FilterComponent from "../components/filter";
import {render, RenderPosition} from "../utils/render";
import {generateFilters} from "../mock/filters";

export default class FilterController {
  constructor(container, moviesModel) {
    this._container = container;
    this._moviesModel = moviesModel;
    this._filters = null;

    this._filterComponent = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._moviesModel.onDataChange(this._onDataChange);
  }

  render() {
    this._filters = generateFilters(this._moviesModel.filmListDefault);
    this._filterComponent = new FilterComponent(this._filters);
    render(this._container, this._filterComponent, RenderPosition.AFTERBEGIN);

    this._filterComponent.onFilterChange((evt) => {
      evt.preventDefault();

      if (!evt.target.classList.contains(`main-navigation__item--active`)) {
        this._filterComponent.getElement().querySelector(`.main-navigation__item--active`).classList.remove(`main-navigation__item--active`);
        evt.target.classList.add(`main-navigation__item--active`);

        const filterType = evt.target.dataset.filterType;

        this._moviesModel.setFilter(filterType);
        this._filterComponent.currentFilterType = filterType;
      }
    });
  }

  _onDataChange() {
    this._filters = generateFilters(this._moviesModel.filmListDefault);
    this._filterComponent.filters = this._filters;
    this._filterComponent.rerender();
  }
}
