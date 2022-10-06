import "./index.css";
import { enableValidation } from "./components/validate";
import { openModal, closeModal} from "./components/modal";
import { renderNewCard } from "./components/card";

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
const validationOptions = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inputErrorClass: "popup__input_incorrect",
};

const profile = document.querySelector(".profile");
const userName = profile.querySelector(".profile__name");
const job = profile.querySelector(".profile__profession");
const profileButton = profile.querySelector(".profile__button_type_edit");
const newCardButton = profile.querySelector(".profile__button_type_add");

const profilePopup = document.querySelector(".popup_type_profile");
const profileForm = profilePopup.querySelector(".popup__form");
const jobInput = profileForm.querySelector("#job-input");
const nameInput = profileForm.querySelector("#username-input");

const newCardPopup = document.querySelector(".popup_type_add-card");
const newCardForm = newCardPopup.querySelector(".popup__form");
const placeInput = newCardForm.querySelector("#place-input");
const hrefInput = newCardForm.querySelector("#href-input");

nameInput.value = userName.textContent;
jobInput.value = job.textContent;

enableValidation(validationOptions);

initialCards.forEach((card) => {
  renderNewCard(card.name, card.link);
});

profileForm.addEventListener("submit", (e) => {
  e.preventDefault();
  userName.textContent = nameInput.value;
  job.textContent = jobInput.value;
  closeModal(profilePopup);
});

newCardForm.addEventListener("submit", (e) => {
  e.preventDefault();
  renderNewCard(placeInput.value, hrefInput.value);
  newCardForm.reset();
  closeModal(newCardPopup);
});

profileButton.addEventListener("click", () => {
  openModal(profilePopup);
});

newCardButton.addEventListener("click", () => {
  openModal(newCardPopup);
});

document.querySelectorAll(".popup").forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("popup")) closeModal(popup);
  });
  popup.querySelector(".popup__close-button").addEventListener("click", () => {
    closeModal(popup);
  });
});
