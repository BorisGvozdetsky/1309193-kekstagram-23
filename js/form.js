import {isEscEvent} from './utils.js';
import {HIDDEN, resetEditor} from './image-editor.js';
import {sendData} from './api.js';
import {isInputActive, onHashtagsInput, setInputValid} from './validator.js';
import {renderMessagePopup} from './messages.js';

const UPLOAD_URL = 'https://23.javascript.pages.academy/kekstagram';

const uploadForm = document.querySelector('.img-upload__form');
const uploadFile = uploadForm.querySelector('#upload-file');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const uploadClose = uploadForm.querySelector('.img-upload__cancel');
const hashtagsInput = uploadForm.querySelector('.text__hashtags');

const closeUploadForm = () => {
  uploadForm.reset();
  setInputValid();
  resetEditor();
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

const onUploadFileChange = () => {
  uploadOverlay.classList.remove(HIDDEN);
  document.body.classList.add('modal-open');
  hashtagsInput.addEventListener('input', onHashtagsInput);
  document.addEventListener('keydown', onDocumentKeydown);
  uploadClose.addEventListener('click', () => {
    closeUploadForm();
    document.removeEventListener('keydown', onDocumentKeydown);
  });
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
