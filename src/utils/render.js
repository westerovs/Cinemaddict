export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

export const render = (container, component, place = RenderPosition.BEFOREEND) => {
  if (place === RenderPosition.AFTERBEGIN) {
    container.prepend(component.getElement());
    return;
  }

  container.append(component.getElement());
};

export const remove = (component) => {
  component.getElement().remove();
};

export const replace = (newComponent, oldComponent) => {
  const parent = oldComponent.getElement().parentNode;

  if (parent.contains(oldComponent.getElement())) {
    parent.replaceChild(newComponent.getElement(), oldComponent.getElement());
  }
};
