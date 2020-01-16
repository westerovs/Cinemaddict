import SortComponent, {SortType} from "../components/sort";
import NoDataComponent from "../components/no-data";
import FilmSectionComponent from "../components/film-section";
import ExtraSectionComponent from "../components/extra-film-section";
import ShowMoreButtonComponent from "../components/show-more-btn";
import {render, renderFilms, remove} from "../utils/render";
import {Films} from "../utils/const";

export default class PageController {
  constructor(container) {
    this._container = container;
    this._filmList = [];
    this._onDataChange = this._onDataChange.bind(this);

    this._sortComponent = new SortComponent();
    this._noDataComponent = new NoDataComponent();
    this._filmSectionComponent = new FilmSectionComponent();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();
  }

  render(filmList) {
    const filmSection = this._filmSectionComponent.getElement();
    const defaultList = filmList.slice();
    this._filmList = filmList;

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
      renderFilms(filmList.slice(0, filmsLoaded), filmSection, this._onDataChange);
    });

    if (filmList.length) {
      renderFilms(filmList.slice(0, Films.INITIAL_AMOUNT), filmSection, this._onDataChange);

      const topRatedFilms = filmList.slice()
        .sort((a, b) => b.rating - a.rating).slice(0, Films.EXTRA_FILM_AMOUNT);
      const mostCommentedFilms = filmList.slice()
        .sort((a, b) => b.comments.length - a.comments.length).slice(0, Films.EXTRA_FILM_AMOUNT);

      if (topRatedFilms.some((film) => film.rating !== 0)) {
        const extraSection = new ExtraSectionComponent(`Top Rated`);
        render(filmSection, extraSection);
        renderFilms(topRatedFilms, extraSection.getElement());
      }

      if (mostCommentedFilms.some((film) => film.comments.length !== 0)) {
        const extraSection = new ExtraSectionComponent(`Most Commented`);
        render(filmSection, extraSection);
        renderFilms(mostCommentedFilms, extraSection.getElement(), this._onDataChange);
      }
    } else {
      filmSection.replaceChild(this._noDataComponent.getElement(), filmSection.querySelector(`.films-list`));
    }

    if (filmList.length > Films.INITIAL_AMOUNT) {
      render(filmSection.querySelector(`.films-list`), this._showMoreButtonComponent);

      this._showMoreButtonComponent.onButtonClick(() => {
        let filmsLoaded = filmSection.querySelectorAll(`.films-list .film-card`).length;
        const loadMoreAmount = filmsLoaded + Films.LOAD_AMOUNT;

        renderFilms(filmList.slice(filmsLoaded, loadMoreAmount), filmSection, this._onDataChange);

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

      filmController.render(this._filmList[index]);
    }
  }
}
