import {createElement} from '../utils.js';


// поп-арт - закоментировал тут и в main.js, т.к он контент закрывает
const createPopupFilmlTemplate = (film) => {
  const {original, poster, name, rating, time, watched, favorite, watchlist, age, director, writers, actors, release, countrynames, ganrePop, fullDescription} = film;
  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="./images/posters/${poster}" alt="">

              <p class="film-details__age">${age}+</p>
            </div>

            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${name}</h3>
                  <p class="film-details__title-original">Original: ${original}</p>
                </div>

                <div class="film-details__rating">
                  <p class="film-details__total-rating">${rating}</p>
                </div>
              </div>

              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${director}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${writers}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${actors}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${release}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${time}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${countrynames}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Genres</td>
                  <td class="film-details__cell">
                    <span class="film-details__genre">${ganrePop}</span>
                  </td>
                </tr>
              </table>

              <p class="film-details__film-description">
                ${fullDescription}
              </p>
            </div>
          </div>

          <section class="film-details__controls">
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist">
            <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist ${watchlist}">Add to watchlist</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched">
            <label for="watched" class="film-details__control-label film-details__control-label--watched ${watched}">Already watched</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite">
            <label for="favorite" class="film-details__control-label film-details__control-label--favorite ${favorite}">Add to favorites</label>
          </section>
        </div>
        <div class="form-details__bottom-container">
          <!-- комментарии -->
        </div>
      </form>
    </section>`
  );
};

export default class PopupFilmlComponent {
  constructor(film) {
    this._film = film;
    this._element = null;
  }

  getTemplate() {
    return createPopupFilmlTemplate(this._film);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
      // this._element.querySelector(`.film-details__close-btn`).onclick = () => {
      //   this.removeElement();
      // };
    }

    return this._element;
  }

  removeElement() {
    this._element.remove();
    this._element = null;
  }
}
