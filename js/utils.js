const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomUniqueArrayElement = (min, max, length) => {
  const elements = [];
  while (elements.length !== length) {
    const number = getRandomPositiveInteger(min, max);
    if (!elements.includes(number)) {
      elements.push(number);
    }
  }
  return elements;
};

const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

const checkStringLength = (string, length) => string.length <= length;

const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {getRandomPositiveInteger, getRandomArrayElement, checkStringLength, isEscEvent, debounce, getRandomUniqueArrayElement};
