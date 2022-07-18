const cardsGrid = document.querySelector(".cards__grid");
const cardTemplate = document.querySelector("#card").content;

const profile = document.querySelector(".profile");
const userName = profile.querySelector(".profile__name");
const job = profile.querySelector(".profile__profession");
const editButton = profile.querySelector(".profile__button_type_edit");
const addButton = profile.querySelector(".profile__button_type_add");

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    alt: "Курорт Архыз.",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    alt: "Красоты челябинской области зимой.",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    alt: "Красивый вид на Иваново в сумерках.",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    alt: "Горы Камчатки.",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    alt: "Архангельская область.",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    alt: "Байкал зимой.",
  },
];

const addNewCard = (card) => {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardBox = cardElement.querySelector(".card__box");
  cardBox.querySelector(".card__title").textContent = card.name;

  const cardPhoto = cardElement.querySelector(".card__photo");
  cardPhoto.src = card.link;
  cardPhoto.alt = card.alt;

  cardPhoto.addEventListener("click", (e) => {
    popupImage.src = cardPhoto.src;
    popupImage.alt = cardPhoto.alt;
    popupCaption.textContent = card.name;
    showImagePopup.classList.toggle("popup_opened");
  });

  const likeButton = cardBox.querySelector(".card__button_type_like");
  likeButton.addEventListener("click", (e) => {
    likeButton.classList.toggle("card__button_like-active");
  });

  const deleteButton = cardElement.querySelector(".card__button_type_delete");
  deleteButton.addEventListener("click", (e) => {
    const parentCard = deleteButton.closest(".card");
    parentCard.remove();
  });

  cardsGrid.prepend(cardElement);
};

initialCards.forEach((card) => {
  addNewCard(card);
});

Array.from(document.querySelectorAll(".popup")).forEach((popup) => {
  popup.querySelector(".popup__close-button").addEventListener("click", () => {
    popup.classList.toggle("popup_opened");
  });
});

const editProfilePopup = document.querySelector(".popup_type_profile");
const editProfileInputs = Array.from(
  editProfilePopup.querySelectorAll(".popup__input")
);
editProfilePopup
  .querySelector("form")
  .addEventListener("submit", (e) => e.preventDefault());
editProfilePopup
  .querySelector(".popup__button")
  .addEventListener("click", () => {
    userName.textContent = editProfileInputs[0].value;
    job.textContent = editProfileInputs[1].value;
    editProfilePopup.classList.toggle("popup_opened");
  });

const showImagePopup = document.querySelector(".popup_type_image");
const popupImage = showImagePopup.querySelector(".popup__image");
const popupCaption = showImagePopup.querySelector(".popup__caption");

const addNewCardPopup = document.querySelector(".popup_type_add-card");
addNewCardPopup
  .querySelector("form")
  .addEventListener("submit", (e) => e.preventDefault());
const newCardInputs = Array.from(
  addNewCardPopup.querySelectorAll(".popup__input")
);
addNewCardPopup
  .querySelector(".popup__button")
  .addEventListener("click", () => {
    addNewCard(
      {
        name: newCardInputs[0].value,
        link: newCardInputs[1].value,
        alt: newCardInputs[0].value,
      }
    );
    newCardInputs.forEach((input) => (input.value = ""));
    addNewCardPopup.classList.toggle("popup_opened");
  });

editButton.addEventListener("click", () => {
  editProfileInputs[0].value = userName.textContent;
  editProfileInputs[1].value = job.textContent;
  editProfilePopup.classList.toggle("popup_opened");
});

addButton.addEventListener("click", () => {
  addNewCardPopup.classList.toggle("popup_opened");
});
