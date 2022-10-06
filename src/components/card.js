import { openModal } from "./modal";

const cardsGrid = document.querySelector(".cards__grid");
const cardTemplate = document.querySelector("#card").content;

const imagePopup = document.querySelector(".popup_type_image");
const bigSizeImage = imagePopup.querySelector(".popup__image");
const bigSizeImageCaption = imagePopup.querySelector(".popup__caption");

const createNewCard = (name, photoLink) => {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardBox = cardElement.querySelector(".card__box");
  cardBox.querySelector(".card__title").textContent = name;

  const cardPhoto = cardElement.querySelector(".card__photo");
  cardPhoto.src = photoLink;
  cardPhoto.alt = name;

  cardPhoto.addEventListener("click", (e) => {
    bigSizeImage.src = photoLink;
    bigSizeImage.alt = name;
    bigSizeImageCaption.textContent = name;
    openModal(imagePopup);
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

const renderNewCard = (name, photoLink) => {
  cardsGrid.prepend(createNewCard(name, photoLink));
};

export { renderNewCard };
