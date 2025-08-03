import { getPhotos } from './api.js';
import { renderThumbnails } from './render.js';
import { initFilters } from './filter.js';
import { initModalListeners } from './modal.js';
import { initFormListeners, setLoadedPhotos } from './form.js';
import { initEffects } from './effects.js';

const init = async () => {
  try {
    const photos = await getPhotos();
    setLoadedPhotos(photos);

    renderThumbnails(photos);
    initFilters(photos);
  } catch (err) {
    const errorTemplate = document.querySelector('#data-error').content.cloneNode(true);
    document.body.appendChild(errorTemplate);
    setTimeout(() => {
      const el = document.querySelector('.data-error');
      if (el) {
        el.remove();
      }
    }, 5000);
  }

  initModalListeners();
  initFormListeners();
  initEffects();
};


init();
