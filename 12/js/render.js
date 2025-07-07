const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');

// Создание миниатюры
const createThumbnail = (photo) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  const img = pictureElement.querySelector('.picture__img');
  img.src = photo.url;
  img.alt = photo.description;

  pictureElement.querySelector('.picture__likes').textContent = photo.likes;
  pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;
  pictureElement.dataset.photoId = photo.id;

  return pictureElement;
};

// Отрисовка миниатюр
const renderThumbnails = (photoArray) => {
  picturesContainer.querySelectorAll('.picture').forEach((el) => el.remove());

  const fragment = document.createDocumentFragment();
  photoArray.forEach((photo) => {
    const thumbnail = createThumbnail(photo);
    fragment.appendChild(thumbnail);
  });

  picturesContainer.appendChild(fragment);
};

// Назначение обработчика на клики по миниатюрам
const setThumbnailClickHandler = (callback) => {
  picturesContainer.addEventListener('click', (evt) => {
    const thumbnail = evt.target.closest('.picture');
    if (!thumbnail) {
      return;
    }

    const photoId = parseInt(thumbnail.dataset.photoId, 10);
    if (!isNaN(photoId)) {
      callback(photoId);
    }
  });
};

export { renderThumbnails, setThumbnailClickHandler };
