export const getRandomNumber = (min, max) => Math.floor(Math.random() * ((max + 1) - min) + min);

export const getRandomArrayItem = (array) => array[getRandomNumber(0, array.length - 1)];

export const getRandomBoolean = () => Math.random() > 0.5;

export const formatTime = (time) => {
  const hours = time / 60 ^ 0;
  const minutes = time % 60;

  return `${hours}h ${minutes}m`;
};

const formatDateNumber = (number) => number < 10 ? `0${number}` : number;

export const formatDate = (date) => {
  const currentDate = new Date().getDate();
  const day = formatDateNumber(date.getDate());
  const hours = formatDateNumber(date.getHours());
  const minutes = formatDateNumber(date.getMinutes());

  let result = `${date.getFullYear()}/${date.getMonth()}/${day} ${hours}:${minutes}`;

  switch (true) {
    case date.getDate() === currentDate:
      result = `Today`;
      break;
    case (date.getDate() + 1) === currentDate:
      result = `Yesterday`;
      break;
    case (date.getDate() + 2) === currentDate:
      result = `2 days ago`;
      break;
  }

  return result;
};

export const createElement = (template) => {
  const element = document.createElement(`div`);
  element.innerHTML = template;

  return element.firstElementChild;
};

export const isEscPressed = (evt) => {
  return evt.key === `Escape` || evt.key === `Esc`;
};
