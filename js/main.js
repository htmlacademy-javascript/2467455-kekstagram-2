// Вспомогательные функции
function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomArrayElement(array) {
  return array[getRandomInteger(0, array.length - 1)];
}

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

function createComment() {
  const message = getRandomArrayElement(MESSAGES);
  const secondMessage = Math.random() < 0.5 ? '' : ` ${ getRandomArrayElement(MESSAGES)}`;
  return {
    id: commentId++,
    avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
    message: message + secondMessage,
    name: getRandomArrayElement(NAMES)
  };
}

function createPhoto(id) {
  const comments = [];
  const commentsCount = getRandomInteger(0, 30);
  for (let i = 0; i < commentsCount; i++) {
    comments.push(createComment());
  }

  return {
    id: id,
    url: `photos/${id}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomInteger(15, 200),
    comments: comments
  };
}

function createPhotoArray() {
  const photos = [];
  for (let i = 1; i <= 25; i++) {
    photos.push(createPhoto(i));
  }
  return photos;
}

// Создание массива
const photoDescriptions = createPhotoArray();
console.log(photoDescriptions);
