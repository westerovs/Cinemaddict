import AbstractComponent from './abstract-component';


const getFilterHref = (filter) => {
  return `#${filter.name.split(` `)[0].toLowerCase()}`;
};

const createFilterMarkup = (filter, isActive) => {
  const {name, count} = filter;

  return `<a
    href="${getFilterHref(filter)}"
    class="main-navigation__item
    ${name === `Stats` ? `main-navigation__item--additional` : ``} ${isActive ? `main-navigation__item--active` : ``}" data-name="${name}">
    ${name} ${name === `All movies` || name === `Stats` ? `` : `<span class="main-navigation__item-count">${count}</span>`}
  </a>`;
};

const createFilterTemplate = (filters) => {
  const filtersMarkup = filters
    .map((filter) => createFilterMarkup(filter, filter.active))
    .join(`\n`);

  return `<nav class="main-navigation">${filtersMarkup}</nav>`;
};


export default class Filter extends AbstractComponent {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createFilterTemplate(this._filters);
  }

  setFilterChangeHandler(handler) {
    this.getElement().addEventListener(`click`, ({target}) => {
      if (target.className.includes(`main-navigation__item`)) {
        const linkElement = target.tagName === `A` ? target : target.parentElement;
        const filterName = linkElement.dataset.name;

        return handler(filterName);
      }

      return false;
    });
  }
}
