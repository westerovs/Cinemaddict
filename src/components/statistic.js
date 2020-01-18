import Component from "./component";
import Chart from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {formatTime, getUserRank} from "../utils/helpers";
import moment from "moment";

export default class Statistic extends Component {
  constructor(moviesModel) {
    super();
    this._moviesModel = moviesModel;
    this._filmList = this._moviesModel.filmListDefault;
    this._genres = this._getGenresData(this._filmList);
    this._chart = this.renderChart();

    this._subscribeOnEvents();
  }

  _getGenresData(filmList) {
    const genres = [];
    const genresData = new Map();

    filmList.map((film) => film.genres.forEach((it) => genres.push(it)));

    genres.forEach((it) => {
      if (genresData.has(it)) {
        const value = genresData.get(it);
        genresData.set(it, value + 1);
      } else {
        genresData.set(it, 1);
      }
    });

    return genresData;
  }

  updateComponent(data) {
    this._filmList = data;
    this._genres = this._getGenresData(this._filmList);
    this.rerender();
    this._chart = this.renderChart();
  }

  renderChart() {
    this.destroyChart();

    const BAR_HEIGHT = 50;
    const BAR_COLOR = `#ffe800`;
    const LABEL_PADDING = 80;
    const LABEL_COLOR = `#fff`;
    const LABEL_FONT_SIZE = 15;

    const ctx = this.getElement().querySelector(`.statistic__chart`);
    const sortedGenresData = new Map([...this._genres].sort((a, b) => b[1] - a[1]));

    const genresLabels = [...sortedGenresData.keys()];
    const genresValues = [...sortedGenresData.values()];

    ctx.height = BAR_HEIGHT * genresLabels.length;

    if (!genresLabels.length) {
      return false;
    }

    return new Chart(ctx, {
      type: `horizontalBar`,
      data: {
        labels: genresLabels,
        datasets: [{
          data: genresValues,
          backgroundColor: BAR_COLOR,
          categoryPercentage: 0.5,
          barPercentage: 1
        }]
      },
      options: {
        scales: {
          xAxes: [{
            display: false,
            ticks: {
              beginAtZero: true
            }
          }],
          yAxes: [{
            ticks: {
              padding: LABEL_PADDING,
              fontColor: LABEL_COLOR,
              fontSize: LABEL_FONT_SIZE
            }
          }]
        },
        plugins: {
          datalabels: {
            color: LABEL_COLOR,
            font: {
              size: LABEL_FONT_SIZE
            },
            anchor: `start`,
            align: `left`,
            offset: 40,
          }
        },
        legend: {
          display: false
        }
      },
      plugins: [ChartDataLabels]
    });
  }

  destroyChart() {
    if (this.getElement().querySelector(`.statistic__chart`).innerHTML) {
      this.getElement().querySelector(`.statistic__chart`).innerHTML = ``;
    }
  }

  getTemplate() {
    return `<section class="statistic">
    <p class="statistic__rank">
      Your rank
      <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      <span class="statistic__rank-label">${getUserRank(this._moviesModel.filmListDefault.filter((film) => film.isWatched).length)}</span>
    </p>

    <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
      <p class="statistic__filters-description">Show stats:</p>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" checked>
      <label for="statistic-all-time" class="statistic__filters-label">All time</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today">
      <label for="statistic-today" class="statistic__filters-label">Today</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week">
      <label for="statistic-week" class="statistic__filters-label">Week</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month">
      <label for="statistic-month" class="statistic__filters-label">Month</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year">
      <label for="statistic-year" class="statistic__filters-label">Year</label>
    </form>

    ${this.getStatisticTextTemplate()}

    ${this.getStatisticChartTemplate()}

  </section>`;
  }

  getStatisticTextTemplate() {
    const totalDuration = this._filmList.map((film) => film.duration)
      .reduce((acc, cur) => acc + cur, 0);
    const sortedGenresData = new Map([...this._genres].sort((a, b) => b[1] - a[1]));

    return `<ul class="statistic__text-list">
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">You watched</h4>
        <p class="statistic__item-text">${this._filmList.length} <span class="statistic__item-description">movies</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Total duration</h4>
        <p class="statistic__item-text">${totalDuration ? formatTime(totalDuration, true) : `0`}</p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Top genre</h4>
        <p class="statistic__item-text">${sortedGenresData ? sortedGenresData.keys().next().value : `-`}</p>
      </li>
    </ul>`;
  }

  getStatisticChartTemplate() {
    return `<div class="statistic__chart-wrap">
      <canvas class="statistic__chart" width="1000"></canvas>
    </div>`;
  }

  rerender() {
    this.getElement().querySelector(`.statistic__text-list`).outerHTML = this.getStatisticTextTemplate();
    this.getElement().querySelector(`.statistic__chart-wrap`).outerHTML = this.getStatisticChartTemplate();
  }

  _subscribeOnEvents() {
    this.getElement().querySelector(`.statistic__filters`).addEventListener(`click`, (evt) => {
      if (evt.target.classList.contains(`statistic__filters-label`)) {
        let data;

        switch (evt.target.getAttribute(`for`)) {
          case `statistic-all-time`:
            this.updateComponent(this._moviesModel.filmListDefault);
            break;
          case `statistic-today`:
            data = this._moviesModel.filmListDefault.filter((film) => moment(film.watchingDate).isSame(moment(), `day`));
            this.updateComponent(data);
            break;
          case `statistic-week`:
            data = this._moviesModel.filmListDefault.filter((film) => moment(film.watchingDate) >= moment().subtract(7, `days`));
            this.updateComponent(data);
            break;
          case `statistic-month`:
            data = this._moviesModel.filmListDefault.filter((film) => moment(film.watchingDate) >= moment().subtract(1, `months`));
            this.updateComponent(data);
            break;
          case `statistic-year`:
            data = this._moviesModel.filmListDefault.filter((film) => moment(film.watchingDate) >= moment().subtract(1, `years`));
            this.updateComponent(data);
            break;
        }
      }
    });
  }
}
