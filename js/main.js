import './util.js';
import './form-message.js';
import './form.js';
import './effects.js';
import { initEffects } from './effects.js';
import { renderThumbnails, setThumbnailClickHandler } from './render.js';
import { openUserModal, initModalListeners } from './modal.js';
import { initFormListeners } from './form.js';
import { getPhotos } from './api.js';

const init = async () => {
  try {
    const photoDescriptions = await getPhotos();

    renderThumbnails(photoDescriptions);

    setThumbnailClickHandler((photoId) => {
      const photo = photoDescriptions.find((item) => item.id === photoId);
      if (photo) {
        openUserModal(photo);
      }
    });

    document.querySelector('.img-filters').classList.remove('img-filters--inactive');
  } catch (err) {
    const template = document.querySelector('#data-error');
    const errorElement = template.content.cloneNode(true);
    document.body.appendChild(errorElement);

    setTimeout(() => {
      const element = document.querySelector('.data-error');
      if (element) {
        element.remove();
      }
    }, 5000);
  }

  initModalListeners();
  initFormListeners();
  initEffects();
};

init();

