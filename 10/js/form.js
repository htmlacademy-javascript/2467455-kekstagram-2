import { isEscapeKey } from './util.js';
import { initEffectSlider, resetEffects } from './effects.js';

const fileInput = document.querySelector('#upload-file');
const formOverlay = document.querySelector('.img-upload__overlay');
const cancelButton = document.querySelector('.img-upload__cancel');
const form = document.querySelector('.img-upload__form');

const showUploadForm = () => {
  formOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  initEffectSlider();
};

const hideUploadForm = () => {
  formOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  form.reset();
  resetEffects();
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideUploadForm();
  }
}

const initFormListeners = () => {
  fileInput.addEventListener('change', () => {
    showUploadForm();
  });

  cancelButton.addEventListener('click', () => {
    hideUploadForm();
  });
};

export { initFormListeners };
