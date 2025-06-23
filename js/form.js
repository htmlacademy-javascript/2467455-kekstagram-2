import { isEscapeKey } from './util.js';
import { showSuccessMessage, showErrorMessage } from './form-message.js';

const fileInput = document.querySelector('#upload-file');
const formOverlay = document.querySelector('.img-upload__overlay');
const cancelButton = document.querySelector('.img-upload__cancel');
const form = document.querySelector('.img-upload__form');
const body = document.body;

const hashtagInput = form.querySelector('.text__hashtags');
const commentInput = form.querySelector('.text__description');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  successClass: 'img-upload__field-wrapper--success',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'pristine-error',
});

// Валидация хэштегов
const validateHashtags = (value) => {
  if (!value.trim()) {
    return true;
  }

  const hashtags = value.trim().toLowerCase().split(/\s+/);
  if (hashtags.length > 5) {
    return false;
  }

  const uniqueHashtags = new Set(hashtags);
  if (uniqueHashtags.size !== hashtags.length) {
    return false;
  }

  return hashtags.every((tag) => /^#[a-zа-яё0-9]{1,19}$/i.test(tag));
};

const getHashtagErrorMessage = (value) => {
  const hashtags = value.trim().toLowerCase().split(/\s+/);

  if (hashtags.length > 5) {
    return 'Нельзя указать больше 5 хэштегов';
  }

  const uniqueHashtags = new Set(hashtags);
  if (uniqueHashtags.size !== hashtags.length) {
    return 'Хэштеги не должны повторяться';
  }

  if (!hashtags.every((tag) => /^#[a-zа-яё0-9]{1,19}$/i.test(tag))) {
    return 'Хэштег начинается с # и может содержать только буквы и цифры, не более 20 символов';
  }

  return '';
};

// Валидация комментария
const validateComment = (value) => value.length <= 140;

pristine.addValidator(hashtagInput, validateHashtags, getHashtagErrorMessage);
pristine.addValidator(commentInput, validateComment, 'Комментарий не может быть длиннее 140 символов');

// Обработчик Escape (с учётом фокуса)
const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    const isInHashtag = document.activeElement === hashtagInput;
    const isInComment = document.activeElement === commentInput;

    if (isInHashtag || isInComment) {
      evt.stopPropagation(); // предотвращаем закрытие формы
    } else {
      evt.preventDefault();
      closeForm();
    }
  }
};

// Показ формы
const openForm = () => {
  formOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

// Закрытие формы
const closeForm = () => {
  formOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  form.reset(); // сброс полей
  pristine.reset(); // сброс ошибок
  fileInput.value = ''; // сброс выбранного файла
  document.removeEventListener('keydown', onDocumentKeydown);
};

// Отправка формы
form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  if (!pristine.validate()) {
    return;
  }

  const submitButton = form.querySelector('#upload-submit');
  submitButton.disabled = true;

  const formData = new FormData(form);

  fetch('https://27.javascript.pages.academy/kekstagram', {
    method: 'POST',
    body: formData,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Не удалось отправить форму');
      }

      closeForm();
      showSuccessMessage();
    })
    .catch(() => {
      showErrorMessage();
    })
    .finally(() => {
      submitButton.disabled = false;
    });
});

// Слушатели
const initFormListeners = () => {
  fileInput.addEventListener('change', openForm);
  cancelButton.addEventListener('click', closeForm);
};

export { initFormListeners };
