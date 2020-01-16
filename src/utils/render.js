import FilmCardComponent from "../components/film-card";
import FilmDetailsComponent from "../components/film-details";
import {isEscPressed} from "./helpers";

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

export const render = (container, component, place = RenderPosition.BEFOREEND) => {
  if (place === RenderPosition.AFTERBEGIN) {
    container.prepend(component.getElement());
    return;
  }

  container.append(component.getElement());
};

export const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};

export const renderFilms = (filmList, section) => {
  for (const film of filmList) {
    const filmCard = new FilmCardComponent(film);
    const filmDetails = new FilmDetailsComponent(film);

    filmCard.setClickHandler((evt) => {
      if (evt.target.matches(`.film-card__title`) ||
        evt.target.matches(`.film-card__poster`) ||
        evt.target.matches(`.film-card__comments`)) {
        render(section.closest(`.main`), filmDetails);

        const onEscPress = (keyEvt) => {
          if (isEscPressed(keyEvt)) {
            remove(filmDetails);
            document.removeEventListener(`keydown`, onEscPress);
          }
        };

        filmDetails.setCloseButtonHandler(() => {
          remove(filmDetails);
        });

        document.addEventListener(`keydown`, onEscPress);
      }
    });

    render(section.querySelector(`.films-list__container`), filmCard);
  }
};
