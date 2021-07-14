import {isEscEvent} from './utils.js';
import {HIDDEN, resetEditor} from './image-editor.js';
import {sendData} from './api.js';
import {isInputActive, onHashtagsInput, setInputValid} from './validator.js';
import {renderMessagePopup} from './messages.js';

const UPLOAD_URL = 'https://23.javascript.pages.academy/kekstagram';
const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const uploadForm = document.querySelector('.img-upload__form');
const uploadFile = uploadForm.querySelector('#upload-file');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const uploadClose = uploadForm.querySelector('.img-upload__cancel');
const hashtagsInput = uploadForm.querySelector('.text__hashtags');
const imgUploadPreview = uploadForm.querySelector('.img-upload__preview img');
const effectsPreviews = uploadForm.querySelectorAll('.effects__preview');

const resetUploadPicture = () => {
  imgUploadPreview.src = '';
  effectsPreviews.forEach((item) => item.style.backgroundImage = 'none');
};

const closeUploadForm = () => {
  uploadForm.reset();
  setInputValid();
  resetEditor();
  resetUploadPicture();
  uploadOverlay.classList.add(HIDDEN);
  document.body.classList.remove('modal-open');
};

const onDocumentKeydown = (evt) => {
  if (isEscEvent(evt) && !isInputActive()) {
    evt.preventDefault();
    closeUploadForm();
    document.removeEventListener('keydown', onDocumentKeydown);
  }
};

const openUploadForm = () => {
  resetEditor();
  resetUploadPicture();
  uploadOverlay.classList.remove(HIDDEN);
  document.body.classList.add('modal-open');
  hashtagsInput.addEventListener('input', onHashtagsInput);
  document.addEventListener('keydown', onDocumentKeydown);
  uploadClose.addEventListener('click', () => {
    closeUploadForm();
    document.removeEventListener('keydown', onDocumentKeydown);
  });
};

const uploadPicture = () => {
  const file = uploadFile.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      const result = reader.result;
      imgUploadPreview.src = result;

      effectsPreviews.forEach((item) => item.style.backgroundImage = `url(${result})`);
    });

    reader.readAsDataURL(file);
  }
};

const onUploadFileChange = () => {
  openUploadForm();
  uploadPicture();
};

const setUserFormSubmit = (onSuccess, onError) => {
  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    sendData(
      () => onSuccess(),
      () => onError(),
      new FormData(evt.target),
      UPLOAD_URL,
    );
  });
};

const executeFormSuccess = () => {
  closeUploadForm();
  renderMessagePopup('success');
};

const executeFormError = () => {
  closeUploadForm();
  renderMessagePopup('error');
};

setUserFormSubmit(executeFormSuccess, executeFormError);

uploadFile.addEventListener('change', onUploadFileChange);
