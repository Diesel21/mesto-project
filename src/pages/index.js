import "./index.css";
import {
  enableValidation,
  clearValidationErrors,
} from "../components/validate";
import { openModal, closeModal, setLoadState } from "../components/modal";
import { renderNewCard } from "../components/card";
import { validationOptions } from "../components/constants";
import {
  addNewCard,
  getCards,
  getUser,
  updateUserInfo,
  setUserAvatar,
} from "../components/api";
import { handleError, handleJson } from "../components/utils";

let user = {};

const profile = document.querySelector(".profile");
const userName = profile.querySelector(".profile__name");
const job = profile.querySelector(".profile__profession");
const avatar = profile.querySelector(".profile__avatar");
const profileButton = profile.querySelector(".profile__button_type_edit");
const newCardButton = profile.querySelector(".profile__button_type_add");

const popups = document.querySelectorAll(".popup");

const profilePopup = document.querySelector(".popup_type_profile");
const profileForm = profilePopup.querySelector(".popup__form");
const jobInput = profileForm.querySelector("#job-input");
const nameInput = profileForm.querySelector("#username-input");
const profileSubmitButton = profileForm.querySelector(
  validationOptions.submitButtonSelector
);

const newCardPopup = document.querySelector(".popup_type_add-card");
const newCardForm = newCardPopup.querySelector(".popup__form");
const placeInput = newCardForm.querySelector("#place-input");
const hrefInput = newCardForm.querySelector("#href-input");
const newCardSubmitButton = newCardPopup.querySelector(
  validationOptions.submitButtonSelector
);

const avatarPopup = document.querySelector(".popup_type_avatar");
const avatarForm = avatarPopup.querySelector(".popup__form");
const avatarInput = avatarForm.querySelector("#avatar-input");
const avatarSubmitButton = avatarPopup.querySelector(
  validationOptions.submitButtonSelector
);

const setProfileInputs = () => {
  nameInput.value = userName.textContent;
  jobInput.value = job.textContent;
};

const setCards = () => {
  return getCards()
    .then(handleJson)
    .then((cards) =>
      cards
        .sort((prevCard, curCard) =>
          prevCard.createdAt > curCard.createdAt ? 1 : -1
        )
        .forEach((card) => renderNewCard(card, user._id))
    )
    .catch(handleError);
};
const setUser = () => {
  return getUser()
    .then(handleJson)
    .then((userInfo) => {
      user = { ...userInfo };
      userName.textContent = user.name;
      job.textContent = user.about;
      avatar.style.backgroundImage = `url(${user.avatar})`;
    })
    .catch(handleError);
};

setProfileInputs();
enableValidation(validationOptions);
setUser().then(setCards).catch(handleError);

profileForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const returnButtonState = setLoadState(profileSubmitButton);
  updateUserInfo(nameInput.value, jobInput.value)
    .then(handleJson)
    .then((userInfo) => {
      userName.textContent = userInfo.name;
      job.textContent = userInfo.about;
      returnButtonState();
      closeModal(profilePopup);
    })
    .catch(handleError);
});
newCardForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const returnButtonState = setLoadState(newCardSubmitButton);
  addNewCard(placeInput.value, hrefInput.value)
    .then(handleJson)
    .then((card) => {
      renderNewCard(card, user._id);
      newCardForm.reset();
      returnButtonState();
      closeModal(newCardPopup);
    });
});
avatarPopup.addEventListener("submit", (e) => {
  e.preventDefault();
  const returnButtonState = setLoadState(avatarSubmitButton);
  setUserAvatar(avatarInput.value)
    .then(handleJson)
    .then((user) => {
      avatar.style.backgroundImage = `url(${user.avatar})`;
      avatarForm.reset();
      returnButtonState();
      closeModal(avatarPopup);
    })
    .catch(handleError);
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
avatar.addEventListener("click", () => {
  avatarForm.reset();
  clearValidationErrors(avatarPopup);
  openModal(avatarPopup);
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
