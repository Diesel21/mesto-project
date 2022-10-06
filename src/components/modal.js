const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
};

const openPopup = (popup) => {
  popup.classList.add("popup_opened");
};

const closeAllPopups = () => {
  document.querySelectorAll(".popup").forEach((popup) => {
    popup.classList.remove("popup_opened");
  });
};

export { closePopup as closeModal, openPopup as openModal, closeAllPopups as closeAllModals };
