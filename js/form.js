import {isEscEvent} from './utils.js';

const HASHTAGS_COUNT = 5;
const HASHTAGS_CHECK = /^#[A-Za-zА-Яа-я0-9]{1,19}$/;

const uploadForm = document.querySelector('.img-upload__form');
const uploadFile = uploadForm.querySelector('#upload-file');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const closeUploadForm = uploadForm.querySelector('.img-upload__cancel');
const hashtagsInput = uploadForm.querySelector('.text__hashtags');
const textComment = uploadForm.querySelector('.text__description');

const isActiveElement = () => document.activeElement === hashtagsInput || document.activeElement === textComment;

const onHashtagsInput = () => {
  const hashTagsCollection = hashtagsInput.value.toLowerCase().split(' ').sort();
  hashTagsCollection.forEach((elem) => {
    if (hashTagsCollection.length > HASHTAGS_COUNT) {
      hashtagsInput.setCustomValidity(`нельзя указать больше ${HASHTAGS_COUNT} хэш-тегов`);
    } else if (!HASHTAGS_CHECK.test(elem)) {
      hashtagsInput.setCustomValidity('Хэш-тег должен начинаться с символа # (решётка) и состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.');
    } else {
      hashtagsInput.setCustomValidity('');
    }
  });
  hashTagsCollection.forEach((item, idx) => {
    if (hashTagsCollection[idx] === hashTagsCollection[idx + 1]) {
      return hashtagsInput.setCustomValidity('Один и тот же хэштег не может быть использован дважды');
    }
  });
  hashtagsInput.reportValidity();
};

const closeFormImg = () => {
  uploadForm.reset();
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

const onDocumentKeydown = (evt) => {
  if (isEscEvent(evt) && !isActiveElement()) {
    evt.preventDefault();
    closeFormImg();
    document.removeEventListener('keydown', onDocumentKeydown);
  }
};

const openFormImg = () => {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

uploadFile.addEventListener('change', () => {
  openFormImg();
});

closeUploadForm.addEventListener('click', () => {
  closeFormImg();
});

hashtagsInput.addEventListener('input', onHashtagsInput);
