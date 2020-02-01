import Api from './api/index';
import Store from './api/store';
import Provider from './api/provider';
import UserRankController from './controllers/user-rank';
import FilterController from './controllers/filter';
import SortComponent from './components/sort';
import FilmsComponent from './components/films';
import FilmsListComponent from './components/films-list';
import FilmListTitleController from './controllers/film-list-title';
import StatsController from './controllers/stats';
import MoviesModel from './models/movies';
import PageController from './controllers/page';
import {RenderPosition, render} from './utils/render';
import {statsPeriods} from './const';


const STORE_MOVIES_NAME = `cinemaddict-movies-localstorage-v1`;
const STORE_COMMENTS_NAME = `cinemaddict-comments-localstorage-v1`;
const AUTHORIZATION = `Basic mJ7UKvlNLEru54N`;
const END_POINT = `https://htmlacademy-es-10.appspot.com/cinemaddict`;

window.addEventListener(`load`, () => {
  navigator.serviceWorker.register(`/sw.js`)
    .then(() => {
      // Действие, в случае успешной регистрации ServiceWorker
    }).catch(() => {
      // Действие, в случае ошибки при регистрации ServiceWorker
    });
});

const api = new Api(END_POINT, AUTHORIZATION);
const storeMovies = new Store(STORE_MOVIES_NAME, window.localStorage);
const storeComments = new Store(STORE_COMMENTS_NAME, window.localStorage);
const apiWithProvider = new Provider(api, storeMovies, storeComments);
const moviesModel = new MoviesModel();

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerStatisticsElement = document.querySelector(`.footer__statistics p`);

const filmsComponent = new FilmsComponent();
const sortComponent = new SortComponent();

const userRankController = new UserRankController(headerElement, moviesModel);
const pageController = new PageController(filmsComponent, sortComponent, moviesModel, apiWithProvider);
const statsController = new StatsController(mainElement, moviesModel, statsPeriods.ALL_TIME);
const filterController = new FilterController(mainElement, moviesModel, pageController, sortComponent, statsController);

userRankController.render();
filterController.render();
statsController.render();
statsController.hide();

render(mainElement, sortComponent, RenderPosition.BEFOREEND);
render(mainElement, filmsComponent, RenderPosition.BEFOREEND);

const filmsElement = mainElement.querySelector(`.films`);

render(filmsElement, new FilmsListComponent(), RenderPosition.BEFOREEND);

const filmsListElement = filmsElement.querySelector(`.films-list`);

const filmListTitleController = new FilmListTitleController(filmsListElement, moviesModel);

filmListTitleController.render();


apiWithProvider.getMovies()
  .then((movies) => {

    const commentsPromises = movies.map((movie) => {
      return apiWithProvider.getComments(movie.id).then((comments) => {
        movie.comments = comments;
      });
    });

    Promise.all(commentsPromises).then(() => {
      moviesModel.setMovies(movies);

      pageController.render();
      pageController.renderTopRatedList();
      pageController.renderMostCommentedList();

      footerStatisticsElement.textContent = `${movies.length} movies inside`;
    });
  });


window.addEventListener(`online`, () => {
  document.title = document.title.replace(` [offline]`, ``);

  if (!apiWithProvider.getSynchronize()) {
    apiWithProvider.sync()
      .then(() => {
        // Действие, в случае успешной синхронизации
      })
      .catch(() => {
        // Действие, в случае ошибки синхронизации
      });
  }
});

window.addEventListener(`offline`, () => {
  document.title += ` [offline]`;
});
