import {getRandomPositiveInteger, getRandomArrayElement} from './utils.js';

const POSTS_COUNT = 25;
const COMMENTS_COUNT = 5;
const AVATAR_PATH = 'img/avatar-';
const PICTURE_ADRESS = 'photos/';

const DESCRIPTIONS = [
  'Огонь',
  'Круто',
  'Мое утро',
  'Завтрак чемпиона',
  'Мечта сбылась!',
  'Выходные',
  'Фото',
  'На реке',
  'Сезон открыт',
  'Всех с выходными',
  'Лето',
  'Еду в горы',
  'Высота 4000м',
];

const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Борис',
  'Натали',
  'Виктор',
  'Нина',
  'Владимир',
];

const likesCount = {
  MIN: 15,
  MAX: 200,
};

const Extension = {
  SVG: '.svg',
  JPG: '.jpg',
};

const createComment = (idx) => {
  // Перемешанный массив
  const shuffledComments = COMMENTS.sort(() => 0.5 - Math.random());
  // Получаем подмассив из первых n элементов после перетасовки
  const selectedComments = shuffledComments.slice(0, getRandomPositiveInteger (1, 2));
  return {
    id: idx + 1,
    avatar: AVATAR_PATH + (idx + 1) + Extension.SVG,
    message: selectedComments.join(' '),
    name: getRandomArrayElement(NAMES),
  };
};

const createPost = (index) => {
  // Генерация случайных объектов и заполнение ими массива.
  const similarComments = new Array(getRandomPositiveInteger(0, COMMENTS_COUNT)).fill(null).map((_, idx) => createComment(idx));
  return {
    id: index + 1,
    url: PICTURE_ADRESS + (index + 1) + Extension.JPG,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomPositiveInteger(likesCount.MIN, likesCount.MAX),
    comments: similarComments,
  };
};

const createSimmilarPosts = () => new Array(POSTS_COUNT).fill(null).map((_, index) => createPost(index));

createSimmilarPosts();