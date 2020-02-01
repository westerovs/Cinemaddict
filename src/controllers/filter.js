import FilterComponent from '../components/filter';
import {FilterType} from '../const';
import {render, replace, RenderPosition} from '../utils/render';
import {getFilmsByFilter} from '../utils/filter';


export default class FilterController {
  constructor(container, moviesModel, pageController, sortComponent, statsController) {
    this._container = container;
    this._moviesModel = moviesModel;
    this._pageController = pageController;
    this._sortComponent = sortComponent;
    this._statsController = statsController;

    this._activeFilterType = FilterType.ALL;
    this._filterComponent = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._moviesModel.setDataChangeHandler(this._onDataChange);
  }

  render() {
    const container = this._container;
    const allFilms = this._moviesModel.getMoviesAll();
    const filters = Object.values(FilterType).map((filterType) => {
      return {
        name: filterType,
        count: getFilmsByFilter(allFilms, filterType).length,
        active: filterType === this._activeFilterType,
      };
    });
    const oldComponent = this._filterComponent;

    this._filterComponent = new FilterComponent(filters);
    this._filterComponent.setFilterChangeHandler(this._onFilterChange);

    if (oldComponent) {
      replace(this._filterComponent, oldComponent);
    } else {
      render(container, this._filterComponent, RenderPosition.BEFOREEND);
    }
  }

  _onFilterChange(filterType) {
    this._moviesModel.setFilter(filterType);
    this._activeFilterType = filterType;
    this._sortComponent.setSortTypeDefault();
    this.render();

    switch (filterType) {
      case FilterType.STATS:
        this._pageController.hide();
        this._sortComponent.hide();
        this._statsController.show();
        break;
      default:
        this._pageController.show();
        this._sortComponent.show();
        this._statsController.hide();
    }
  }

  _onDataChange() {
    this.render();
  }
}
