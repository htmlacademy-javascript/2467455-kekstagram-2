import { isEscapeKey } from './util.js';
import { initEffects, resetEffects } from './effects.js';
import { showSuccessMessage, showErrorMessage } from './form-message.js';
import { sendPhoto } from './api.js';

const fileInput = document.querySelector('#upload-file');
const formOverlay = document.querySelector('.img-upload__overlay');
const cancelButton = document.querySelector('.img-upload__cancel');
const form = document.querySelector('.img-upload__form');
const body = document.body;
const submitButton = form.querySelector('.img-upload__submit');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  successClass: 'img-upload__field-wrapper--success',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'pristine-error',
});

const hashtagInput = form.querySelector('.text__hashtags');

const HASHTAG_REGEX = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_HASHTAGS = 5;

const validateHashtags = (value) => {
  if (!value.trim()) {
    return true; // Поле пустое — валидно
  }

  const hashtags = value.trim().split(/\s+/);

  if (hashtags.length > MAX_HASHTAGS) {
    return false;
  }

  const lowerCaseHashtags = hashtags.map((tag) => tag.toLowerCase());
  const hasDuplicates = new Set(lowerCaseHashtags).size !== lowerCaseHashtags.length;
  if (hasDuplicates) {
    return false;
  }

  return hashtags.every((tag) => HASHTAG_REGEX.test(tag));
};

const getHashtagErrorMessage = (value) => {
  const hashtags = value.trim().split(/\s+/);
  if (hashtags.length > MAX_HASHTAGS) {
    return `Не больше ${MAX_HASHTAGS} хештегов`;
  }

  const lowerCaseHashtags = hashtags.map((tag) => tag.toLowerCase());
  const hasDuplicates = new Set(lowerCaseHashtags).size !== lowerCaseHashtags.length;
  if (hasDuplicates) {
    return 'Хештеги не должны повторяться';
  }

  if (!hashtags.every((tag) => HASHTAG_REGEX.test(tag))) {
    return 'Хештеги должны начинаться с # и содержать до 20 символов без спецсимволов';
  }

  return '';
};

pristine.addValidator(
  hashtagInput,
  validateHashtags,
  getHashtagErrorMessage
);

// Показать форму
const showUploadForm = () => {
  formOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  initEffects();
};

// Скрыть форму и сбросить всё
const hideUploadForm = () => {
  formOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  form.reset();
  resetEffects();
  pristine.reset();
};

// Обработка ESC
function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    const activeElement = document.activeElement;
    const isInputFocused =
      activeElement === form.querySelector('.text__hashtags') ||
      activeElement === form.querySelector('.text__description');

    if (!isInputFocused) {
      evt.preventDefault();
      hideUploadForm();
    }
  }
}

// Отправка формы на сервер
const sendData = async (formData) => {
  try {
    submitButton.disabled = true;
    await sendPhoto(formData);
    hideUploadForm();
    showSuccessMessage();
  } catch (err) {
    showErrorMessage();
  } finally {
    submitButton.disabled = false;
  }
};

// Подключение слушателей
const initFormListeners = () => {
  fileInput.addEventListener('change', () => {
    showUploadForm();
  });

  cancelButton.addEventListener('click', () => {
    hideUploadForm();
  });

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    if (pristine.validate()) {
      const formData = new FormData(form);
      sendData(formData);
    }
  });
};

export { initFormListeners };
