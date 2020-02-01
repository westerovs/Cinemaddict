import FilmListTitleComponent from '../components/film-list-title';
import {render, replace, RenderPosition} from '../utils/render';


export default class FilmListTitleController {
  constructor(container, moviesModel) {
    this._container = container;
    this._moviesModel = moviesModel;

    this._filmListTitleComponent = null;

    this._onDataChange = this._onDataChange.bind(this);

    this._moviesModel.setDataChangeHandler(this._onDataChange);
  }

  render() {
    const container = this._container;
    const movies = this._moviesModel.getMoviesAll();
    const oldComponent = this._filmListTitleComponent;

    this._filmListTitleComponent = new FilmListTitleComponent(movies);

    if (oldComponent) {
      replace(this._filmListTitleComponent, oldComponent);
    } else {
      render(container, this._filmListTitleComponent, RenderPosition.BEFOREEND);
    }
  }

  _onDataChange() {
    this.render();
  }
}
