import Component from "./component";
import Chart from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

export default class Statistic extends Component {
  constructor(moviesModel) {
    super();
    this._moviesModel = moviesModel;
    this._chart = this.renderChart();
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

  renderChart() {
    const BAR_HEIGHT = 50;
    const BAR_COLOR = `#ffe800`;
    const LABEL_PADDING = 80;
    const LABEL_COLOR = `#fff`;
    const LABEL_FONT_SIZE = 15;

    const filmList = this._moviesModel.filmListDefault;
    const ctx = this.getElement().querySelector(`.statistic__chart`);
    const genresData = this._getGenresData(filmList);

    const genresLabels = [...genresData.keys()];
    const genresValues = [...genresData.values()];

    ctx.height = BAR_HEIGHT * genresLabels.length;

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

  getTemplate() {
    return `<section class="statistic">
    <p class="statistic__rank">
      Your rank
      <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      <span class="statistic__rank-label">Sci-Fighter</span>
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

    <ul class="statistic__text-list">
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">You watched</h4>
        <p class="statistic__item-text">22 <span class="statistic__item-description">movies</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Total duration</h4>
        <p class="statistic__item-text">130 <span class="statistic__item-description">h</span> 22 <span class="statistic__item-description">m</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Top genre</h4>
        <p class="statistic__item-text">Sci-Fi</p>
      </li>
    </ul>

    <div class="statistic__chart-wrap">
      <canvas class="statistic__chart" width="1000"></canvas>
    </div>

  </section>`;
  }
}
