import UserRankComponent from '../components/user-rank';
import {render, replace, RenderPosition} from '../utils/render';
import {FilterType} from '../const';

export default class UserRankController {
  constructor(container, moviesModel) {
    this._container = container;
    this._moviesModel = moviesModel;

    this._userRankComponent = null;

    this._onDataChange = this._onDataChange.bind(this);

    this._moviesModel.setDataChangeHandler(this._onDataChange);
  }

  render() {
    const container = this._container;
    const watchedMovies = this._moviesModel.getMoviesByFilter(FilterType.HISTORY);
    const oldComponent = this._userRankComponent;

    this._userRankComponent = new UserRankComponent(watchedMovies);

    if (oldComponent) {
      replace(this._userRankComponent, oldComponent);
    } else {
      render(container, this._userRankComponent, RenderPosition.BEFOREEND);
    }
  }

  _onDataChange() {
    this.render();
  }
}
