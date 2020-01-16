import MenuComponent from "../components/menu";
import {render, RenderPosition} from "../utils/render";
import {generateFilters} from "../mock/filters";

export default class MenuController {
  constructor(container, moviesModel) {
    this._container = container;
    this._moviesModel = moviesModel;
    this._filters = null;

    this._menuComponent = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._moviesModel.onDataChange(this._onDataChange);
  }

  get component() {
    return this._menuComponent;
  }

  render() {
    this._filters = generateFilters(this._moviesModel.filmListDefault);
    this._menuComponent = new MenuComponent(this._filters);
    render(this._container, this._menuComponent, RenderPosition.AFTERBEGIN);
  }

  _onDataChange() {
    this._filters = generateFilters(this._moviesModel.filmListDefault);
    this._menuComponent.filters = this._filters;
    this._menuComponent.rerender();
  }
}
