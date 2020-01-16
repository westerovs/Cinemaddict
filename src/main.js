import FilterComponent from './components/filter.js';
import ProfileRatingComponent from "./components/profile-rating";
import {generateFilters} from "./mock/filters";
import {createRandomFilms} from "./mock/film";
import {getRandomNumber} from "./utils/helpers";
import {render, RenderPosition} from "./utils/render";
import {Films} from "./utils/const";
import PageController from "./controllers/PageController";

// Генерация случайных фильмов
const filmList = createRandomFilms(Films.TOTAL_AMOUNT);

// Рендер меню и контент-блока
const mainContainer = document.querySelector(`.main`);
const headerContainer = document.querySelector(`.header`);

render(headerContainer, new ProfileRatingComponent(getRandomNumber(0, 30)));

// Рендер фильтров
const filters = generateFilters(filmList);
render(mainContainer, new FilterComponent(filters), RenderPosition.AFTERBEGIN);

const page = new PageController(mainContainer);
page.render(filmList);
