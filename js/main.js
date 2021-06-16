import {renderAllElements} from './rendering-pictures.js';
import {createSimmilarPosts} from './data.js';

const POSTS_COUNT = 25;

const similarPictures = createSimmilarPosts(POSTS_COUNT);

renderAllElements(similarPictures);
