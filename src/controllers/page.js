import FilmsListTopRatedComponent from './../components/film-list-top-rated';
import FilmsListMostCommentedComponent from './../components/film-list-most-commented';
import FilmListContainerComponent from './../components/film-list-container';
import LoadMoreButtonComponent from './../components/load-more-button';
import {RenderPosition, render, replace, remove} from './../utils/render';
import {renderFilms} from './../utils/render-films';
import {SortType} from './../components/sort';


const SHOWING_FILM_CARD_COUNT_ON_START = 5;
const SHOWING_FILM_CARD_COUNT_BY_BUTTON = 5;
const SHOWING_FILM_CARD_COUNT_BY_EXTRA = 2;


export default class PageController {
  constructor(filmsComponent, sortComponent, moviesModel, api) {
    this._filmsComponent = filmsComponent;
    this._sortComponent = sortComponent;
    this._moviesModel = moviesModel;
    this._api = api;

    this._films = [];
    // this._showedFilmsControllers = []; пока закомментирую, так как считаю это лишним свойством. Если к следующей лекции это действительно станет не нужным, то удалю.
    this._allFilmsControllers = [];
    this._showingFilmCardCountByButton = SHOWING_FILM_CARD_COUNT_BY_BUTTON;

    this._filmListContainerComponent = new FilmListContainerComponent();
    this._loadMoreButtonComponent = new LoadMoreButtonComponent();

    this._filmsListTopRatedComponent = null;
    this._filmsListMostCommentedComponent = null;

    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
    this._moviesModel.setFilterChangeHandler(this._onFilterChange);
  }

  hide() {
    this._filmsComponent.hide();
  }

  show() {
    this._filmsComponent.show();
  }

  render() {
    const films = this._moviesModel.getMovies();

    if (films.length) {
      const filmsElement = this._filmsComponent.getElement();
      const filmsListElement = filmsElement.querySelector(`.films-list`);
      const filmsListContainerElement = this._filmListContainerComponent.getElement();

      render(filmsListElement, this._filmListContainerComponent, RenderPosition.BEFOREEND);

      this._renderFilms(filmsListContainerElement, films.slice(0, this._showingFilmCardCountByButton));
      this._renderLoadMoreButton(films);
    }
  }

  renderTopRatedList() {
    if (this._moviesModel.hasRatings()) {
      const filmsElement = this._filmsComponent.getElement();
      const sortedFilms = this._moviesModel.getSortedMoviesByRating();

      const oldComponent = this._filmsListTopRatedComponent;

      this._filmsListTopRatedComponent = new FilmsListTopRatedComponent();

      if (oldComponent) {
        replace(this._filmsListTopRatedComponent, oldComponent);
      } else {
        render(filmsElement, this._filmsListTopRatedComponent, RenderPosition.BEFOREEND);
      }

      const topRatedContainerElements = this._filmsListTopRatedComponent.getElement().querySelector(`.films-list__container`
      );

      this._renderFilms(topRatedContainerElements, sortedFilms.slice(0, SHOWING_FILM_CARD_COUNT_BY_EXTRA));
    }
  }

  renderMostCommentedList() {
    if (this._moviesModel.hasComments()) {
      const filmsElement = this._filmsComponent.getElement();
      const sortedFilms = this._moviesModel.getSortedMoviesByCommentsCount();

      const oldComponent = this._filmsListMostCommentedComponent;

      this._filmsListMostCommentedComponent = new FilmsListMostCommentedComponent();

      if (oldComponent) {
        replace(this._filmsListMostCommentedComponent, oldComponent);
      } else {
        render(filmsElement, this._filmsListMostCommentedComponent, RenderPosition.BEFOREEND);
      }

      const mostCommentedContainerElements = this._filmsListMostCommentedComponent.getElement().querySelector(`.films-list__container`);

      this._renderFilms(mostCommentedContainerElements, sortedFilms.slice(0, SHOWING_FILM_CARD_COUNT_BY_EXTRA));
    }
  }

  _removeFilms() {
    const filmsListContainerElement = this._filmListContainerComponent.getElement();
    filmsListContainerElement.innerHTML = ``;
    this._allFilmsControllers = [];
  }

  _renderFilms(container, films) {
    const filmsElement = this._filmsComponent.getElement();

    const newFilms = renderFilms(container, filmsElement, films, this._onDataChange, this._onViewChange, this._api);
    // this._showedFilmsControllers = this._showedFilmsControllers.concat(newFilms);
    this._allFilmsControllers = this._allFilmsControllers.concat(newFilms);
  }

  _renderLoadMoreButton(films) {
    remove(this._loadMoreButtonComponent);

    if (this._showingFilmCardCountByButton >= films.length) {
      return;
    }

    const filmsElement = this._filmsComponent.getElement();
    const filmsListElement = filmsElement.querySelector(`.films-list`);
    const filmsListContainerElement = this._filmListContainerComponent.getElement();

    render(filmsListElement, this._loadMoreButtonComponent, RenderPosition.BEFOREEND);

    this._loadMoreButtonComponent.setClickHandler(() => {
      const prevFilmCardsCount = this._showingFilmCardCountByButton;
      this._showingFilmCardCountByButton += SHOWING_FILM_CARD_COUNT_BY_BUTTON;

      this._renderFilms(filmsListContainerElement, films.slice(prevFilmCardsCount, this._showingFilmCardCountByButton));

      if (this._showingFilmCardCountByButton >= films.length) {
        remove(this._loadMoreButtonComponent);
      }
    });
  }

  _onDataChange(movieController, oldData, newData) {
    let movie;

    return this._api.updateMovie(oldData.id, newData)
      .then((movieData) => {
        movie = movieData;
      })
      .then(() => this._api.getComments(movie.id))
      .then((comments) => {
        movie.comments = comments;

        const isSuccess = this._moviesModel.updateMovie(oldData.id, movie);

        if (isSuccess) {
          movieController.render(movie);
        }

        this.renderTopRatedList();
        this.renderMostCommentedList();
      });
  }

  _onViewChange() {
    this._allFilmsControllers.forEach((it) => it.setDefaultView());
  }

  _onSortTypeChange(sortType) {
    let sortedFilms = [];
    const films = this._moviesModel.getMovies();

    switch (sortType) {
      case SortType.DATE:
        sortedFilms = films.slice().sort((a, b) => {
          return new Date(b.filmInfo.releaseDate) - new Date(a.filmInfo.releaseDate);
        });
        break;
      case SortType.RATING:
        sortedFilms = films.slice().sort((a, b) => {
          return b.filmInfo.totalRating - a.filmInfo.totalRating;
        });
        break;
      case SortType.DEFAULT:
        sortedFilms = films.slice();
        break;
    }

    const filmsListContainerElement = this._filmListContainerComponent.getElement();

    this._showingFilmCardCountByButton = SHOWING_FILM_CARD_COUNT_ON_START;

    this._removeFilms();
    this._renderFilms(filmsListContainerElement, sortedFilms.slice(0, this._showingFilmCardCountByButton));
    this._renderLoadMoreButton(sortedFilms);
  }

  _onFilterChange() {
    const filmsListContainerElement = this._filmListContainerComponent.getElement();
    const films = this._moviesModel.getMovies();

    this._showingFilmCardCountByButton = SHOWING_FILM_CARD_COUNT_ON_START;

    this._removeFilms();
    this._renderFilms(filmsListContainerElement, films.slice(0, SHOWING_FILM_CARD_COUNT_ON_START));
    this._renderLoadMoreButton(films);
  }
}
