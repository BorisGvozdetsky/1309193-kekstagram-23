import {renderAllPictures} from './rendering-pictures.js';
import {createSimmilarPosts} from './data.js';
import {addPicturesClickHandlers} from './render-big-picture.js';

const POSTS_COUNT = 25;

const similarPictures = createSimmilarPosts(POSTS_COUNT);

renderAllPictures(similarPictures);
addPicturesClickHandlers(similarPictures);
