import {openUserModal} from './modal.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');

// Создание миниатюры
const createThumbnail = (photo) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = photo.url;
  pictureElement.querySelector('.picture__img').alt = photo.description;
  pictureElement.querySelector('.picture__likes').textContent = photo.likes;
  pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;

  pictureElement.addEventListener('click', () => {
    openUserModal(photo);
  });

  return pictureElement;
};

// Отрисовка всех миниатюр
const renderThumbnails = (photoArray) => {
  const fragment = document.createDocumentFragment();

  photoArray.forEach((photo) => {
    const thumbnail = createThumbnail(photo);
    fragment.appendChild(thumbnail);
  });

  picturesContainer.appendChild(fragment);
};

const clearThumbnails = () => {
  picturesContainer.innerHTML = '';
};
export {renderThumbnails, clearThumbnails};

