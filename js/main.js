import {renderAllPictures} from './rendering-pictures.js';
import {createSimmilarPosts} from './data.js';
import './form.js';

const POSTS_COUNT = 25;

const similarPictures = createSimmilarPosts(POSTS_COUNT);

renderAllPictures(similarPictures);
