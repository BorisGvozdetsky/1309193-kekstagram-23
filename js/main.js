import {getData} from './api.js';
import {renderAllPictures} from './gallery.js';
import './form.js';

getData((pictures) => {
  renderAllPictures(pictures);
});
