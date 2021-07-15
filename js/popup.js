import {isEscEvent} from './utils.js';
import {HIDDEN} from './image-editor.js';

const AVATAR_SIZE = 35;
const COMMENTS_STEP = 5;

const bigPicture = document.querySelector('.big-picture');
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const bigPicturelikesCount = bigPicture.querySelector('.likes-count');
const bigPictureCommentsList = bigPicture.querySelector('.social__comments');
const bigPictureCommentsCount = bigPicture.querySelector('.social__comment-count');
const bigPictureCommentsLoader = bigPicture.querySelector('.comments-loader');
const bigPictureDescription = bigPicture.querySelector('.social__caption');
const bigPictureHeader = bigPicture.querySelector('.social__header');

let commentsShown = 0;
let commentsArray = [];

const showCommentsDomElements = () => {
  bigPictureCommentsList.innerHTML = '';
  bigPictureCommentsLoader.classList.remove(HIDDEN);
  bigPictureCommentsCount.classList.remove(HIDDEN);
  bigPictureCommentsList.classList.remove(HIDDEN);
  bigPictureHeader.style.borderBottom = '1px solid #cccccc';
};

const hideCommentsDomElements = () => {
  bigPictureCommentsLoader.classList.add(HIDDEN);
  bigPictureCommentsCount.classList.add(HIDDEN);
  bigPictureCommentsList.classList.add(HIDDEN);
  bigPictureHeader.style.border = 0;
};

const clearComments = () => {
  commentsShown = 0;
  commentsArray = [];

  showCommentsDomElements();
};

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

const renderComments = () => {
  if (commentsArray.length === 0) {
    hideCommentsDomElements();
    return;
  }

  const slicedComments = commentsArray.slice(commentsShown, commentsShown + COMMENTS_STEP);
  const picturesFragment = document.createDocumentFragment();
  slicedComments.forEach((itm) => {
    picturesFragment.appendChild(createCommentItem(itm));
  });

  bigPictureCommentsList.appendChild(picturesFragment);

  bigPictureCommentsCount.textContent = `${bigPictureCommentsList.children.length} из ${commentsArray.length} комментариев`;
  if (commentsArray.length === bigPictureCommentsList.children.length) {
    bigPictureCommentsLoader.classList.add(HIDDEN);
  }

  commentsShown += COMMENTS_STEP;
};

const onBigPictureCommentsLoaderClick = () => renderComments();

const renderBigPicture = ({comments, url, likes, description}) => {
  bigPictureImg.src = url;
  bigPicturelikesCount.textContent = likes;
  bigPictureDescription.textContent = description;

  clearComments();
  commentsArray = comments;
  renderComments();
  bigPictureCommentsLoader.addEventListener('click', onBigPictureCommentsLoaderClick);
};

const closeBigPicture = () => {
  bigPicture.classList.add(HIDDEN);
  document.body.classList.remove('modal-open');
};

const onDocumentKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeBigPicture();
    document.removeEventListener('keydown', onDocumentKeydown);
  }
};

const onBigPictureCancelClick = () => {
  closeBigPicture();
  document.removeEventListener('keydown', onDocumentKeydown);
};

const openBigPicture = () => {
  bigPicture.classList.remove(HIDDEN);
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  bigPictureCancel.addEventListener('click', onBigPictureCancelClick);
};

const showPopup = (picture) => {
  renderBigPicture(picture);
  openBigPicture();
};

export {showPopup};
