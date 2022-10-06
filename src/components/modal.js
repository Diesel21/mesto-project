const closeAllPopups = () => {
  document.querySelectorAll(".popup").forEach((popup) => {
    popup.classList.remove("popup_opened");
  });
};

const closeHandle = (evt) => {
  if (evt.key === "Escape") closeAllPopups();
};

const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeHandle);
};

const openPopup = (popup) => {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeHandle);
};

export { closePopup as closeModal, openPopup as openModal };
