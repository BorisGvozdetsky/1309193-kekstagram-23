const uploadForm = document.querySelector('.img-upload__form');
const scaleControlSmaller = uploadForm.querySelector('.scale__control--smaller');
const scaleControlBigger = uploadForm.querySelector('.scale__control--bigger');
const scaleControlText = uploadForm.querySelector('.scale__control--value');
const imgUploadPreview = uploadForm.querySelector('.img-upload__preview img');
const effectContainer = uploadForm.querySelector('.effects__list');
const sliderWrapper = uploadForm.querySelector('.img-upload__effect-level');
const sliderElement = uploadForm.querySelector('.effect-level__slider');
const valueElement = uploadForm.querySelector('.effect-level__value');

const scaleValues = {
  MIN: 25,
  MAX: 100,
};

const sliderOptionsDefault = {
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
};

const sliderOptions = {
  chrome: {
    settings: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    },
    effect: 'grayscale',
    unit: '',
  },
  sepia: {
    settings: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    },
    effect: 'sepia',
    unit: '',
  },
  marvin: {
    settings: {
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1,
    },
    effect: 'invert',
    unit: '%',
  },
  phobos: {
    settings: {
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1,
    },
    effect: 'blur',
    unit: 'px',
  },
  heat: {
    settings: {
      range: {
        min: 1,
        max: 3,
      },
      start: 3,
      step: 0.1,
    },
    effect: 'brightness',
    unit: '',
  },
};

let currentEffect = 'none';

const updateImgEffect = (effect, value, unit) => {
  imgUploadPreview.style.filter = `${effect}(${value}${unit})`;
};

const updateSlider = (values, handle) => {
  valueElement.value = values[handle];
  const sliderEffect = sliderOptions[currentEffect].effect;
  const sliderUnit = sliderOptions[currentEffect].unit;
  updateImgEffect(sliderEffect, valueElement.value, sliderUnit);
};

const initSlider = (options) => {
  sliderWrapper.classList.remove('hidden');
  if (!sliderElement.noUiSlider) {
    noUiSlider.create(sliderElement, {...sliderOptionsDefault, ...options});
    sliderElement.noUiSlider.on('update', updateSlider);
  } else {
    sliderElement.noUiSlider.updateOptions(options);
  }
  valueElement.value = options.start;
};

const destroySlider = () => {
  if (sliderElement.noUiSlider) {
    sliderElement.noUiSlider.destroy();
  }
};

const resetAllEffects = () => {
  currentEffect = 'none';
  imgUploadPreview.style.filter = '';
  imgUploadPreview.className = '';
  valueElement.value = '';
  destroySlider();
  sliderWrapper.classList.add('hidden');
};

const onEffectsClick = (evt) => {
  if (evt.target.matches('[type=radio]')) {
    currentEffect = evt.target.value;
    imgUploadPreview.classList.add(`effects__preview--${currentEffect}`);
    if (currentEffect !== 'none'){
      initSlider(sliderOptions[currentEffect].settings);
    } else {
      resetAllEffects();
    }
  }
};

const resetScale = () => {
  imgUploadPreview.style.transform = 'scale(1)';
  scaleControlText.value = `${scaleValues.MAX}%`;
};

resetAllEffects();
resetScale();

effectContainer.addEventListener('click', onEffectsClick);

scaleControlSmaller.addEventListener('click', () => {
  const scaleControlValue = parseInt(scaleControlText.value, 10);

  if (scaleControlValue > scaleValues.MIN) {
    const scaleMinus = scaleControlValue - scaleValues.MIN;
    scaleControlText.value = `${scaleMinus}%`;
    imgUploadPreview.style.transform =  `scale(${scaleMinus / scaleValues.MAX})`;
  }
});

scaleControlBigger.addEventListener('click', () => {
  const scaleControlValue = parseInt(scaleControlText.value, 10);

  if (scaleControlValue < scaleValues.MAX) {
    const scalePlus = scaleControlValue + scaleValues.MIN;
    scaleControlText.value = `${scalePlus}%`;
    imgUploadPreview.style.transform =  `scale(${scalePlus / scaleValues.MAX})`;
  }
});

export {resetScale, resetAllEffects};
