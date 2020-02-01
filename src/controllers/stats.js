import StatsComponent from '../components/stats';
import {render, RenderPosition} from '../utils/render';
import {FilterType} from '../const';


export default class StatsController {
  constructor(container, moviesModel, period) {
    this._container = container;
    this._moviesModel = moviesModel;
    this._period = period;

    this._statsComponent = null;
  }

  hide() {
    this._statsComponent.hide();
  }

  show() {
    const watchedMovies = this._moviesModel.getMoviesByFilter(FilterType.HISTORY);
    this._statsComponent.show();
    this._statsComponent.rerender(watchedMovies, this._period);
  }

  render() {
    const watchedMovies = this._moviesModel.getMoviesByFilter(FilterType.HISTORY);

    this._statsComponent = new StatsComponent(watchedMovies, this._period);

    render(this._container, this._statsComponent, RenderPosition.BEFOREEND);
  }
}
