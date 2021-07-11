import {getData} from './api.js';
import {renderAllPictures} from './gallery.js';
import './form.js';
import {showAlert} from './messages.js';

const DOWNLOAD_URL = 'https://23.javascript.pages.academy/kekstagram/data';
const ALERT_MESSAGE = 'Не удалось получить данные. Попробуйте ещё раз';

getData(
  (pictures) => renderAllPictures(pictures),
  () => showAlert(ALERT_MESSAGE),
  DOWNLOAD_URL,
);
