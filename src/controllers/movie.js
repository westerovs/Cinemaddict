import he from 'he';
import FilmCardComponent from './../components/film-card';
import FilmDetailsComponent from './../components/film-details';
import MovieModel from '../models/movie';
import CommentModel from '../models/comment';
import {RenderPosition, render, replace, remove} from './../utils/render';


const SHAKE_ANIMATION_TIMEOUT = 600;
const ERROR_COLOR = `red`;

export const Mode = {
  DEFAULT: `default`,
  DETAILS: `details`,
};

export default class MovieController {
  constructor(cardContainer, detailsContainer, onDataChange, onViewChange, api) {
    this._cardContainer = cardContainer;
    this._detailsContainer = detailsContainer;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._api = api;

    this._mode = Mode.DEFAULT;

    this._movieCardComponent = null;
    this._movieDetailsComponent = null;
  }

  render(movie) {
    const oldMovieCardComponent = this._movieCardComponent;
    const oldMovieDetailsComponent = this._movieDetailsComponent;

    this._movieCardComponent = new FilmCardComponent(movie);
    this._movieDetailsComponent = new FilmDetailsComponent(movie);

    const onEscKeyDown = (evt) => {
      const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

      if (isEscKey) {
        closeMovieDetails(evt);
      }
    };

    const openMovieDetails = (evt) => {
      evt.preventDefault();
      this._onViewChange();

      render(this._detailsContainer, this._movieDetailsComponent, RenderPosition.BEFOREEND);

      this._mode = Mode.DETAILS;

      document.addEventListener(`keydown`, onEscKeyDown);
    };

    const closeMovieDetails = (evt) => {
      evt.preventDefault();

      remove(this._movieDetailsComponent);

      this._movieDetailsComponent.recoveryListeners();
      this._mode = Mode.DEFAULT;

      document.removeEventListener(`keydown`, onEscKeyDown);
    };

    this._movieCardComponent.setFilmPosterClickHandler(openMovieDetails);
    this._movieCardComponent.setFilmTitleClickHandler(openMovieDetails);
    this._movieCardComponent.setFilmCommentsClickHandler(openMovieDetails);

    const watchlistItemClickHandler = (evt) => {
      evt.preventDefault();
      evt.target.disabled = true;
      const newMovie = MovieModel.clone(movie);
      newMovie.isInWatchlist = !newMovie.isInWatchlist;

      return this._onDataChange(this, movie, newMovie);
    };

    const watchedItemClickHandler = (evt) => {
      evt.preventDefault();
      evt.target.disabled = true;
      const newMovie = MovieModel.clone(movie);
      newMovie.isWatched = !newMovie.isWatched;
      if (newMovie.isWatched) {
        newMovie.watchingDate = new Date();
      }
      if (!newMovie.isWatched) {
        newMovie.userRating = 0;
      }

      return this._onDataChange(this, movie, newMovie);
    };

    const favoriteItemClickHandler = (evt) => {
      evt.preventDefault();
      evt.target.disabled = true;
      const newMovie = MovieModel.clone(movie);
      newMovie.isFavorite = !newMovie.isFavorite;

      return this._onDataChange(this, movie, newMovie);
    };

    this._movieCardComponent.setWatchlistButtonClickHandler(watchlistItemClickHandler);
    this._movieCardComponent.setWatchedButtonClickHandler(watchedItemClickHandler);
    this._movieCardComponent.setFavoriteButtonClickHandler(favoriteItemClickHandler);

    this._movieDetailsComponent.setWatchlistItemClickHandler((evt) => {
      const scrollTop = this._movieDetailsComponent.getElement().scrollTop;
      watchlistItemClickHandler(evt)
        .then(() => {
          openMovieDetails(evt);
          this._movieDetailsComponent.getElement().scrollTop = scrollTop;
        });
    });

    this._movieDetailsComponent.setWatchedItemClickHandler((evt) => {
      const scrollTop = this._movieDetailsComponent.getElement().scrollTop;
      watchedItemClickHandler(evt)
        .then(() => {
          openMovieDetails(evt);
          this._movieDetailsComponent.getElement().scrollTop = scrollTop;
        });
    });

    this._movieDetailsComponent.setFavoriteItemClickHandler((evt) => {
      const scrollTop = this._movieDetailsComponent.getElement().scrollTop;
      favoriteItemClickHandler(evt)
        .then(() => {
          openMovieDetails(evt);
          this._movieDetailsComponent.getElement().scrollTop = scrollTop;
        });
    });


    this._movieDetailsComponent.setUserRatingClickHandler((evt) => {
      const userRatingInputs = this._movieDetailsComponent.getUserRatingInputs();
      userRatingInputs.forEach((input) => {
        input.disabled = true;
      });

      const userRating = +evt.target.value;
      const newMovie = MovieModel.clone(movie);
      newMovie.userRating = userRating;

      this._onDataChange(this, movie, newMovie)
        .then(() => openMovieDetails(evt))
        .catch(() => this.shakeRatingItem(evt.target));
    });

    this._movieDetailsComponent.setUndoUserRatingClickHandler((evt) => {
      evt.target.textContent = `Undoing...`;
      const newMovie = MovieModel.clone(movie);
      newMovie.userRating = 0;

      this._onDataChange(this, movie, newMovie)
        .then(() => openMovieDetails(evt));
    });

    this._movieDetailsComponent.setDeleteCommentClickHandler((evt) => {
      evt.preventDefault();
      evt.target.disabled = true;
      evt.target.textContent = `Deleting...`;
      const commentElement = this._movieDetailsComponent.getClosestComment(evt.target);
      const commentId = commentElement.dataset.commentId;
      this._api.deleteComment(commentId)
        .then(() => MovieModel.clone(movie))
        .then((newMovie) => {
          newMovie.commentsId = newMovie.commentsId.filter((id) => id !== commentId);
          return this._onDataChange(this, movie, newMovie);
        })
        .then(() => openMovieDetails(evt));
    });

    this._movieDetailsComponent.setSubmitCommentHandler((evt) => {
      if (evt.ctrlKey && evt.keyCode === 13) {
        const emotion = this._movieDetailsComponent.emotion;
        const commentText = this._movieDetailsComponent.commentText;

        if (emotion && commentText) {
          this._movieDetailsComponent.getCommentForm().disabled = true;

          const newComment = new CommentModel({
            'comment': he.encode(commentText),
            'date': new Date(),
            'emotion': emotion,
          });

          this._api.createComment(newComment, movie.id)
            .then(() => MovieModel.clone(movie))
            .then((newMovie) => this._onDataChange(this, movie, newMovie))
            .then(() => openMovieDetails(evt))
            .catch(() => this.shakeCommentForm());
        }
      }
    });

    this._movieDetailsComponent.setCloseButtonHandler(closeMovieDetails);

    if (oldMovieCardComponent && oldMovieDetailsComponent) {
      replace(this._movieCardComponent, oldMovieCardComponent);
      replace(this._movieDetailsComponent, oldMovieDetailsComponent);
      this._removeDetailsWithoutSaving();
    } else {
      render(this._cardContainer, this._movieCardComponent, RenderPosition.BEFOREEND);
    }
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._removeDetailsWithoutSaving();
    }
  }

  shakeCommentForm() {
    const commentForm = this._movieDetailsComponent.getCommentForm();
    const currentBorderColor = commentForm.style.borderColor;

    commentForm.style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;
    commentForm.style.borderColor = ERROR_COLOR;

    setTimeout(() => {
      commentForm.style.animation = ``;
      commentForm.style.borderColor = currentBorderColor;
      commentForm.disabled = false;
      commentForm.focus();
    }, SHAKE_ANIMATION_TIMEOUT);
  }

  shakeRatingItem(element) {
    const ratingLabel = element.nextElementSibling;
    const currentItemColor = ratingLabel.style.backgroundColor;
    const userRatingInputs = this._movieDetailsComponent.getUserRatingInputs();

    ratingLabel.style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;
    ratingLabel.style.backgroundColor = ERROR_COLOR;

    setTimeout(() => {
      ratingLabel.style.animation = ``;
      ratingLabel.style.backgroundColor = currentItemColor;
      element.checked = false;
      userRatingInputs.forEach((input) => {
        input.disabled = false;
      });
    }, SHAKE_ANIMATION_TIMEOUT);
  }

  _removeDetailsWithoutSaving() {
    this._movieDetailsComponent.reset();

    remove(this._movieDetailsComponent);

    this._movieDetailsComponent.recoveryListeners();
    this._mode = Mode.DEFAULT;
  }
}
