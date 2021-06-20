import {isEscEvent} from './utils.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const bigPicturelikes = bigPicture.querySelector('.likes-count');
const bigPictureComments = bigPicture.querySelector('.comments-count');
const bigPictureCommentsText = bigPicture.querySelector('.social__comments');
const bigPictureCommentsCount = bigPicture.querySelector('.social__comment-count');
const bigPictureCommentsLoader = bigPicture.querySelector('.comments-loader');
const bigPictureDescription = bigPicture.querySelector('.social__caption');

const commentItemImgSize = {
  WIDTH: 35,
  HEIGHT: 35,
};

const createCommentItem = ({avatar, name, message}) => {
  const commentItem = document.createElement('li');
  const commentItemImg = document.createElement('img');
  const commentItemText = document.createElement('p');

  commentItem.classList.add('social__comment');
  commentItemImg.classList.add('social__picture');
  commentItemImg.width = commentItemImgSize.WIDTH;
  commentItemImg.height = commentItemImgSize.HEIGHT;
  commentItemImg.src = avatar;
  commentItemImg.alt = name;
  commentItemText.classList.add('social__text');
  commentItemText.textContent = message;

  commentItem.appendChild(commentItemImg);
  commentItem.appendChild(commentItemText);

  return commentItem;
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

const onDocumentKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeBigPicture();
    document.removeEventListener('keydown', onDocumentKeydown);
  }
};

const openBigPicture = () => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const renderBigPicture = ({comments, url, likes, description}) => {
  bigPictureImg.src = url;
  bigPicturelikes.textContent = likes;
  bigPictureComments.textContent = comments.length;
  bigPictureDescription.textContent = description;

  bigPictureCommentsText.innerHTML = '';
  comments.forEach((itm) => {
    bigPictureCommentsText.appendChild(createCommentItem(itm));
  });
  bigPictureCommentsCount.classList.add('hidden');
  bigPictureCommentsLoader.classList.add('hidden');
};

const addPicturesClickHandlers = (pictureElements) => {
  const pictures = document.querySelectorAll('.picture');
  pictures.forEach((item, index) => {
    item.addEventListener('click', (evt) => {
      evt.preventDefault();
      renderBigPicture(pictureElements[index]);
      openBigPicture();
      bigPictureCancel.addEventListener('click', () => {
        closeBigPicture();
        document.removeEventListener('keydown', onDocumentKeydown);
      });
    });
  });
};

export {addPicturesClickHandlers};
