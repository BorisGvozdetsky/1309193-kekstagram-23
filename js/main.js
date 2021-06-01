const STRING_MAX_LENGTH = 140;

const getRandomNumber = function (min, max) {
  if (max >= min || min < 0 || max < 0) {
    throw new Error('Ожидаемые аргументы: 0 <= min < max');
  }
  return Math.round(min + Math.random() * (max - min));
};

const checkStringLength = function (string) {
  return string.length < STRING_MAX_LENGTH ? string : 'Строка слишком длинная';
};

getRandomNumber(-3, 77);
checkStringLength('I love JavaScript');
