export default class Movie {
  constructor(data) {
    this.id = data[`id`];
    this.title = data[`film_info`][`title`];
    this.alternativeTitle = data[`film_info`][`alternative_title`];
    this.rating = data[`film_info`][`total_rating`];
    this.poster = data[`film_info`][`poster`];
    this.ageRating = data[`film_info`][`age_rating`];
    this.director = data[`film_info`][`director`];
    this.writers = data[`film_info`][`writers`];
    this.actors = data[`film_info`][`actors`];
    this.date = data[`film_info`][`release`][`date`];
    this.country = data[`film_info`][`release`][`release_country`];
    this.duration = data[`film_info`][`runtime`];
    this.genres = data[`film_info`][`genre`];
    this.description = data[`film_info`][`description`];
    this.personalRating = data[`user_details`][`personal_rating`];
    this.isInWatchlist = data[`user_details`][`watchlist`];
    this.isWatched = data[`user_details`][`already_watched`];
    this.isFavorite = data[`user_details`][`favorite`];
    this.watchingDate = new Date(data[`user_details`][`watching_date`]);
    this.comments = [];
    this.commentIds = data[`comments`];
  }

  static toRAW(data) {
    return {
      'id': data.id,
      'comments': data.commentIds,
      'film_info': {
        'title': data.title,
        'alternative_title': data.alternativeTitle,
        'total_rating': data.rating,
        'poster': data.poster,
        'age_rating': data.ageRating,
        'director': data.director,
        'writers': data.writers,
        'actors': data.actors,
        'release': {
          'date': data.date,
          'release_country': data.country
        },
        'runtime': data.duration,
        'genre': data.genres,
        'description': data.description
      },
      'user_details': {
        'personal_rating': data.personalRating,
        'watchlist': data.isInWatchlist,
        'already_watched': data.isWatched,
        'watching_date': data.watchingDate.toISOString(),
        'favorite': data.isFavorite
      }
    };
  }

  static parseMovie(data) {
    return new Movie(data);
  }

  static parseMovieList(data) {
    return data.map((film) => new Movie(film));
  }
}
