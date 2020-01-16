import SortComponent from "../components/sort";
import NoDataComponent from "../components/no-data";
import FilmSectionComponent from "../components/film-section";
import ExtraSectionComponent from "../components/extra-film-section";
import ShowMoreButtonComponent from "../components/show-more-btn";
import {render, remove} from "../utils/render";
import {Films, FilterTypes} from "../utils/const";
import FilmController from "./film";
import {getFilmsToLoadAmount} from "../utils/helpers";
import StatisticComponent from "../components/statistic";
import API from "../api";
import Movie from "../models/movie";
import Comment from "../models/comment";

export default class PageController {
  constructor(container, moviesModel) {
    this._container = container;
    this._moviesModel = moviesModel;

    this._onDataChange = this._onDataChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._sortComponent = new SortComponent();
    this._noDataComponent = new NoDataComponent();
    this._filmSectionComponent = new FilmSectionComponent();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();
    this._statisticComponent = null;

    this._filmControllers = [];
    this._extraFilmControllers = [];
    this._moviesModel.onFilterChange(this._onFilterChange);
    this._api = new API();
    this._renderedFilmsAmount = 0;
  }

  showFilmsPage() {
    this._sortComponent.show();
    this._filmSectionComponent.show();
    this._statisticComponent.hide();
  }

  showStatPage() {
    this._statisticComponent.show();
    this._sortComponent.hide();
    this._filmSectionComponent.hide();
  }

  renderFilms(filmList, section, countFilms = true) {
    filmList.forEach((film) => {
      const filmController = new FilmController(section, this._moviesModel, this._onDataChange, film.id);

      if (section.className === `films`) {
        this._filmControllers.push(filmController);
      }

      if (section.className === `films-list--extra`) {
        this._extraFilmControllers.push(filmController);
      }

      filmController.render(film);
    });

    if (countFilms) {
      this._renderedFilmsAmount = this._filmControllers.length;
    }

    if (this._renderedFilmsAmount < this._moviesModel.getFilmList().length) {
      this._renderShowMoreButton();
    }
  }

  render() {
    const filmSection = this._filmSectionComponent.getElement();
    const filmList = this._moviesModel.getFilmList();

    render(this._container, this._sortComponent);
    render(this._container, this._filmSectionComponent);

    this._statisticComponent = new StatisticComponent(this._moviesModel);
    render(this._container, this._statisticComponent);
    this._statisticComponent.hide();

    this._sortComponent.onSortTypeChange((sortType) => {
      this._moviesModel.sortType = sortType;
      this._updateFilms();
    });

    if (filmList.length) {
      this.renderFilms(filmList.slice(0, Films.INITIAL_AMOUNT), filmSection);

      this._renderExtraSection(`Top Rated`);
      this._renderExtraSection(`Most Commented`);
    } else {
      filmSection.replaceChild(this._noDataComponent.getElement(), filmSection.querySelector(`.films-list`));
    }
  }

  _renderExtraSection(sectionName) {
    this._removeExtraSection(sectionName);
    let filmList;
    let checkConditionCb;

    if (sectionName === `Most Commented`) {
      filmList = this._moviesModel.filmListDefault.slice()
        .sort((a, b) => b.commentIds.length - a.commentIds.length).slice(0, Films.EXTRA_FILM_AMOUNT);
      checkConditionCb = (film) => film.commentIds.length !== 0;
    }

    if (sectionName === `Top Rated`) {
      filmList = this._moviesModel.filmListDefault.slice()
        .sort((a, b) => b.rating - a.rating).slice(0, Films.EXTRA_FILM_AMOUNT);
      checkConditionCb = (film) => film.rating !== 0;
    }

    if (filmList.some(checkConditionCb)) {
      const extraSection = new ExtraSectionComponent(sectionName);
      render(this._filmSectionComponent.getElement(), extraSection);
      this.renderFilms(filmList, extraSection.getElement(), false);
    }
  }

  _removeExtraSection(sectionName) {
    const sections = this._filmSectionComponent.getElement().querySelectorAll(`.films-list--extra`);

    sections.forEach((section) => {
      if (section.querySelector(`.films-list__title`).textContent === sectionName) {
        section.remove();
      }
    });
  }

  _renderShowMoreButton() {
    if (document.querySelector(`.films-list__show-more`)) {
      return;
    }

    const filmSection = this._filmSectionComponent.getElement();
    render(filmSection.querySelector(`.films-list`), this._showMoreButtonComponent);

    this._showMoreButtonComponent.onButtonClick(() => {
      const filmsToLoad = this._moviesModel.getFilmList();
      const loadMoreAmount = this._renderedFilmsAmount + Films.LOAD_AMOUNT;

      this.renderFilms(filmsToLoad.slice(this._renderedFilmsAmount, loadMoreAmount), filmSection);

      if (loadMoreAmount >= filmsToLoad.length) {
        remove(this._showMoreButtonComponent);
      }
    });
  }

  _removeFilms() {
    this._filmControllers.forEach((it) => it.destroy());
    this._filmControllers = [];
    remove(this._showMoreButtonComponent);
    this._showMoreButtonComponent.removeElement();
  }

  _updateFilms() {
    this._removeFilms();

    const filmAmount = getFilmsToLoadAmount(this._renderedFilmsAmount);
    this.renderFilms(this._moviesModel.getFilmList().slice(0, filmAmount), this._filmSectionComponent.getElement());
  }

  _onDataChange(filmController, oldData, newData, isDeleted = false) {
    const controllers = this._filmControllers.concat(this._extraFilmControllers)
      .filter((it) => it.id === filmController.id);

    if (newData instanceof Comment && !isDeleted) {
      return this._api.createComment(oldData.id, newData)
        .then((data) => {
          const newFilm = Object.assign({}, oldData, {
            comments: data.comments,
            commentIds: data.comments.map((comment) => comment.id)
          });

          this._onRequestSuccess(newFilm, controllers);
          this._renderExtraSection(`Most Commented`);
        });
    }

    if (newData instanceof Comment && isDeleted) {
      return this._api.deleteComment(newData.id)
        .then(() => {
          const index = oldData.comments.findIndex((comment) => comment.id === newData.id);
          oldData.comments.splice(index, 1);
          oldData.commentIds.splice(oldData.commentIds.indexOf(newData.id), 1);

          this._onRequestSuccess(oldData, controllers);
          this._renderExtraSection(`Most Commented`);
        });
    }

    if (newData instanceof Movie) {
      return this._api.updateMovie(newData.id, newData)
        .then((response) => Movie.parseMovie(response))
        .then((data) => {
          data.comments = filmController.getComments();

          this._onRequestSuccess(data, controllers);
          if (this._moviesModel.filterType !== FilterTypes.DEFAULT) {
            this._updateFilms();
          }
        });
    }
  }

  _onRequestSuccess(data, controllers) {
    this._moviesModel.onDataChange(() => {
      controllers.forEach((it) => it.updateComponents(data));
    });
    this._moviesModel.updateFilm(data.id, data);
  }

  _onFilterChange() {
    this._updateFilms();
  }
}
