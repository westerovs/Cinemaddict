import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import 'chart.js/dist/Chart.min.css';
import AbstractSmartComponent from './abstract-smart-component';
import {getUserRank} from '../utils/user-rank';
import {getWatchedMoviesByPeriod, getSortedGenres} from '../utils/stats';
import {statsPeriods} from '../const';
import {
  getHoursAndMinutes,
  convertTextToKebabCase,
  convertToTextFromKebabCase
} from '../utils/common';


const createPeriodsMarkup = (activePeriod) => {
  return Object.values(statsPeriods)
    .map((period) => {
      const periodValue = convertTextToKebabCase(period);
      return `<input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-${periodValue}" value="${periodValue}" ${period === activePeriod ? `checked` : ``}>
      <label for="statistic-${periodValue}" class="statistic__filters-label">${period}</label>`;
    })
    .join(`\n`);
};

const getTotalDuration = (movies) => {
  return movies.reduce((acc, movie) => acc + movie.filmInfo.duration, 0);
};

const getTopGenre = (movies) => {
  if (!movies.length) {
    return `-`;
  }
  const sortedGenres = getSortedGenres(movies);
  const [[topGenre]] = sortedGenres;

  return topGenre;
};

const renderChart = (ctx, watchedMovies, period) => {
  const watchedMoviesByPeriod = getWatchedMoviesByPeriod(watchedMovies, period);
  const sortedGenres = new Map(getSortedGenres(watchedMoviesByPeriod));
  const labels = [...sortedGenres.keys()];
  const data = [...sortedGenres.values()];

  return new Chart(ctx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels,
      datasets: [{
        data,
        label: `watched movies`,
        backgroundColor: `#ffe800`,
      }]
    },
    options: {
      plugins: {
        datalabels: {
          anchor: `start`,
          align: `start`,
          offset: 40,
          color: `#ffffff`,
          font: {
            size: 18,
          },
        }
      },
      legend: {
        display: false,
      },
      scales: {
        xAxes: [{
          gridLines: {
            display: false,
          },
          ticks: {
            display: false,
            beginAtZero: true,
          },
        }],
        yAxes: [{
          gridLines: {
            display: false,
          },
          ticks: {
            padding: 100,
            fontSize: 18,
            fontColor: `#ffffff`,
            beginAtZero: true,
          },
        }]
      },
    }
  });
};


const createStatsTemplate = (watchedMovies, period) => {
  const {userRank} = getUserRank(watchedMovies);

  const watchedMoviesByPeriod = getWatchedMoviesByPeriod(watchedMovies, period);

  const watchedMoviesCount = watchedMoviesByPeriod.length;
  const {hours, minutes} = getHoursAndMinutes(getTotalDuration(watchedMoviesByPeriod));
  const topGenre = getTopGenre(watchedMoviesByPeriod);

  return `<section class="statistic">
    <p class="statistic__rank">
      Your rank
      <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      <span class="statistic__rank-label">${userRank}</span>
    </p>

    <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
      <p class="statistic__filters-description">Show stats:</p>
      ${createPeriodsMarkup(period)}
    </form>

    <ul class="statistic__text-list">
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">You watched</h4>
        <p class="statistic__item-text">${watchedMoviesCount} <span class="statistic__item-description">movies</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Total duration</h4>
        <p class="statistic__item-text">${hours} <span class="statistic__item-description">h</span> ${minutes} <span class="statistic__item-description">m</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Top genre</h4>
        <p class="statistic__item-text">${topGenre}</p>
      </li>
    </ul>

    <div class="statistic__chart-wrap">
      <canvas class="statistic__chart" width="1000"></canvas>
    </div>

  </section>`;
};


export default class Stats extends AbstractSmartComponent {
  constructor(watchedWovies, period) {
    super();
    this._watchedWovies = watchedWovies;
    this._period = period;

    this._chart = null;

    this._subscribeOnEvents();
    this._renderChart();
  }

  getTemplate() {
    return createStatsTemplate(this._watchedWovies, this._period);
  }

  recoveryListeners() {
    this._subscribeOnEvents();
  }

  rerender(watchedWovies, period) {
    this._watchedWovies = watchedWovies;
    this._period = period;

    super.rerender();

    this._renderChart();
  }

  _subscribeOnEvents() {
    const element = this.getElement();

    element.querySelector(`.statistic__filters`)
      .addEventListener(`change`, (evt) => {
        evt.preventDefault();
        const periodValue = evt.target.value;
        const period = convertToTextFromKebabCase(periodValue);
        this._period = period;
        this.rerender(this._watchedWovies, this._period);
      });
  }

  _renderChart() {
    const element = this.getElement();

    const ctx = element.querySelector(`.statistic__chart`);

    this._resetChart();

    this._chart = renderChart(ctx, this._watchedWovies, this._period);
  }

  _resetChart() {
    if (this._chart) {
      this._chart.destroy();
      this._chart = null;
    }
  }
}
