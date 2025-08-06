// Вспомогательные функции
const getRandomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const isEscapeKey = (evt) => evt.key === 'Escape';

const isEnterKey = (evt) => evt.key === 'Enter';

function debounce(callback, delay = 500) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback(...args), delay);
  };
}

export {
  getRandomInteger,
  isEscapeKey,
  isEnterKey,
  debounce
};
