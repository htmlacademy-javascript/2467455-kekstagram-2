const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;
const DEFAULT_EFFECT = 'none';

const scaleValueInput = document.querySelector('.scale__control--value');
const scaleSmallerButton = document.querySelector('.scale__control--smaller');
const scaleBiggerButton = document.querySelector('.scale__control--bigger');
const imagePreview = document.querySelector('.img-upload__preview img');
const effectSlider = document.querySelector('.effect-level__slider');
const effectLevelInput = document.querySelector('input[name="effect-level"]');
const effectsList = document.querySelector('.effects__list');

let currentScale = DEFAULT_SCALE;
let currentEffect = DEFAULT_EFFECT;
let isEffectSliderInitialized = false;

const effectSettings = {
  none: {
    range: { min: 0, max: 100 },
    start: 100,
    step: 1,
    filter: () => '',
    hidden: true
  },
  chrome: {
    range: { min: 0, max: 1 },
    start: 1,
    step: 0.1,
    filter: (value) => `grayscale(${value})`,
    hidden: false
  },
  sepia: {
    range: { min: 0, max: 1 },
    start: 1,
    step: 0.1,
    filter: (value) => `sepia(${value})`,
    hidden: false
  },
  marvin: {
    range: { min: 0, max: 100 },
    start: 100,
    step: 1,
    filter: (value) => `invert(${value}%)`,
    hidden: false
  },
  phobos: {
    range: { min: 0, max: 3 },
    start: 3,
    step: 0.1,
    filter: (value) => `blur(${value}px)`,
    hidden: false
  },
  heat: {
    range: { min: 1, max: 3 },
    start: 3,
    step: 0.1,
    filter: (value) => `brightness(${value})`,
    hidden: false
  }
};

const setScale = (value) => {
  imagePreview.style.transform = `scale(${value / 100})`;
  scaleValueInput.value = `${value}%`;
};

const changeScale = (direction) => {
  if (direction === 'smaller' && currentScale > MIN_SCALE) {
    currentScale -= SCALE_STEP;
  }
  if (direction === 'bigger' && currentScale < MAX_SCALE) {
    currentScale += SCALE_STEP;
  }
  setScale(currentScale);
};

const updateEffect = (effectName) => {
  currentEffect = effectName;
  const settings = effectSettings[effectName];

  if (!effectSlider.noUiSlider) {
    return;
  }

  effectSlider.noUiSlider.updateOptions({
    range: settings.range,
    start: settings.start,
    step: settings.step
  });

  effectSlider.parentElement.classList.toggle('hidden', settings.hidden);

  if (effectName === 'none') {
    imagePreview.style.filter = '';
  } else {
    imagePreview.style.filter = settings.filter(settings.start);
  }

  effectLevelInput.value = settings.start;
};

const initEffectSlider = () => {
  if (isEffectSliderInitialized || !effectSlider) {
    return;
  }

  noUiSlider.create(effectSlider, {
    range: effectSettings.none.range,
    start: effectSettings.none.start,
    step: effectSettings.none.step,
    connect: 'lower'
  });

  effectSlider.noUiSlider.on('update', (values) => {
    const value = values[0];
    const settings = effectSettings[currentEffect];
    imagePreview.style.filter = settings.filter(value);
    effectLevelInput.value = value;
  });

  isEffectSliderInitialized = true;
  updateEffect(DEFAULT_EFFECT);
};

effectsList.addEventListener('change', (evt) => {
  if (evt.target.name === 'effect') {
    updateEffect(evt.target.value);
  }
});

const resetEffects = () => {
  currentScale = DEFAULT_SCALE;
  setScale(DEFAULT_SCALE);
  updateEffect(DEFAULT_EFFECT);
};

scaleSmallerButton.addEventListener('click', () => changeScale('smaller'));
scaleBiggerButton.addEventListener('click', () => changeScale('bigger'));

const initEffects = () => {
  initEffectSlider();
};

export { initEffects, resetEffects };
