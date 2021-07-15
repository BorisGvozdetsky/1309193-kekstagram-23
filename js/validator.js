const HASHTAGS_COUNT = 5;
const HASHTAGS_CHECK = /^#[A-Za-zА-Яа-я0-9]{1,19}$/;
const HASHTAGS_LENGTH = 20;

const uploadForm = document.querySelector('.img-upload__form');
const hashtagsInput = uploadForm.querySelector('.text__hashtags');
const textComment = uploadForm.querySelector('.text__description');

const isInputActive = () => document.activeElement === hashtagsInput || document.activeElement === textComment;

const setInputInvalid = (errorText) => {
  hashtagsInput.style.outline = '2px solid tomato';
  hashtagsInput.setCustomValidity(errorText);
};

const setInputValid = () => {
  hashtagsInput.style.outline = 'revert';
  hashtagsInput.setCustomValidity('');
};

const onHashtagsFieldInput = () => {
  let hashtagCorrect = true;

  if (hashtagsInput.value !== '') {
    const hashtags = hashtagsInput.value.trim().split(' ');
    const hashtag = hashtags.map((tag) => tag.toLowerCase());
    const hashtagSet = new Set(hashtag);

    for (let i = 0; i < hashtag.length; i++) {
      hashtagCorrect = hashtagCorrect && HASHTAGS_CHECK.test(hashtag[i]);
    }

    if (hashtag.length > HASHTAGS_COUNT) {
      setInputInvalid(`Нельзя указать больше чем ${HASHTAGS_COUNT} хештегов`);
    } else if (hashtag.includes('#')) {
      setInputInvalid('Хештег не может состоять только из одной решётки');
    } else if (!hashtagCorrect) {
      setInputInvalid(`Хэш-тег должен начинаться с символа #, состоять только из букв и чисел, не может содержать пробелы, спецсимволы. Максимальная длинна хештега ${HASHTAGS_LENGTH} символов`);
    } else if (hashtag.length !== hashtagSet.size) {
      setInputInvalid('Один и тот же хэштег не может быть использован дважды');
    } else {
      setInputValid();
    }
    hashtagsInput.reportValidity();
  } else {
    setInputValid();
  }
};

export {isInputActive, onHashtagsFieldInput, setInputValid};
