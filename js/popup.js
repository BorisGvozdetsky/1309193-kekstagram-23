import {isEscEvent} from './utils.js';

const AVATAR_SIZE = 35;

const bigPicture = document.querySelector('.big-picture');
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const bigPicturelikes = bigPicture.querySelector('.likes-count');
const bigPictureComments = bigPicture.querySelector('.comments-count');
const bigPictureCommentsText = bigPicture.querySelector('.social__comments');
const bigPictureCommentsCount = bigPicture.querySelector('.social__comment-count');
const bigPictureCommentsLoader = bigPicture.querySelector('.comments-loader');
const bigPictureDescription = bigPicture.querySelector('.social__caption');

const createCommentItem = ({avatar, name, message}) => {
  const commentItem = document.createElement('li');
  const commentItemImg = document.createElement('img');
  const commentItemText = document.createElement('p');

  commentItem.classList.add('social__comment');
  commentItemImg.classList.add('social__picture');
  commentItemImg.width = AVATAR_SIZE;
  commentItemImg.height = AVATAR_SIZE;
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
  bigPictureCancel.addEventListener('click', () => {
    closeBigPicture();
    document.removeEventListener('keydown', onDocumentKeydown);
  });
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

const showPopup = (picture) => {
  renderBigPicture(picture);
  openBigPicture();
};

export {showPopup};
