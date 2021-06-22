import {pictureClickHandler} from './popup.js';

const similarPicturesTemplate = document.querySelector('#picture').content.querySelector('.picture');
const similarListElement = document.querySelector('.pictures');

const renderPicture = (data) => {
  const pictureElement = similarPicturesTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = data.url;
  pictureElement.querySelector('.picture__comments').textContent = data.comments.length;
  pictureElement.querySelector('.picture__likes').textContent = data.likes;
  pictureElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    pictureClickHandler(data);
  });

  return pictureElement;
};

const renderAllPictures = (pictures) => {
  const similarPicturesFragment = document.createDocumentFragment();
  pictures.forEach((item) => {
    similarPicturesFragment.appendChild(renderPicture(item));
  });
  similarListElement.appendChild(similarPicturesFragment);
};

export {renderAllPictures};
