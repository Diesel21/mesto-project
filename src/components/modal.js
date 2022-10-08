const closeByEscPress = (evt) => {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
};

const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEscPress);
};

const openPopup = (popup) => {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEscPress);
};

const setLoadState = (submitButton) => {
  const prevButtonText = submitButton.textContent;
  submitButton.textContent = "Сохранение...";
  submitButton.disabled = true;
  return () => {
    submitButton.textContent = prevButtonText;
    submitButton.disabled = false;
  };
};

export { closePopup as closeModal, openPopup as openModal, setLoadState };
