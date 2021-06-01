const IS_LONG = 140;

const getRandomNumber = function (min, max) {
  if (min < 0 || max < 0) {
    return false;
  }
  return Math.round(min + Math.random() * (max - min));
};

const checkStringLength = function (string) {
  return string.length < IS_LONG ? string : 'Строка слишком длинная';
};

getRandomNumber(2, 77);
checkStringLength('I love JavaScript');
