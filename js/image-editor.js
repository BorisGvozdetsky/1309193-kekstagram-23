const HIDDEN = 'hidden';
const SCALE_STEP = 25;

const uploadForm = document.querySelector('.img-upload__form');
const decreaseScaleButton  = uploadForm.querySelector('.scale__control--smaller');
const increaseScaleButton = uploadForm.querySelector('.scale__control--bigger');
const scaleControlText = uploadForm.querySelector('.scale__control--value');
const imgUploadPreview = uploadForm.querySelector('.img-upload__preview img');
const effectContainer = uploadForm.querySelector('.effects__list');
const sliderContainer = uploadForm.querySelector('.img-upload__effect-level');
const effectSlider = uploadForm.querySelector('.effect-level__slider');
const effectValue = uploadForm.querySelector('.effect-level__value');

const scaleRange = {
  MIN: 25,
  MAX: 100,
};

const defaultSliderOptions = {
  connect: 'lower',
  format: {
    to: (value) => (Number.isInteger(value)) ? value.toFixed(0) : value.toFixed(1),
    from: (value) => parseFloat(value),
  },
};

const effectsConfig = {
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

const updateSlider = (_, handle, unencoded) => {
  const sliderEffect = effectsConfig[currentEffect].effect;
  const sliderUnit = effectsConfig[currentEffect].unit;

  effectValue.value = unencoded[handle];
  updateImgEffect(sliderEffect, effectValue.value, sliderUnit);
};

const initSlider = (settings) => {
  sliderContainer.classList.remove(HIDDEN);
  if (!effectSlider.noUiSlider) {
    noUiSlider.create(effectSlider, {...defaultSliderOptions, ...settings});
    effectSlider.noUiSlider.on('update', updateSlider);
  } else {
    effectSlider.noUiSlider.updateOptions(settings);
  }
  effectValue.value = settings.start;
};

const destroySlider = () => {
  if (effectSlider.noUiSlider) {
    effectSlider.noUiSlider.destroy();
  }
};

const applyEffect = (effect) => {
  imgUploadPreview.classList.add(`effects__preview--${effect}`);
  initSlider(effectsConfig[effect].settings);
};

const resetEffect = () => {
  currentEffect = 'none';
  imgUploadPreview.style.filter = '';
  imgUploadPreview.className = '';
  effectValue.value = '';
  destroySlider();
  sliderContainer.classList.add(HIDDEN);
};

const onEffectClick = (evt) => {
  if (evt.target.matches('[type=radio]')) {
    currentEffect = evt.target.value;
    if (currentEffect !== 'none'){
      applyEffect(currentEffect);
    } else {
      resetEffect();
    }
  }
};

const getScale = (step) => {
  const scaleControlValue = parseInt(scaleControlText.value, 10);
  const scaleControlValueCurrent = scaleControlValue + step;

  if (scaleControlValueCurrent > scaleRange.MAX) {
    return scaleRange.MAX;
  }
  if (scaleControlValueCurrent < scaleRange.MIN) {
    return scaleRange.MIN;
  }
  return scaleControlValueCurrent;
};

const setScale = (value) => {
  scaleControlText.value = `${value}%`;
  imgUploadPreview.style.transform =  `scale(${value / scaleRange.MAX})`;
};

const resetScale = () => {
  imgUploadPreview.style.transform = 'scale(1)';
  scaleControlText.value = `${scaleRange.MAX}%`;
};

const resetEditor = () => {
  resetEffect();
  resetScale();
};

resetEditor();

effectContainer.addEventListener('click', onEffectClick);

decreaseScaleButton.addEventListener('click', () => {
  setScale(getScale(-SCALE_STEP));
});

increaseScaleButton.addEventListener('click', () => {
  setScale(getScale(SCALE_STEP));
});

export {HIDDEN, resetEditor};
