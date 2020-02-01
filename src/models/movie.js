export default class Movie {
  constructor(data) {
    this.id = data[`id`];
    this.commentsId = data[`comments`];

    this.filmInfo = {};
    this.filmInfo.title = data[`film_info`][`title`];
    this.filmInfo.alternativeTitle = data[`film_info`][`alternative_title`];
    this.filmInfo.totalRating = data[`film_info`][`total_rating`];
    this.filmInfo.poster = data[`film_info`][`poster`];
    this.filmInfo.ageRating = data[`film_info`][`age_rating`];
    this.filmInfo.director = data[`film_info`][`director`];
    this.filmInfo.writers = data[`film_info`][`writers`];
    this.filmInfo.actors = data[`film_info`][`actors`];
    this.filmInfo.releaseDate = data[`film_info`][`release`][`date`];
    this.filmInfo.releaseCountry = data[`film_info`][`release`][`release_country`];
    this.filmInfo.duration = data[`film_info`][`runtime`];
    this.filmInfo.genres = data[`film_info`][`genre`];
    this.filmInfo.description = data[`film_info`][`description`];

    this.userRating = data[`user_details`][`personal_rating`];
    this.isInWatchlist = data[`user_details`][`watchlist`];
    this.isWatched = data[`user_details`][`already_watched`];
    this.watchingDate = data[`user_details`][`watching_date`] ? new Date(data[`user_details`][`watching_date`]) : null;
    this.isFavorite = data[`user_details`][`favorite`];
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

  static parseMovie(data) {
    return new Movie(data);
  }

  static parseMovies(data) {
    return data.map(Movie.parseMovie);
  }

  static clone(data) {
    return new Movie(data.toRAW());
  }
}
