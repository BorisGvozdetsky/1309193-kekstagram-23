import {showPopup} from './popup.js';

const similarPicturesTemplate = document.querySelector('#picture').content.querySelector('.picture');
const similarList = document.querySelector('.pictures');

const renderPicture = (picture) => {
  const pictureElement = similarPicturesTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  pictureElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    showPopup(picture);
  });

  return pictureElement;
};

const removeAllPictures = () => {
  similarList.querySelectorAll('.picture').forEach((item) => item.remove());
};

const renderAllPictures = (pictures) => {
  const similarPicturesFragment = document.createDocumentFragment();
  removeAllPictures();
  pictures.forEach((item) => {
    similarPicturesFragment.appendChild(renderPicture(item));
  });
  similarList.appendChild(similarPicturesFragment);
};

export {renderAllPictures};
