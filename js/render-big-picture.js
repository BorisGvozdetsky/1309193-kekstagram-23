const bigPicture = document.querySelector('.big-picture');
const closeFullScreen = bigPicture.querySelector('.big-picture__cancel');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const bigPicturelikes = bigPicture.querySelector('.likes-count');
const bigPictureComments = bigPicture.querySelector('.comments-count');
const bigPictureCommentsText = bigPicture.querySelector('.social__comments');
const commentsCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
const socialCaptionText = document.querySelector('.social__caption');

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

const hideBlock = (elem, className) => {
  elem.classList.add(className);
};

const showBlock = (elem, className) => {
  elem.classList.remove(className);
};

const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

const renderBigPicture = (pictureElem) => {
  const pictures = document.querySelectorAll('.picture');
  pictures.forEach((item, index) => {
    item.addEventListener('click', (evt) => {
      evt.preventDefault();
      const similarPicturesComments = pictureElem[index].comments;
      showBlock(bigPicture, 'hidden');
      bigPictureImg.src = pictureElem[index].url;
      bigPicturelikes.textContent = pictureElem[index].likes;
      bigPictureComments.textContent = pictureElem[index].comments.length;
      bigPictureCommentsText.innerHTML = '';
      socialCaptionText.innerHTML = pictureElem[index].description;

      hideBlock(commentsCount, 'hidden');
      hideBlock(commentsLoader, 'hidden');

      similarPicturesComments.forEach((itm) => {
        bigPictureCommentsText.appendChild(createCommentItem(itm));
      });
      hideBlock(document.body, 'modal-open');
    });
  });
  closeFullScreen.addEventListener('click', () => {
    hideBlock(bigPicture, 'hidden');
    showBlock(document.body, 'modal-open');
  });

  document.addEventListener('keydown', (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      hideBlock(bigPicture, 'hidden');
    }
    showBlock(document.body, 'modal-open');
  });
};

export {renderBigPicture};
