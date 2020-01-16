import FilterComponent from "../components/filter";
import {render, RenderPosition} from "../utils/render";
import {generateFilters} from "../mock/filters";

export default class FilterController {
  constructor(container, filters) {
    this._container = container;
    this._filters = filters;
    this._filterComponent = null;
  }

  render() {
    this._filterComponent = new FilterComponent(this._filters);
    render(this._container, this._filterComponent, RenderPosition.AFTERBEGIN);
  }

  updateComponent(filmList) {
    this._filters = generateFilters(filmList);
    this._filterComponent.filters = this._filters;
    this._filterComponent.rerender();
  }
}
