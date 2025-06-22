import { isEscapeKey, isEnterKey } from './util.js';

const userModalElement = document.querySelector('.big-picture');
const bigPictureImg = document.querySelector('.big-picture__img img');
const likesCount = document.querySelector('.likes-count');
const socialCommentShownCount = document.querySelector('.social__comment-shown-count');
const socialCommentTotalCount = document.querySelector('.social__comment-total-count');
const socialComments = document.querySelector('.social__comments');
const socialCommentsCount = document.querySelector('.social__comment-count');
const socialCaption = document.querySelector('.social__caption');
const commentsLoader = document.querySelector('.comments-loader');
const userModalElementClose = document.querySelector('.big-picture__cancel');

let currentComments = [];
let commentsToShow = 0;
const COMMENTS_STEP = 5;

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUserModal();
  }
};

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

  if (commentsToRender.length >= currentComments.length) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }
};

function fillModal(photo) {
  bigPictureImg.src = photo.url;
  bigPictureImg.alt = photo.description;
  likesCount.textContent = photo.likes;
  socialCaption.textContent = photo.description;

  currentComments = photo.comments;
  commentsToShow = COMMENTS_STEP;

  socialCommentsCount.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');
  document.body.classList.add('modal-open');

  renderComments();
}

function openUserModal(photo) {
  userModalElement.classList.remove('hidden');
  fillModal(photo);
  document.addEventListener('keydown', onDocumentKeydown);
}

function closeUserModal() {
  userModalElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

const initModalListeners = () => {
  userModalElementClose.addEventListener('click', closeUserModal);
  userModalElementClose.addEventListener('keydown', (evt) => {
    if (isEnterKey(evt)) {
      closeUserModal();
    }
  });

  commentsLoader.addEventListener('click', () => {
    commentsToShow += COMMENTS_STEP;
    renderComments();
  });
};

export { openUserModal, initModalListeners };
