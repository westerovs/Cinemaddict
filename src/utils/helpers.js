import {Films, userRanks} from "./const";
import moment from "moment";

export const checkForActiveState = (target) => {
  const isActive = target.classList.contains(`main-navigation__item--active`);
  const isMenuItem = target.classList.contains(`main-navigation__item`) || target.classList.contains(`main-navigation__item-count`);

  if (isMenuItem && !isActive) {
    target.closest(`.main-navigation`).querySelector(`.main-navigation__item--active`).classList.remove(`main-navigation__item--active`);

    if (target.classList.contains(`main-navigation__item`)) {
      target.classList.add(`main-navigation__item--active`);
    } else {
      target.parentNode.classList.add(`main-navigation__item--active`);
    }

    return true;
  }

  return false;
};

export const getRandomNumber = (min, max) => Math.floor(Math.random() * ((max + 1) - min) + min);

export const getRandomArrayItem = (array) => array[getRandomNumber(0, array.length - 1)];

export const getRandomBoolean = () => Math.random() > 0.5;

export const formatTime = (time, forStats = false) => {
  const spanWrap = (x) => `<span class="statistic__item-description">${x}</span>`;
  const hours = time / 60 ^ 0;
  const minutes = time % 60;

  return `${hours}${!forStats ? `h` : spanWrap(`h`)} ${minutes}${!forStats ? `m` : spanWrap(`m`)}`;
};

export const getUserRank = (watchedAmount) => {
  let userRank = ``;

  userRanks.forEach((rank) => {
    if (watchedAmount >= rank.min && watchedAmount <= rank.max) {
      userRank = rank.title;
    }
  });

  return userRank;
};

export const getYear = (date) => {
  return moment(date).format(`YYYY`);
};

export const getCommentDate = (date) => {
  let result = moment(date).format(`YYYY/MM/DD HH:mm`);

  switch (true) {
    case moment(date).isBetween(moment().subtract(59, `seconds`), moment()):
      result = `now`;
      break;
    case moment(date).isBetween(moment().subtract(3, `minutes`), moment()):
      result = `a minute ago`;
      break;
    case moment(date).isBetween(moment().subtract(59, `minutes`), moment()):
      result = `a few minutes ago`;
      break;
    case moment(date).isBetween(moment().subtract(2, `hours`), moment()):
      result = `an hour ago`;
      break;
    case moment(date).isBetween(moment().subtract(24, `hours`), moment()):
      result = `a few hours ago`;
      break;
    case moment(date).isBetween(moment().subtract(1, `days`), moment()):
      result = `a day ago`;
      break;
    case moment(date).isBetween(moment().subtract(2, `days`), moment()):
      result = `two days ago`;
      break;
    case moment(date).isBetween(moment().subtract(3, `days`), moment()):
      result = `three days ago`;
      break;
  }

  return result;
};

export const getReleaseDate = (date) => {
  return moment(date).format(`DD MMMM YYYY`);
};

export const createElement = (template) => {
  const element = document.createElement(`div`);
  element.innerHTML = template;

  return element.firstElementChild;
};

export const isEscPressed = (evt) => {
  return evt.key === `Escape` || evt.key === `Esc`;
};

export const isSubmitPressed = (evt) => {
  return evt.ctrlKey && (evt.key === `Enter`);
};

export const getFilmsToLoadAmount = (renderedAmount) => {
  if (renderedAmount) {
    let result = renderedAmount;

    for (let i = 0; i < result % Films.INITIAL_AMOUNT; i++) {
      result++;
    }

    return result;
  }

  return Films.INITIAL_AMOUNT;
};

export const setDocumentTitle = (title) => {
  const currentTitle = document.title.indexOf(`[`) ? document.title.split(`[`)[0] : document.title;
  document.title = `${currentTitle} ${title}`;
};
