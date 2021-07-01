import {renderAllPictures} from './gallery.js';
import {createSimilarPosts} from './data.js';
import './form.js';

const POSTS_COUNT = 25;

const similarPictures = createSimilarPosts(POSTS_COUNT);

renderAllPictures(similarPictures);
