const similarPicturesTemplate = document.querySelector('#picture').content.querySelector('.picture');
const similarListElement = document.querySelector('.pictures');

const renderOneElement = ({url, comments, likes}) => {
  const pictureElement = similarPicturesTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  return pictureElement;
};

const renderAllElements = (pictures) => {
  const similarPicturesFragment = document.createDocumentFragment();
  pictures.forEach((item) => {
    similarPicturesFragment.appendChild(renderOneElement(item));
  });
  similarListElement.appendChild(similarPicturesFragment);
};

export {renderAllElements};
