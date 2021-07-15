import {getData} from './api.js';
import {renderPictures} from './gallery.js';
import './form.js';
import {showAlert} from './messages.js';
import {setFilters} from './filter.js';

const DOWNLOAD_URL = 'https://23.javascript.pages.academy/kekstagram/data';
const ALERT_MESSAGE = 'Не удалось получить данные. Попробуйте ещё раз';

const getDataSuccess = (pictures) => {
  renderPictures(pictures);
  setFilters(pictures);
};

getData(
  getDataSuccess,
  () => showAlert(ALERT_MESSAGE),
  DOWNLOAD_URL,
);
