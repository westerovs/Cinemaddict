import FilmCardComponent from "../components/film-card";
import FilmDetailsComponent from "../components/film-details";
import {isEscPressed, isSubmitPressed} from "../utils/helpers";
import {remove, render} from "../utils/render";
import API from "../api";


export default class FilmController {
  constructor(container, moviesModel, onDataChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._filmCard = null;
    this._filmDetails = null;
    this._film = null;

    this._moviesModel = moviesModel;
    this._api = new API();
  }

  render(film) {
    this._film = film;
    this._filmCard = new FilmCardComponent(film);
    this._filmDetails = new FilmDetailsComponent(film);

    this.initFilmCardListeners();
    this.initFilmDetailsListeners();

    render(this._container.querySelector(`.films-list__container`), this._filmCard);
  }

  destroy() {
    remove(this._filmCard);
    remove(this._filmDetails);
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
        this._filmDetails.show(this._container.closest(`.main`));

        if (!this._film.comments.length) {
          this._api.getComments(this._film.id)
            .then((comments) => {
              this._film.comments = comments;
              this._moviesModel.setComments(this._film.id, comments);
              this._filmDetails.film = this._film;
              this._filmDetails.rerender();
            });
        }
      }
    });

    this._filmCard.onAddToWatchlistClick((evt) => {
      evt.preventDefault();
      evt.target.setAttribute(`disabled`, `disabled`);

      this._onDataChange(this, this._film, Object.assign({}, this._film, {
        isInWatchlist: !this._film.isInWatchlist
      }));
    });

    this._filmCard.onMarkAsWatchedClick((evt) => {
      evt.preventDefault();
      evt.target.setAttribute(`disabled`, `disabled`);

      this._onDataChange(this, this._film, Object.assign({}, this._film, {
        isWatched: !this._film.isWatched
      }));
    });

    this._filmCard.onFavoriteClick((evt) => {
      evt.preventDefault();
      evt.target.setAttribute(`disabled`, `disabled`);

      this._onDataChange(this, this._film, Object.assign({}, this._film, {
        isFavorite: !this._film.isFavorite
      }));
    });
  }

  initFilmDetailsListeners() {
    this._filmDetails.onAddToWatchlistClick((evt) => {
      evt.preventDefault();

      this._onDataChange(this, this._film, Object.assign({}, this._film, {
        isInWatchlist: !this._film.isInWatchlist
      }));
    });

    this._filmDetails.onMarkAsWatchedClick((evt) => {
      evt.preventDefault();

      this._onDataChange(this, this._film, Object.assign({}, this._film, {
        isWatched: !this._film.isWatched
      }));
    });

    this._filmDetails.onFavoriteClick((evt) => {
      evt.preventDefault();

      this._onDataChange(this, this._film, Object.assign({}, this._film, {
        isFavorite: !this._film.isFavorite
      }));
    });

    this._filmDetails.onCommentDeleteClick((evt) => {
      evt.preventDefault();

      const deletedCommentId = evt.target.closest(`.film-details__comment`).dataset.id;
      const index = this._film.comments.findIndex((it) => it.id === parseInt(deletedCommentId, 10));

      this._film.comments.splice(index, 1);

      this._onDataChange(this, this._film, Object.assign({}, this._film, this._film.comments));
    });

    this._filmDetails.onKeydown((evt) => {
      if (isEscPressed(evt)) {
        this._filmDetails.hide();
      }

      if (isSubmitPressed(evt)) {
        const commentInput = this._filmDetails.getElement().querySelector(`.film-details__comment-input`);

        if (document.activeElement === commentInput && commentInput.value && this._filmDetails.emotion) {
          this._api.createComment(this._film.id, {
            comment: commentInput.value,
            date: new Date().toISOString(),
            emotion: this._filmDetails.emotion
          })
            .then((data) => {
              const newData = Object.assign({}, this._film, {
                comments: data.comments,
                commentIds: data.comments.map((comment) => comment.id)
              });
              this._moviesModel.setComments(this._film.id, data.comments);
              this.updateComponents(newData);
            });
        }
      }
    });
  }
}
