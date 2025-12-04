import { capitalize, commaSep, qs, setData } from './utils';
import { getJson } from './dataServices.js';

export async function renderSlider(src = 'slider-home') {
  let carousel = [];
  let data = await getJson(src);
  let slider = data.images;

  let slideContainer = qs('#slider');
  // let slides = qsAll('.slide::before');
  let prevBtn = qs('#slide-arrow-prev');
  let nextBtn = qs('#slide-arrow-next');

  const slideWidth = slideContainer.clientWidth;

  // Add each slide to an array
  for (let i = 0; i < slider.length; i++) {
    carousel[i] =
      `<li id="slide-${i}" class="slide" style="--bg-image: url(${slider[i].src})">
        <img id="slide-image-${i}" class="slide-image" src="${slider[i].src}" alt="${slider[i].alt}" />
      </li>`;
  }

  let carouselHTML = carousel.join('');

  slideContainer.textContent = '';
  slideContainer.insertAdjacentHTML('afterbegin', carouselHTML);

  prevBtn.addEventListener('click', (event) => {
    slideContainer.scrollLeft -= slideWidth;
  });

  nextBtn.addEventListener('click', (event) => {
    slideContainer.scrollLeft += slideWidth;
  });
}

export async function renderDestination(data, data2) {
  setData('#planet-name', data.name);
  setData('#climate', 'Climate: ' + capitalize(data.climate));
  setData('#terrain', 'Terrain: ' + capitalize(data.terrain));
  const population = !isNaN(Number(data.population))
    ? commaSep(data.population)
    : capitalize(data.population);
  setData('#population', 'Population: ' + population);
  setData('title', `${data.name} | Destinations`);

  let titleSelector = '.description > h2';
  setData(titleSelector, data2.title);
  renderListWithTemplate(
    data2.description,
    renderPFn,
    titleSelector,
    false,
    'afterend',
  );
}

export function renderListWithTemplate(
  list,
  template,
  selector,
  clear = true,
  position = 'afterbegin',
  render = true,
) {
  let renderedList = list.map((item) => template(item));
  if (render) {
    if (clear) {
      setData(selector, renderedList.join(''));
    } else {
      qs(selector).insertAdjacentHTML(position, renderedList.join(''));
    }
  } else {
    return renderedList.join('');
  }
}

function renderPFn(data) {
  return `<p>${data}</p>`;
}
