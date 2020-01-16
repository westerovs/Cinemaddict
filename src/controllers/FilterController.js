import FilterComponent from "../components/filter";
import {remove, render, RenderPosition} from "../utils/render";

/**
 * Контроллер пока не используется.
 */
export default class FilterController {
  constructor(container, filters) {
    this._container = container;
    this._filters = filters;
    this._filterComponent = null;
  }

  render() {
    if (this._filterComponent) {
      remove(this._filterComponent);
    }

    this._filterComponent = new FilterComponent(this._filters);
    render(this._container, this._filterComponent, RenderPosition.AFTERBEGIN);
  }
}
