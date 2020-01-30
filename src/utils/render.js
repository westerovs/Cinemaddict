// ----------------------- ф-ция рендер -------------------

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

// innerHTML в div вставляет разметку, превращает строку в dom узел
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


/* Удаляет элемент ???*/
// const removeComponent = (component) => {
//   component.getElement().remove();
//   component.removeElement();
// };


// // ???
// export const replace = (newComponent, oldComponent) => {
//   const parentElement = oldComponent.getElement().parentElement;
//   const newElement = newComponent.getElement();
//   const oldElement = oldComponent.getElement();

//   const isExistElements = !!(parentElement && newElement && oldElement);

//   if (isExistElements && parentElement.contains(oldElement)) {
//     parentElement.replaceChild(newElement, oldElement);
//   }
// };
