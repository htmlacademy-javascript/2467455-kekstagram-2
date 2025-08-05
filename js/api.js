const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';

const GET_URL = `${BASE_URL}/data`;
const POST_URL = BASE_URL;

const getPhotos = async () => {
  const response = await fetch(GET_URL);
  if (!response.ok) {
    throw new Error('Не удалось загрузить данные с сервера');
  }
  return await response.json();
};

const sendPhoto = async (formData) => {
  const response = await fetch(POST_URL, {
    method: 'POST',
    body: formData,
  });
  if (!response.ok) {
    throw new Error('Не удалось отправить данные на сервер');
  }
};

export { getPhotos, sendPhoto };
