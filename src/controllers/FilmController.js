import FilmCardComponent from "../components/film-card";
import FilmDetailsComponent from "../components/film-details";
import {isEscPressed} from "../utils/helpers";
import {remove, render} from "../utils/render";


export default class FilmController {
  constructor(container, onDataChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._filmCard = null;
    this._filmDetails = null;
    this._film = null;
  }

  render(film) {
    this._film = film;
    this._filmCard = new FilmCardComponent(film);
    this._filmDetails = new FilmDetailsComponent(film);

    this.initFilmCardListeners();
    this.initFilmDetailsListeners();

    render(this._container.querySelector(`.films-list__container`), this._filmCard);
  }

  updateComponents(newFilm) {
    this._film = newFilm;
    this._filmCard.film = newFilm;
    this._filmDetails.film = newFilm;

    this._filmCard.rerender();
    this._filmDetails.rerender();
  }

  initFilmCardListeners() {
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

    this._filmCard.onAddToWatchlistClick((evt) => {
      evt.preventDefault();

      this._onDataChange(this, this._film, Object.assign({}, this._film, {
        isInWatchlist: !this._film.isInWatchlist
      }));
    });

    this._filmCard.onMarkAsWatchedClick((evt) => {
      evt.preventDefault();

      this._onDataChange(this, this._film, Object.assign({}, this._film, {
        isWatched: !this._film.isWatched
      }));
    });

    this._filmCard.onFavoriteClick((evt) => {
      evt.preventDefault();

      this._onDataChange(this, this._film, Object.assign({}, this._film, {
        isFavorite: !this._film.isFavorite
      }));
    });
  }

  initFilmDetailsListeners() {
    this._filmDetails.onAddToWatchlistClick(() => {
      this._onDataChange(this, this._film, Object.assign({}, this._film, {
        isInWatchlist: !this._film.isInWatchlist
      }));
    });

    this._filmDetails.onMarkAsWatchedClick(() => {
      this._onDataChange(this, this._film, Object.assign({}, this._film, {
        isWatched: !this._film.isWatched
      }));
    });

    this._filmDetails.onFavoriteClick(() => {
      this._onDataChange(this, this._film, Object.assign({}, this._film, {
        isFavorite: !this._film.isFavorite
      }));
    });
  }
}
