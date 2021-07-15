import {debounce, getRandomUniqueArrayElement} from './utils.js';
import {renderPictures} from './gallery.js';

const DEBOUNCE_DELAY = 500;
const RANDOM_MAX_COUNT = 10;

const filterGroup = document.querySelector('.img-filters');

let data;

const setFilterDefault = (pictures) => pictures;

const setFilterRandom = (pictures) => {
  const randomNumbers = getRandomUniqueArrayElement(0, pictures.length - 1, RANDOM_MAX_COUNT);
  const randomPictures = pictures.filter((picture) => randomNumbers.includes(picture.id));
  return randomPictures;
};

const setFilterDiscussed = (pictures) => {
  const discussedPictures = pictures.slice().sort((a, b) => b.comments.length - a.comments.length);
  return discussedPictures;
};

const filters = {
  'filter-default': setFilterDefault,
  'filter-random': setFilterRandom,
  'filter-discussed': setFilterDiscussed,
};

const setActiveFilter = debounce((evt) => {
  if (evt.target.matches('.img-filters__button')) {
    const activeFilterButton = evt.target;
    const activeFilterName = activeFilterButton.id;
    const filteredPictures = filters[activeFilterName](data);

    document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    activeFilterButton.classList.add('img-filters__button--active');
    renderPictures(filteredPictures);
  }
}, DEBOUNCE_DELAY);

const setFilters = (pictures) => {
  data = pictures;
  filterGroup.classList.remove('img-filters--inactive');
  filterGroup.addEventListener('click', setActiveFilter);
};

export {setFilters};

