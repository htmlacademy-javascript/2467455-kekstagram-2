import { isEscapeKey } from './util.js';

const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

const body = document.body;

const showMessage = (template) => {
  const messageElement = template.cloneNode(true);
  body.appendChild(messageElement);

  const onMessageClick = () => {
    messageElement.remove();
    document.removeEventListener('keydown', onEscKeydown);
    document.removeEventListener('click', onOutsideClick);
  };

  function onEscKeydown(evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      onMessageClick();
    }
  }

  function onOutsideClick(evt) {
    if (!evt.target.closest('section')) {
      onMessageClick();
    }
  }

  const button = messageElement.querySelector('button');
  button.addEventListener('click', onMessageClick);
  document.addEventListener('keydown', onEscKeydown);
  document.addEventListener('click', onOutsideClick);
};

const showSuccessMessage = () => {
  showMessage(successTemplate);
};

const showErrorMessage = () => {
  showMessage(errorTemplate);
};

export { showSuccessMessage, showErrorMessage };
