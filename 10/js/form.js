import { isEscapeKey } from './util.js';
import { initEffectSlider, resetEffects } from './effects.js';

const fileInput = document.querySelector('#upload-file');
const formOverlay = document.querySelector('.img-upload__overlay');
const cancelButton = document.querySelector('.img-upload__cancel');
const form = document.querySelector('.img-upload__form');

// Открытие формы загрузки
const showUploadForm = () => {
  formOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);

  initEffectSlider(); // 👈 ИНИЦИАЛИЗАЦИЯ СЛАЙДЕРА
};

// Закрытие формы загрузки
const hideUploadForm = () => {
  formOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);

  form.reset(); // сбрасываем значения формы
  resetEffects(); // 👈 СБРОС МАСШТАБА И ЭФФЕКТОВ
};

// Обработчик нажатия Escape
function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideUploadForm();
  }
}

// Обработчики событий
const initFormListeners = () => {
  fileInput.addEventListener('change', () => {
    showUploadForm();
  });

  cancelButton.addEventListener('click', () => {
    hideUploadForm();
  });
};

export { initFormListeners };
