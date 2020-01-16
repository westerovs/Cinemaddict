import ProfileRatingComponent from "./components/profile-rating";
import {createRandomFilms} from "./mock/film";
import {getRandomNumber} from "./utils/helpers";
import {render} from "./utils/render";
import {Films} from "./utils/const";
import PageController from "./controllers/page";
import MoviesModel from "./models/movies";
import FilterController from "./controllers/filter";

const filmList = createRandomFilms(12);
const mainContainer = document.querySelector(`.main`);
const headerContainer = document.querySelector(`.header`);

render(headerContainer, new ProfileRatingComponent(getRandomNumber(0, 30)));

const moviesModel = new MoviesModel();
moviesModel.filmList = filmList;

const filterController = new FilterController(mainContainer, moviesModel);
filterController.render();

const page = new PageController(mainContainer, filterController, moviesModel);
page.render();
