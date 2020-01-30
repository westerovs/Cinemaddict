export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};


export const escKeycode = (evt) => {
  const ESC_KEYCODE = 27;
  return evt.keyCode === ESC_KEYCODE;
};
