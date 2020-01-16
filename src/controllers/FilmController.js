import FilmCardComponent from "../components/film-card";
import FilmDetailsComponent from "../components/film-details";
import {isEscPressed} from "../utils/helpers";
import {remove, render, replace} from "../utils/render";


export default class FilmController {
  constructor(container, onDataChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._filmCard = null;
    this._filmDetails = null;
  }

  render(film) {
    const oldFilmCard = this._filmCard;
    const oldFilmDetails = this._filmDetails;

    this._filmCard = new FilmCardComponent(film);
    this._filmDetails = new FilmDetailsComponent(film);

    this._filmCard.onFilmClick((evt) => {
      if (evt.target.matches(`.film-card__title`) ||
        evt.target.matches(`.film-card__poster`) ||
        evt.target.matches(`.film-card__comments`)) {
        render(this._container.closest(`.main`), this._filmDetails);

        const onEscPress = (keyEvt) => {
          if (isEscPressed(keyEvt)) {
            remove(this._filmDetails);
            document.removeEventListener(`keydown`, onEscPress);
          }
        };

        document.addEventListener(`keydown`, onEscPress);
      }
    });

    this._filmDetails.onCloseButtonClick(() => {
      remove(this._filmDetails);
    });

    this._filmCard.onAddToWatchlistClick((evt) => {
      evt.preventDefault();

      this._onDataChange(this, film, Object.assign({}, film, {
        isInWatchlist: !film.isInWatchlist
      }));
    });

    this._filmCard.onMarkAsWatchedClick((evt) => {
      evt.preventDefault();

      this._onDataChange(this, film, Object.assign({}, film, {
        isWatched: !film.isWatched
      }));
    });

    this._filmCard.onFavoriteClick((evt) => {
      evt.preventDefault();

      this._onDataChange(this, film, Object.assign({}, film, {
        isFavorite: !film.isFavorite
      }));
    });

    this._filmDetails.onAddToWatchlistClick(() => {
      this._onDataChange(this, film, Object.assign({}, film, {
        isInWatchlist: !film.isInWatchlist
      }));
    });

    this._filmDetails.onMarkAsWatchedClick(() => {
      this._onDataChange(this, film, Object.assign({}, film, {
        isWatched: !film.isWatched
      }));
    });

    this._filmDetails.onFavoriteClick(() => {
      this._onDataChange(this, film, Object.assign({}, film, {
        isFavorite: !film.isFavorite
      }));
    });

    if (oldFilmCard && oldFilmDetails) {
      replace(this._filmCard, oldFilmCard);
      replace(this._filmDetails, oldFilmDetails);
    } else {
      render(this._container.querySelector(`.films-list__container`), this._filmCard);
    }
  }
}
