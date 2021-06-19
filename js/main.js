import {renderAllPictures} from './rendering-pictures.js';
import {createSimmilarPosts} from './data.js';
import {renderBigPicture} from './render-big-picture.js';

const POSTS_COUNT = 25;

const similarPictures = createSimmilarPosts(POSTS_COUNT);

renderAllPictures(similarPictures);
renderBigPicture(similarPictures);
