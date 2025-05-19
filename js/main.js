// Вспомогательные функции
const getRandomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const getRandomArrayElement = (array) => array[getRandomInteger(0, array.length - 1)];

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

const generateComments = () => {
  const comments = [];
  const commentsCount = getRandomInteger(0, 30);
  for (let i = 0; i < commentsCount; i++) {
    comments.push(createComment());
  }
  return comments;
};

const createPhoto = (id, comments) => ({
  id: id,
  url: `photos/${id}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(15, 200),
  comments: generateComments(),
});

const createPhotoArray = () => Array.from ({length: 25 }, (_, i) => createPhoto(i + 1));

// Создание массива
const photoDescriptions = createPhotoArray();
console.log(photoDescriptions);
