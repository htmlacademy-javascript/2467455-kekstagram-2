const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

let currentMessage = null;

const removeMessage = () => {
  if (currentMessage) {
    currentMessage.remove();
    document.removeEventListener('keydown', onDocumentKeydown);
    document.removeEventListener('click', onDocumentClick);
    currentMessage = null;
  }
};

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    removeMessage();
  }
}

function onDocumentClick(evt) {
  if (!evt.target.closest('.success__inner') && !evt.target.closest('.error__inner')) {
    removeMessage();
  }
}

const showSuccessMessage = () => {
  currentMessage = successTemplate.cloneNode(true);
  document.body.append(currentMessage);

  currentMessage.querySelector('.success__button').addEventListener('click', removeMessage);
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onDocumentClick);
};

const showErrorMessage = () => {
  currentMessage = errorTemplate.cloneNode(true);
  document.body.append(currentMessage);

  currentMessage.querySelector('.error__button').addEventListener('click', removeMessage);
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onDocumentClick);
};

export { showSuccessMessage, showErrorMessage };
