// ******************** шаблон фильма *********************
export const createFilmCardTemplate = function (film) {
  // createRandomFilmMarkup - вызывает объект задач из createRandomFilm
  const {poster, name, rating, year, time, genre, description, comments, watched, favorite, watchlist} = film;

  return (
    `<article class="film-card" data-rating="${rating}">
    <h3 class="film-card__title">${name}</h3>
       <p class="film-card__rating">${rating}</p>
       <p class="film-card__info">
         <span class="film-card__year">${year}</span>
         <span class="film-card__duration">${time}</span>
         <span class="film-card__genre">${genre}</span>
       </p>
       <img src="./images/posters/${poster}" alt="" class="film-card__poster">
       <p class="film-card__description">
        ${description}
       </p>
       <a class="film-card__comments">${comments} comments</a>
       <form class="film-card__controls">
         <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${watchlist}">Add to watchlist</button>
         <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${watched}">Mark as watched</button>
         <button class="film-card__controls-item button film-card__controls-item--favorite ${favorite}">Mark as favorite</button>
       </form>
    </article>`
  );
};

