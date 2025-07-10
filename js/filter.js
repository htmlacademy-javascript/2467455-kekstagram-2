// filter.js
import { renderThumbnails } from './render.js';
import { debounce } from './util.js';

const RANDOM_IMAGES_COUNT = 10;
const filterContainer = document.querySelector('.img-filters');
const filterForm = filterContainer.querySelector('.img-filters__form');
const filterButtons = Array.from(filterForm.querySelectorAll('.img-filters__button'));

let photosData = [];

const getRandomPhotos = (arr) => {
  const shuffled = arr.slice().sort(() => Math.random() - 0.5);
  return shuffled.slice(0, RANDOM_IMAGES_COUNT);
};

const getDiscussedPhotos = (arr) =>
  arr.slice().sort((a, b) => b.comments.length - a.comments.length);

const applyFilter = (filterId) => {
  let filtered = [];
  switch (filterId) {
    case 'filter-random':
      filtered = getRandomPhotos(photosData);
      break;
    case 'filter-discussed':
      filtered = getDiscussedPhotos(photosData);
      break;
    default:
      filtered = photosData.slice();
  }

  renderThumbnails(filtered);
};

const debouncedApplyFilter = debounce(applyFilter);

const onFilterClick = (evt) => {
  const btn = evt.target;
  if (!btn.classList.contains('img-filters__button')) {
    return;
  }

  filterButtons.forEach((button) =>
    button.classList.remove('img-filters__button--active')
  );
  btn.classList.add('img-filters__button--active');

  debouncedApplyFilter(btn.id);
};

const initFilters = (photos) => {
  photosData = photos.slice();

  filterContainer.classList.remove('img-filters--inactive');
  filterForm.addEventListener('click', onFilterClick);
};

export { initFilters };
