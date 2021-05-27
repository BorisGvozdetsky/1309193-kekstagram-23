const getRandomNumber = function (min, max) {
  if (min < 0 || max < 0) {
    return console.log('Вы ввели отрицательное число!');
  }
  return Math.round(min + Math.random() * (max - min));
};

getRandomNumber(-1, 77);

const IS_LONG = 140;
const checkStringLength = function (string) {
  return string.length < IS_LONG ? string : 'Строка слишком длинная';
};

console.log(checkStringLength('I love JavaScript'));
