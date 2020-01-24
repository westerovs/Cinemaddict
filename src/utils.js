// ----------------------- ф-ция рендер -------------------

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

// ф-ция через innerHTML в div вставляет нашу разметку, превращает строку в dom узел
// и возвращает DOM узел без лишней обёртки
// ф-ция нужна для того, что бы возвращать DOM узел
// т.к у нас теперь компоненты, а они не могут возвращать строкой разметку
// они должны возвращать узел
export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const render = (container, element, place = RenderPosition.BEFOREEND) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};
