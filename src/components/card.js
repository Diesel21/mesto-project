import { openModal } from "./modal";
import { deleteCard, likeCard, unlikeCard } from "./api";
import { handleError, handleJson } from "./utils";

const cardsGrid = document.querySelector(".cards__grid");
const cardTemplate = document.querySelector("#card").content;

const imagePopup = document.querySelector(".popup_type_image");
const bigSizeImage = imagePopup.querySelector(".popup__image");
const bigSizeImageCaption = imagePopup.querySelector(".popup__caption");

const setLikeBox = (cardBox, likes, _id, ownerId) => {
  const likeButton = cardBox.querySelector(".card__button_type_like");
  const likeCount = cardBox.querySelector(".card__like-counter");
  likeCount.textContent = likes.length;

  if (likes.some((like) => like._id === ownerId))
    likeButton.classList.add("card__button_like-active");

  likeButton.addEventListener("click", (e) => {
    if (likeButton.classList.contains("card__button_like-active")) {
      unlikeCard(_id)
        .then(handleJson)
        .then((card) => {
          likeCount.textContent = card.likes.length;
          likeButton.classList.remove("card__button_like-active");
        })
        .catch(handleError);
    } else {
      likeCard(_id)
        .then(handleJson)
        .then((card) => {
          likeCount.textContent = card.likes.length;
          likeButton.classList.add("card__button_like-active");
        })
        .catch(handleError);
    }
  });
};

const createNewCard = ({ name, link, likes, owner, _id }, ownerId) => {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardBox = cardElement.querySelector(".card__box");
  cardBox.querySelector(".card__title").textContent = name;

  const cardPhoto = cardElement.querySelector(".card__photo");
  cardPhoto.src = link;
  cardPhoto.alt = name;

  cardPhoto.addEventListener("click", (e) => {
    bigSizeImage.src = link;
    bigSizeImage.alt = name;
    bigSizeImageCaption.textContent = name;
    openModal(imagePopup);
  });

  setLikeBox(cardBox, likes, _id, ownerId);

  if (owner._id === ownerId) {
    const deleteButton = cardElement.querySelector(".card__button_type_delete");
    deleteButton.style.display = "block";
    deleteButton.addEventListener("click", () => {
      deleteCard(_id)
        .then((res) =>
          res.ok
            ? cardElement.remove()
            : Promise.reject(`Ошибка: ${res.status}`)
        )
        .catch(handleError);
    });
  }
  return cardElement;
};

const renderNewCard = (card, ownerId) => {
  cardsGrid.prepend(createNewCard(card, ownerId));
};

export { renderNewCard };
