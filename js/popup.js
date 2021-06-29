import {isEscEvent} from './utils.js';

const AVATAR_SIZE = 35;
const COMMENTS_STEP = 5;

const bigPicture = document.querySelector('.big-picture');
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const bigPicturelikes = bigPicture.querySelector('.likes-count');
const bigPictureCommentsList = bigPicture.querySelector('.social__comments');
const bigPictureCommentsCount = bigPicture.querySelector('.social__comment-count');
const bigPictureCommentsLoader = bigPicture.querySelector('.comments-loader');
const bigPictureDescription = bigPicture.querySelector('.social__caption');
const bigPictureHeader = bigPicture.querySelector('.social__header');

let commentsStart = 0;
let commentsNext = COMMENTS_STEP;
let commentsArray = [];

const clearComments = () => {
  commentsStart = 0;
  commentsNext = COMMENTS_STEP;
  commentsArray = [];
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

const createCommentsArray = () => {
  if (commentsArray.length === 0){
    bigPictureCommentsLoader.classList.add('hidden');
    bigPictureCommentsCount.classList.add('hidden');
    bigPictureCommentsList.classList.add('hidden');
    bigPictureHeader.style.border = 0;
  } else if (commentsArray.length <= COMMENTS_STEP) {
    bigPictureCommentsLoader.classList.add('hidden');
  } else {
    bigPictureCommentsLoader.classList.remove('hidden');
    bigPictureCommentsCount.classList.remove('hidden');
    bigPictureCommentsList.classList.remove('hidden');
    bigPictureHeader.style.borderBottom = '1px solid #cccccc';
  }
  const nextComments = commentsArray.slice(commentsStart, commentsNext);
  nextComments.forEach((itm) => {
    bigPictureCommentsList.appendChild(createCommentItem(itm));
  });
  bigPictureCommentsCount.textContent = `${bigPictureCommentsList.children.length} из ${commentsArray.length} комментариев`;
  if (commentsArray.length === bigPictureCommentsList.children.length) {
    bigPictureCommentsLoader.classList.add('hidden');
  }

  commentsStart += COMMENTS_STEP;
  commentsNext += COMMENTS_STEP;
};

const onBigPictureCommentsLoaderClick = () => {
  createCommentsArray();
};

const renderBigPicture = ({comments, url, likes, description}) => {
  bigPictureImg.src = url;
  bigPicturelikes.textContent = likes;
  bigPictureDescription.textContent = description;
  bigPictureCommentsList.innerHTML = '';

  commentsArray = comments.slice();
  createCommentsArray();
  bigPictureCommentsLoader.addEventListener('click', onBigPictureCommentsLoaderClick);
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

const showPopup = (picture) => {
  clearComments();
  renderBigPicture(picture);
  openBigPicture();
};

export {showPopup};
