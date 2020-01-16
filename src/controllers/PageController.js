import SortComponent, {SortType} from "../components/sort";
import NoDataComponent from "../components/no-data";
import FilmSectionComponent from "../components/film-section";
import ExtraSectionComponent from "../components/extra-film-section";
import ShowMoreButtonComponent from "../components/show-more-btn";
import {render, remove} from "../utils/render";
import {Films} from "../utils/const";
import FilterController from "./FilterController";
import {generateFilters} from "../mock/filters";
import FilmController from "./FilmController";

export default class PageController {
  constructor(container) {
    this._container = container;
    this._filmList = [];
    this._onDataChange = this._onDataChange.bind(this);

    this._sortComponent = new SortComponent();
    this._noDataComponent = new NoDataComponent();
    this._filmSectionComponent = new FilmSectionComponent();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();

    this._filterController = null;
  }

  renderFilms(filmList, section) {
    for (const film of filmList) {
      const filmController = new FilmController(section, this._onDataChange);
      filmController.render(film);
    }
  }

  render(filmList) {
    const filmSection = this._filmSectionComponent.getElement();
    const defaultList = filmList.slice();
    this._filmList = filmList;
    this._filterController = new FilterController(this._container, generateFilters(filmList));
    this._filterController.render();

    render(this._container, this._sortComponent);
    render(this._container, this._filmSectionComponent);

    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      const filmsLoaded = filmSection.querySelectorAll(`.films-list .film-card`).length;

      switch (sortType) {
        case SortType.DATE:
          filmList.sort((a, b) => b.year - a.year);
          break;
        case SortType.RATING:
          filmList.sort((a, b) => b.rating - a.rating);
          break;
        case SortType.DEFAULT:
          filmList = defaultList.slice();
          break;
      }

      filmSection.querySelector(`.films-list__container`).innerHTML = ``;
      this.renderFilms(filmList.slice(0, filmsLoaded), filmSection);
    });

    if (filmList.length) {
      this.renderFilms(filmList.slice(0, Films.INITIAL_AMOUNT), filmSection);

      const topRatedFilms = filmList.slice()
        .sort((a, b) => b.rating - a.rating).slice(0, Films.EXTRA_FILM_AMOUNT);
      const mostCommentedFilms = filmList.slice()
        .sort((a, b) => b.comments.length - a.comments.length).slice(0, Films.EXTRA_FILM_AMOUNT);

      if (topRatedFilms.some((film) => film.rating !== 0)) {
        const extraSection = new ExtraSectionComponent(`Top Rated`);
        render(filmSection, extraSection);
        this.renderFilms(topRatedFilms, extraSection.getElement());
      }

      if (mostCommentedFilms.some((film) => film.comments.length !== 0)) {
        const extraSection = new ExtraSectionComponent(`Most Commented`);
        render(filmSection, extraSection);
        this.renderFilms(mostCommentedFilms, extraSection.getElement());
      }
    } else {
      filmSection.replaceChild(this._noDataComponent.getElement(), filmSection.querySelector(`.films-list`));
    }

    if (filmList.length > Films.INITIAL_AMOUNT) {
      render(filmSection.querySelector(`.films-list`), this._showMoreButtonComponent);

      this._showMoreButtonComponent.onButtonClick(() => {
        let filmsLoaded = filmSection.querySelectorAll(`.films-list .film-card`).length;
        const loadMoreAmount = filmsLoaded + Films.LOAD_AMOUNT;

        this.renderFilms(filmList.slice(filmsLoaded, loadMoreAmount), filmSection);

        if (loadMoreAmount === Films.TOTAL_AMOUNT) {
          remove(this._showMoreButtonComponent);
        }
      });
    }
  }

  _onDataChange(filmController, oldFilm, newFilm) {
    const index = this._filmList.indexOf(oldFilm);

    if (index !== -1) {
      this._filmList[index] = newFilm;
      filmController.updateComponents(this._filmList[index]);
      this._filterController.updateComponent(this._filmList);
    }
  }
}
