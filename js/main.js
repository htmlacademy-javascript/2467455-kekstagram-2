import './util.js';
import { getPhotoDescriptions } from './data.js';
import { renderThumbnails, setThumbnailClickHandler } from './render.js';
import { openUserModal, initModalListeners } from './modal.js';

const photoDescriptions = getPhotoDescriptions();
renderThumbnails(photoDescriptions);

// При клике по миниатюре — открываем модалку
setThumbnailClickHandler((photoId) => {
  const photo = photoDescriptions.find((item) => item.id === photoId);
  if (photo) {
    openUserModal(photo);
  }
});

// Инициализируем слушатели закрытия модального окна
initModalListeners();
