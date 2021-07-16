import {isEscEvent} from './utils.js';

const ALERT_SHOW_TIME = 5000;

const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

const messagesTypes = {
  success: successTemplate,
  error: errorTemplate,
};

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const deleteMessagePopup = () => {
  const messagePopup = document.querySelector('.success') || document.querySelector('.error');
  if (messagePopup) {
    messagePopup.remove();
  }
};

const onDocumentClick = (evt) => {
  if (!evt.target.closest('.success__inner') && !evt.target.closest('.error__inner')) {
    deleteMessagePopup();
    document.removeEventListener('click', onDocumentClick);
  }
};

const onDocumentKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    deleteMessagePopup();
    document.removeEventListener('keydown', onDocumentKeydown);
  }
};

const onMessagePopupButtonClick = () => {
  deleteMessagePopup();
};

const renderMessagePopup = (type) => {
  const messagePopup = messagesTypes[type].cloneNode(true);
  document.body.appendChild(messagePopup);
  const messagePopupButton = messagePopup.querySelector('button');
  messagePopupButton.addEventListener('click', onMessagePopupButtonClick);
  document.addEventListener('click', onDocumentClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

export {showAlert, renderMessagePopup};
