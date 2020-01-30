import moment from 'moment';

const MINUTES_IN_HOUR = 60;
/* Наименьшее двузначное число */
const DOUBLE_DIGIT = 10;

/* Добавляет 0 в начало значения, если оно меньше 10 */
const castMinutesFormat = (value) => value < DOUBLE_DIGIT ? `0${value}` : String(value);

/* Переводит минуты в часы и минуты */
const formatDuration = (duration) => {
  const hours = Math.floor(duration / MINUTES_IN_HOUR);
  const minutes = castMinutesFormat(duration - hours * MINUTES_IN_HOUR);

  return hours ? `${hours}h ${minutes}m` : `${minutes}m`;
};

/* Возвращает отформатированную дату релиза фильма */
const formatDate = (date, full) => {
  if (full === `comment`) {
    return moment(date).format(`YYYY/MM/DD HH:MM`);
  }
  return full ? moment(date).format(`DD MMMM YYYY`) : moment(date).format(`YYYY`);
};

export {formatDuration, formatDate};
