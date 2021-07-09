import {isEscEvent} from './utils.js';
import {resetEditor} from './image-editor.js';
import {sendData} from './api.js';
import {isInputActive, onHashtagsInput, setInputValid} from './validator.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadFile = uploadForm.querySelector('#upload-file');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const uploadClose = uploadForm.querySelector('.img-upload__cancel');
const hashtagsInput = uploadForm.querySelector('.text__hashtags');

const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

const closeUploadForm = () => {
  uploadForm.reset();
  setInputValid();
  resetEditor();
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

const deleteErrorPopup = () => {
  const errorPopup = document.querySelector('.error');
  if (errorPopup) {
    errorPopup.remove();
  }
};

const deleteSuccessPopup = () => {
  const successPopup = document.querySelector('.success');
  if (successPopup) {
    successPopup.remove();
  }
};

const onDocumentKeydown = (evt) => {
  if (isEscEvent(evt) && !isInputActive()) {
    evt.preventDefault();
    closeUploadForm();
    deleteSuccessPopup();
    deleteErrorPopup();
    document.removeEventListener('keydown', onDocumentKeydown);
  }
};

const onDocumentClick = (evt) => {
  if (!evt.target.closest('.success__inner')) {
    deleteSuccessPopup();
  }
  if (!evt.target.closest('.error__inner')) {
    deleteErrorPopup();
  }
};

const onUploadFileChange = () => {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  hashtagsInput.addEventListener('input', onHashtagsInput);
  document.addEventListener('keydown', onDocumentKeydown);
  uploadClose.addEventListener('click', () => {
    closeUploadForm();
    document.removeEventListener('keydown', onDocumentKeydown);
  });
};

const renderSuccessPopup = () => {
  const successPopup = successTemplate.cloneNode(true);
  document.body.appendChild(successPopup);

  const successButtonElement = successPopup.querySelector('.success__button');
  successButtonElement.addEventListener('click', deleteSuccessPopup);
  document.addEventListener('click', onDocumentClick);
};

const renderErrorPopup = () => {
  const errorPopup = errorTemplate.cloneNode(true);
  document.body.appendChild(errorPopup);

  const errorButtonElement = errorPopup.querySelector('.error__button');
  errorButtonElement.addEventListener('click', deleteErrorPopup);
  document.addEventListener('click', onDocumentClick);
};

const setUserFormSubmit = (onSuccess, onError) => {
  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    sendData(
      () => onSuccess(),
      () => onError(),
      new FormData(evt.target),
    );

  });
};

const executeFormSuccess = () => {
  closeUploadForm();
  renderSuccessPopup();
};

const executeFormError = () => {
  closeUploadForm();
  renderErrorPopup();
};

setUserFormSubmit(executeFormSuccess, executeFormError);

uploadFile.addEventListener('change', onUploadFileChange);
