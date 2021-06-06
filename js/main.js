const DESCRIPTION = [
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

const COMMENTS_MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const COMMENTS_NAME = [
  'Борис',
  'Натали',
  'Виктор',
  'Нина',
  'Владимир',
];

const SIMILAR_POSTS_COUNT = 25;
const SIMILAR_COMMENTS_COUNT = 5;
const AVATAR_PATH = 'img/avatar-';
const AVATAR_EXT = '.svg';
const PICTURE_ADRESS = 'photos/';
const PICTURE_EXT = '.jpg';

const LikesCount = {
  MIN: 15,
  MAX: 200,
};

function getRandomPositiveInteger (min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

// получение случайного элемента массива
const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

const createComment = function (el, index) {
  // Перемешанный массив
  const shuffledComments = COMMENTS_MESSAGE.sort(() => 0.5 - Math.random());
  // Получаем подмассив из первых n элементов после перетасовки
  const selectedComments = shuffledComments.slice(0, getRandomPositiveInteger (1, 2));
  return {
    id: index + 1,
    avatar: AVATAR_PATH + (index + 1) + AVATAR_EXT,
    message: selectedComments,
    name: getRandomArrayElement(COMMENTS_NAME),
  };
};

const createPost = function (el, index) {
  // Генерация случайных объектов и заполнение ими массива.
  const similarComments = new Array(getRandomPositiveInteger(0, SIMILAR_COMMENTS_COUNT)).fill(null).map(createComment);
  return {
    id: index + 1,
    url: PICTURE_ADRESS + (index + 1) + PICTURE_EXT,
    description: getRandomArrayElement(DESCRIPTION),
    likes: getRandomPositiveInteger(LikesCount.MIN, LikesCount.MAX),
    comments: similarComments,
  };
};

const createSimmilarPosts = function () {
  return new Array(SIMILAR_POSTS_COUNT).fill(null).map(createPost);
};

createSimmilarPosts();
