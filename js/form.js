import { isEscapeKey } from './util.js';
import { initEffects, resetEffects } from './effects.js';
import { showSuccessMessage, showErrorMessage } from './form-message.js';
import { sendPhoto } from './api.js';
import { renderThumbnails } from './render.js';

const fileInput = document.querySelector('#upload-file');
const formOverlay = document.querySelector('.img-upload__overlay');
const cancelButton = document.querySelector('.img-upload__cancel');
const form = document.querySelector('.img-upload__form');
const body = document.body;
const submitButton = form.querySelector('.img-upload__submit');
const imagePreview = document.querySelector('.img-upload__preview img');

const FILE_TYPES = ['jpg', 'jpeg', 'png', 'gif', 'webp'];

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

let loadedPhotos = [];
const addedPhotos = [];

const validateHashtags = (value) => {
  if (!value.trim()) {
    return true;
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

pristine.addValidator(hashtagInput, validateHashtags, getHashtagErrorMessage);

const showUploadForm = () => {
  formOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  initEffects();
};

const hideUploadForm = () => {
  formOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  form.reset();
  resetEffects();
  pristine.reset();
};

const loadImagePreview = () => {
  const file = fileInput.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((type) => fileName.endsWith(type));

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      const imageUrl = reader.result;
      imagePreview.src = imageUrl;

      const effectsPreviews = document.querySelectorAll('.effects__preview');
      effectsPreviews.forEach((preview) => {
        preview.style.backgroundImage = `url(${imageUrl})`;
      });

      showUploadForm();
    });

    reader.readAsDataURL(file);
  }
};

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

const sendData = async (formData) => {
  try {
    submitButton.disabled = true;
    await sendPhoto(formData);
    const file = fileInput.files[0];
    const localImageUrl = URL.createObjectURL(file);

    const newPhoto = {
      id: Date.now(),
      url: localImageUrl,
      description: form.querySelector('.text__description').value || 'Загруженное фото',
      likes: 0,
      comments: [],
    };

    addedPhotos.unshift(newPhoto);
    renderThumbnails([...addedPhotos, ...loadedPhotos]);

    hideUploadForm();
    showSuccessMessage();
  } catch (err) {
    showErrorMessage();
  } finally {
    submitButton.disabled = false;
  }
};

const initFormListeners = () => {
  fileInput.addEventListener('change', loadImagePreview);

  cancelButton.addEventListener('click', hideUploadForm);

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (pristine.validate()) {
      const formData = new FormData(form);
      sendData(formData);
    }
  });
};

const setLoadedPhotos = (photos) => {
  loadedPhotos = photos.slice();
};

export { initFormListeners, setLoadedPhotos };
