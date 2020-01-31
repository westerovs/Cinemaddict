// ----------- Components
import ProfileComponent from './components/profile.js';
import FilterNavComponent from './components/filter-nav.js';
// outher
import {createRandomFilms} from './mock/generate-film.js';
import FilmListComponent from './components/film-list.js';
import PageControllerComponent from './controllers/page-controller.js';
import {render, RenderPosition, remove} from './utils/render.js';


export const FILMS_MAX_COUNT = 13;


// ----------- массив с фильмами
const films = createRandomFilms(FILMS_MAX_COUNT);
// количество всех фильмов


// ----------- Get mains container
export const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = document.querySelector(`.header`);


const filmsListComponent = new FilmListComponent();


// ----------- render
render(siteHeaderElement, new ProfileComponent());
render(siteMainElement, new FilterNavComponent(films));
render(siteMainElement, filmsListComponent);


const pageControllerComponent = new PageControllerComponent(filmsListComponent);
pageControllerComponent.render(films);
