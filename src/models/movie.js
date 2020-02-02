export default class Movie {
  constructor(parameter) {
    this.id = parameter[`id`];
    this.commentsId = parameter[`comments`];

    this.filmInfo = {};
    this.filmInfo.title = parameter[`film_info`][`title`];
    this.filmInfo.alternativeTitle = parameter[`film_info`][`alternative_title`];
    this.filmInfo.totalRating = parameter[`film_info`][`total_rating`];
    this.filmInfo.poster = parameter[`film_info`][`poster`];
    this.filmInfo.ageRating = parameter[`film_info`][`age_rating`];
    this.filmInfo.director = parameter[`film_info`][`director`];
    this.filmInfo.writers = parameter[`film_info`][`writers`];
    this.filmInfo.actors = parameter[`film_info`][`actors`];
    this.filmInfo.releaseDate = parameter[`film_info`][`release`][`date`];
    this.filmInfo.releaseCountry = parameter[`film_info`][`release`][`release_country`];
    this.filmInfo.duration = parameter[`film_info`][`runtime`];
    this.filmInfo.genres = parameter[`film_info`][`genre`];
    this.filmInfo.description = parameter[`film_info`][`description`];

    this.userRating = parameter[`user_details`][`personal_rating`];
    this.isInWatchlist = parameter[`user_details`][`watchlist`];
    this.isWatched = parameter[`user_details`][`already_watched`];
    this.watchingDate = parameter[`user_details`][`watching_date`] ? new Date(parameter[`user_details`][`watching_date`]) : null;
    this.isFavorite = parameter[`user_details`][`favorite`];
  }

  toRAW() {
    return {
      'id': this.id,
      'comments': this.commentsId,
      'film_info': {
        'title': this.filmInfo.title,
        'alternative_title': this.filmInfo.alternativeTitle,
        'total_rating': this.filmInfo.totalRating,
        'poster': this.filmInfo.poster,
        'age_rating': this.filmInfo.ageRating,
        'director': this.filmInfo.director,
        'writers': this.filmInfo.writers,
        'actors': this.filmInfo.actors,
        'release': {
          'date': this.filmInfo.releaseDate,
          'release_country': this.filmInfo.releaseCountry,
        },
        'runtime': this.filmInfo.duration,
        'genre': this.filmInfo.genres,
        'description': this.filmInfo.description,
      },
      'user_details': {
        'personal_rating': this.userRating,
        'watchlist': this.isInWatchlist,
        'already_watched': this.isWatched,
        'watching_date': this.watchingDate ? this.watchingDate.toISOString() : 0,
        'favorite': this.isFavorite,
      }
    };
  }

  static parseMovie(parameter) {
    return new Movie(parameter);
  }

  static parseMovies(parameter) {
    return parameter.map(Movie.parseMovie);
  }

  static clone(parameter) {
    return new Movie(parameter.toRAW());
  }
}
