import "./index.css";
import {
  enableValidation,
  clearValidationErrors,
} from "../components/validate";
import { openModal, closeModal } from "../components/modal";
import { renderNewCard } from "../components/card";
import { initialCards, validationOptions } from "../components/constants";

const profile = document.querySelector(".profile");
const userName = profile.querySelector(".profile__name");
const job = profile.querySelector(".profile__profession");
const profileButton = profile.querySelector(".profile__button_type_edit");
const newCardButton = profile.querySelector(".profile__button_type_add");

const popups = document.querySelectorAll(".popup");

const profilePopup = document.querySelector(".popup_type_profile");
const profileForm = profilePopup.querySelector(".popup__form");
const jobInput = profileForm.querySelector("#job-input");
const nameInput = profileForm.querySelector("#username-input");

const newCardPopup = document.querySelector(".popup_type_add-card");
const newCardForm = newCardPopup.querySelector(".popup__form");
const placeInput = newCardForm.querySelector("#place-input");
const hrefInput = newCardForm.querySelector("#href-input");

const setProfileInputs = () => {
  nameInput.value = userName.textContent;
  jobInput.value = job.textContent;
};
setProfileInputs();
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
  setProfileInputs();
  clearValidationErrors(profilePopup);
  openModal(profilePopup);
});

newCardButton.addEventListener("click", () => {
  newCardForm.reset();
  clearValidationErrors(newCardPopup);
  openModal(newCardPopup);
});

popups.forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    if (
      evt.target.classList.contains("popup") ||
      evt.target.classList.contains("popup__close-button")
    )
      closeModal(popup);
  });
});
