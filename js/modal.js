import {isEscapeKey, isEnterKey} from './util.js';

const userModalElement = document.querySelector('.big-picture');
const bigPictureImg = document.querySelector('.big-picture__img');
const likesCount = document.querySelector('.likes-count');
const socialCommentShownCount = document.querySelector('.social__comment-shown-count');
const socialCommentTotalCount = document.querySelector('.social__comment-total-count');
const socialComments = document.querySelector('.social__comments');
const socialCommentsCount = document.querySelector('.social__comment-count');
const socialCapthion = document.querySelector('.social__caption');
const commentsLoader = document.querySelector('.comments-loader');
const userModalElementClose = document.querySelector('.big-picture__cancel');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUserModal();
  }
};

function openUserModal(photo) {
  userModalElement.classList.remove('hidden');
  fillModal(photo);
  document.addEventListener('keydown', onDocumentKeydown);
}

function closeUserModal () {
  userModalElement.classList.add('hidden');
  // clearSimilarList();
  document.removeEventListener('keydown', onDocumentKeydown);
  document.body.classList.remove('modal-open');
}

userModalElementClose.addEventListener('click', () => {
  closeUserModal();
});

userModalElementClose.addEventListener('keydown', (evt) => {
  if (isEnterKey(evt)) {
    closeUserModal();
  }
});

const fillModal = (photo) => {
  bigPictureImg.querySelector('img').src = photo.url;
  bigPictureImg.querySelector('img').alt = photo.description;
  likesCount.textContent = photo.likes;
  socialCapthion.textContent = photo.description;
  socialCommentShownCount.textContent = photo.comments.length;
  socialCommentTotalCount.textContent = photo.comments.length;

  socialComments.innerHTML = '';
  photo.comments.forEach(({ avatar, name, message }) => {
    const commentElement = document.createElement('li');
    commentElement.classList.add('social__comment');

    commentElement.innerHTML = `
      <img
        class="social__picture"
        src="${avatar}"
        alt="${name}"
        width="35" height="35">
      <p class="social__text">${message}</p>
    `;

    socialComments.appendChild(commentElement);
  });

  socialCommentsCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  document.body.classList.add('modal-open');
};

export {openUserModal};
