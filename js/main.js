import './util.js';
import './form.js';
import './form-message.js';
import { getPhotoDescriptions } from './data.js';
import { renderThumbnails, setThumbnailClickHandler } from './render.js';
import { openUserModal, initModalListeners } from './modal.js';
import { initFormListeners } from './form.js';
import './effects.js';

const init = () => {
  const photoDescriptions = getPhotoDescriptions();

  renderThumbnails(photoDescriptions);

  setThumbnailClickHandler((photoId) => {
    const photo = photoDescriptions.find((item) => item.id === photoId);
    if (photo) {
      openUserModal(photo);
    }
  });

  initModalListeners();
  initFormListeners();
};

init();

