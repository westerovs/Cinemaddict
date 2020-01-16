import FilmCardComponent from "../components/film-card";
import FilmDetailsComponent from "../components/film-details";
import {isEscPressed, isSubmitPressed} from "../utils/helpers";
import {remove, render} from "../utils/render";
import API from "../api";
import Comment from "../models/comment";
import Movie from "../models/movie";
import {Colors, Styles} from "../utils/const";


export default class FilmController {
  constructor(container, moviesModel, onDataChange, id) {
    this._id = id;
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

  get id() {
    return this._id;
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

  getComments() {
    return this._film.comments;
  }

  toggleFormState(formSelector, formElements) {
    const form = this._filmDetails.getElement().querySelector(`.${formSelector}`);
    form.querySelectorAll(formElements)
      .forEach((el) => {
        if (el.hasAttribute(`disabled`)) {
          el.removeAttribute(`disabled`);
        } else {
          el.setAttribute(`disabled`, ``);
        }
      });
  }

  shakeCommentForm() {
    const form = this._filmDetails.getElement().querySelector(`.film-details__new-comment`);
    const onTextareaChange = (evt) => {
      evt.target.style.border = ``;
      form.querySelector(`textarea`).removeEventListener(`input`, onTextareaChange);
    };

    form.querySelector(`textarea`).style.border = Colors.BORDER_ERROR;

    form.classList.add(`shake`);
    form.addEventListener(`animationend`, () => form.classList.remove(`shake`));
    form.querySelector(`textarea`).addEventListener(`input`, onTextareaChange);
  }

  shakeRatingForm(label) {
    const form = this._filmDetails.getElement().querySelector(`.film-details__user-rating-score`);
    const originalColor = label.style.backgroundColor;

    label.style.backgroundColor = Colors.ERROR;
    form.classList.add(`shake`);
    form.addEventListener(`animationend`, () => {
      form.classList.remove(`shake`);
      label.style.backgroundColor = originalColor;
    });
  }

  _changeFilmData(updatedData) {
    const newData = Object.assign({}, this._film, updatedData);

    return this._onDataChange(this, this._film, new Movie(Movie.toRAW(newData)));
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

      this._changeFilmData({isInWatchlist: !this._film.isInWatchlist});
    });

    this._filmCard.onMarkAsWatchedClick((evt) => {
      evt.preventDefault();
      evt.target.setAttribute(`disabled`, `disabled`);

      this._changeFilmData({isWatched: !this._film.isWatched});
    });

    this._filmCard.onFavoriteClick((evt) => {
      evt.preventDefault();
      evt.target.setAttribute(`disabled`, `disabled`);

      this._changeFilmData({isFavorite: !this._film.isFavorite});
    });
  }

  initFilmDetailsListeners() {
    this._filmDetails.onAddToWatchlistClick((evt) => {
      evt.preventDefault();

      this._changeFilmData({isInWatchlist: !this._film.isInWatchlist});
    });

    this._filmDetails.onMarkAsWatchedClick((evt) => {
      evt.preventDefault();

      this._changeFilmData({isWatched: !this._film.isWatched});
    });

    this._filmDetails.onFavoriteClick((evt) => {
      evt.preventDefault();

      this._changeFilmData({isFavorite: !this._film.isFavorite});
    });

    this._filmDetails.onCommentDeleteClick((evt) => {
      evt.preventDefault();

      const deletedCommentId = evt.target.closest(`.film-details__comment`).dataset.id;
      const index = this._film.comments.findIndex((it) => it.id === deletedCommentId);

      const comment = this._film.comments[index];
      this._onDataChange(this, this._film, new Comment(comment.comment, comment.emotion, comment.id), true);
    });

    this._filmDetails.onRatingClick((evt) => {
      if (evt.target.classList.contains(`film-details__user-rating-label`)) {
        evt.preventDefault();

        const input = evt.currentTarget.querySelector(`#${evt.target.getAttribute(`for`)}`);

        if (!input.hasAttribute(`disabled`)) {
          evt.target.style.opacity = Styles.PENDING_OPACITY;
          this.toggleFormState(`film-details__user-rating-wrap`, `button, input`);
          this._changeFilmData({personalRating: parseInt(input.value, 10)})
            .catch(() => {
              this.toggleFormState(`film-details__user-rating-wrap`, `button, input`);
              this.shakeRatingForm(evt.target);
              evt.target.style.opacity = ``;
            });
        }
      }
    });

    this._filmDetails.onKeydown((evt) => {
      if (isEscPressed(evt)) {
        this._filmDetails.hide();
      }

      if (isSubmitPressed(evt)) {
        const commentInput = this._filmDetails.getElement().querySelector(`.film-details__comment-input`);

        if (document.activeElement === commentInput && commentInput.value && this._filmDetails.emotion) {
          this.toggleFormState(`film-details__new-comment`, `input, textarea`);
          this._onDataChange(this, this._film, new Comment(commentInput.value, this._filmDetails.emotion))
            .catch(() => {
              this.toggleFormState(`film-details__new-comment`, `input, textarea`);
              this.shakeCommentForm();
            });
        }
      }
    });
  }
}
