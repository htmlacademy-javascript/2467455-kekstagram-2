import { isEscapeKey, isEnterKey } from './util.js';

const COMMENTS_STEP = 5;

const userModalElement = document.querySelector('.big-picture');
const bigPictureImg = userModalElement.querySelector('.big-picture__img img');
const likesCount = userModalElement.querySelector('.likes-count');
const socialCommentShownCount = userModalElement.querySelector('.social__comment-shown-count');
const socialCommentTotalCount = userModalElement.querySelector('.social__comment-total-count');
const socialComments = userModalElement.querySelector('.social__comments');
const socialCaption = userModalElement.querySelector('.social__caption');
const commentsLoader = userModalElement.querySelector('.comments-loader');
const userModalElementClose = userModalElement.querySelector('.big-picture__cancel');

let currentComments = [];
let commentsToShow = 0;


// Создание комментария
const createCommentElement = ({ avatar, name, message }) => {
  const li = document.createElement('li');
  li.classList.add('social__comment');

  const img = document.createElement('img');
  img.classList.add('social__picture');
  img.src = avatar;
  img.alt = name;
  img.width = 35;
  img.height = 35;

  const p = document.createElement('p');
  p.classList.add('social__text');
  p.textContent = message;

  li.append(img, p);
  return li;
};

// Отрисовка комментариев
const renderComments = () => {
  const fragment = document.createDocumentFragment();
  const commentsToRender = currentComments.slice(0, commentsToShow);

  socialComments.innerHTML = '';
  commentsToRender.forEach((comment) => {
    fragment.appendChild(createCommentElement(comment));
  });
  socialComments.appendChild(fragment);

  socialCommentShownCount.textContent = commentsToRender.length;
  socialCommentTotalCount.textContent = currentComments.length;

  commentsLoader.classList.toggle('hidden', commentsToRender.length >= currentComments.length);
};

// Заполнение модального окна
const fillModal = (photo) => {
  bigPictureImg.src = photo.url;
  bigPictureImg.alt = photo.description;
  likesCount.textContent = photo.likes;
  socialCaption.textContent = photo.description;

  currentComments = photo.comments;
  commentsToShow = COMMENTS_STEP;

  renderComments();
};

// Закрытие окна
const onUserModalClose = () => {
  userModalElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

// Обработчик клавиши Escape
function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onUserModalClose();
  }
}

// Открытие окна
const openUserModal = (photo) => {
  fillModal(photo);
  userModalElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

// Инициализация слушателей
const initModalListeners = () => {
  userModalElementClose.addEventListener('click', onUserModalClose);

  userModalElementClose.addEventListener('keydown', (evt) => {
    if (isEnterKey(evt)) {
      onUserModalClose();
    }
  });

  commentsLoader.addEventListener('click', () => {
    commentsToShow += COMMENTS_STEP;
    renderComments();
  });
};

export { openUserModal, initModalListeners };
