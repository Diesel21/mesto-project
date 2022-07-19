const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const cardsGrid = document.querySelector(".cards__grid");
const cardTemplate = document.querySelector("#card").content;

const profile = document.querySelector(".profile");
const userName = profile.querySelector(".profile__name");
const job = profile.querySelector(".profile__profession");
const profileButton = profile.querySelector(".profile__button_type_edit");
const newCardButton = profile.querySelector(".profile__button_type_add");

const profilePopup = document.querySelector(".popup_type_profile");
const profileForm = profilePopup.querySelector(".popup__form");
const jobInput = profileForm.querySelector(".popup__input_type_job");
const nameInput = profileForm.querySelector(".popup__input_type_name");

const newCardPopup = document.querySelector(".popup_type_add-card");
const newCardForm = newCardPopup.querySelector(".popup__form");
const placeInput = newCardForm.querySelector(".popup__input_type_place");
const hrefInput = newCardForm.querySelector(".popup__input_type_href");

const imagePopup = document.querySelector(".popup_type_image");
const bigSizeImage = imagePopup.querySelector(".popup__image");
const bigSizeImageCaption = imagePopup.querySelector(".popup__caption");

const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
};
const openPopup = (popup) => {
  popup.classList.add("popup_opened");
};

const createrNewCard = (card) => {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardBox = cardElement.querySelector(".card__box");
  cardBox.querySelector(".card__title").textContent = card.name;

  const cardPhoto = cardElement.querySelector(".card__photo");
  cardPhoto.src = card.link;
  cardPhoto.alt = card.name;

  cardPhoto.addEventListener("click", (e) => {
    bigSizeImage.src = card.link;
    bigSizeImage.alt = card.name;
    bigSizeImageCaption.textContent = card.name;
    openPopup(imagePopup);
  });

  const likeButton = cardBox.querySelector(".card__button_type_like");
  likeButton.addEventListener("click", (e) => {
    likeButton.classList.toggle("card__button_like-active");
  });

  const deleteButton = cardElement.querySelector(".card__button_type_delete");
  deleteButton.addEventListener("click", (e) => {
    cardElement.remove();
  });

  return cardElement;
};
const renderCard = (cardElement) => {
  cardsGrid.prepend(cardElement);
};

initialCards.forEach((card) => {
  renderCard(createrNewCard(card));
});

profileForm.addEventListener("submit", (e) => {
  e.preventDefault();
  userName.textContent = nameInput.value;
  job.textContent = jobInput.value;
  closePopup(profilePopup)
})

newCardForm.addEventListener("submit", (e) => {
  e.preventDefault();
  renderCard(createrNewCard({
    name: placeInput.value,
    link: hrefInput.value
  }))
  newCardForm.reset();
  closePopup(newCardPopup);
})

profileButton.addEventListener("click", () => {
  nameInput.value = userName.textContent;
  jobInput.value = job.textContent;
  openPopup(profilePopup);
});

newCardButton.addEventListener("click", () => {
  openPopup(newCardPopup);
});

document.querySelectorAll(".popup").forEach((popup) => {
  popup.querySelector(".popup__close-button").addEventListener("click", () => {
    closePopup(popup);
  });
});
