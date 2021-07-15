import {showPopup} from './popup.js';

const picturesTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesList = document.querySelector('.pictures');

const renderPicture = (picture) => {
  const pictureItem = picturesTemplate.cloneNode(true);
  pictureItem.querySelector('.picture__img').src = picture.url;
  pictureItem.querySelector('.picture__comments').textContent = picture.comments.length;
  pictureItem.querySelector('.picture__likes').textContent = picture.likes;
  pictureItem.addEventListener('click', (evt) => {
    evt.preventDefault();
    showPopup(picture);
  });

  return pictureItem;
};

const removePictures = () => {
  picturesList.querySelectorAll('.picture').forEach((item) => item.remove());
};

const renderPictures = (pictures) => {
  const similarPicturesFragment = document.createDocumentFragment();
  removePictures();
  pictures.forEach((item) => {
    similarPicturesFragment.appendChild(renderPicture(item));
  });
  picturesList.appendChild(similarPicturesFragment);
};

export {renderPictures};
