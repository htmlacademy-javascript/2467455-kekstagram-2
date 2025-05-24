import {getRandomArrayElement} from './util.js';
import {getRandomInteger} from './util.js';

// Данные для генерации
const DESCRIPTIONS = [
  'Закат на море', 'Прогулка по лесу', 'Город в огнях', 'Уютный вечер', 'Вид с горы'
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Артем', 'Мария', 'Иван', 'София', 'Алексей', 'Полина', 'Михаил', 'Диана'
];

let commentId = 1;

const getRandomUniqueElements = (arr, count) => {
  const copy = [...arr];
  const result = [];

  while (result.length < count && copy.length > 0) {
    const index = getRandomInteger(0, copy.length - 1);
    result.push(copy.splice(index, 1)[0]);
  }

  return result;
};

const generateMessage = () => {
  const sentenceCount = getRandomInteger(1, 2);
  const sentences = getRandomUniqueElements(MESSAGES, sentenceCount);
  return sentences.join(' ');
};

const createComment = () => ({
  id: commentId++,
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: generateMessage(),
  name: getRandomArrayElement(NAMES)
});

const generateComment = () => {
  const commentsCount = getRandomInteger(0, 30);
  return Array.from({ length: commentsCount }, () => createComment());
};

const LIKES_COUNT_NUM1 = 15;
const LIKES_COUNT_NUM2 = 200;

const createPhoto = (id) => ({
  id: id,
  url: `photos/${id}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger (LIKES_COUNT_NUM1, LIKES_COUNT_NUM2),
  comments: generateComment(),
});

const PHOTO_COUNT = 25;

const createPhotoArray = () => Array.from({length: PHOTO_COUNT}, (_, i) => createPhoto(i + 1));

// Создание массива
const photoDescriptions = createPhotoArray();
export {photoDescriptions};

