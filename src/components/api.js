const config = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-15",
  headers: {
    authorization: "99c8957e-2f0c-4280-8057-91a4e8729164",
    "Content-Type": "application/json",
  },
};

const handleRes = (res) =>
  res.ok ? Promise.resolve(res) : Promise.reject(`Ошибка: ${res.status}`);
const handleJson = (res) => res.json();
const handleError = (error) => console.log(error);

const getCards = () => {
  return fetch(`${config.baseUrl}/cards`, { headers: config.headers })
    .then(handleRes)
    .then(handleJson);
};

const getUser = () => {
  return fetch(`${config.baseUrl}/users/me`, { headers: config.headers })
    .then(handleRes)
    .then(handleJson);
};

const updateUserInfo = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name,
      about,
    }),
  })
    .then(handleRes)
    .then(handleJson);
};

const addNewCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name,
      link,
    }),
  })
    .then(handleRes)
    .then(handleJson);
};

const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(handleRes);
};

const likeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  })
    .then(handleRes)
    .then(handleJson);
};

const unlikeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then(handleRes)
    .then(handleJson);
};

const setUserAvatar = (imageLink) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({ avatar: imageLink }),
  })
    .then(handleRes)
    .then(handleJson);
};

export {
  getCards,
  getUser,
  updateUserInfo,
  addNewCard,
  deleteCard,
  likeCard,
  unlikeCard,
  setUserAvatar,
  handleError,
};
