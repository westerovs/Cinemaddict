// флаг
let flag = true;

export function getSort(arr, data, place) {
  let sorting = [...arr];
  if (flag) {
    sorting.sort((a, b) => {
      return a.getAttribute(data) - b.getAttribute(data);
    });
    let getStrings = ``;
    for (let item of sorting) {
      getStrings += item.outerHTML;
    }
    place.innerHTML = getStrings;
    flag = false;
  } else {
    sorting.sort((a, b) => {
      return b.getAttribute(data) - a.getAttribute(data);
    });
    let getStrings = ``;
    for (let item of sorting) {
      getStrings += item.outerHTML;
    }
    place.innerHTML = getStrings;
    flag = true;
  }
}
