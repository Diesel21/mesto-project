const showInputError = (form, input, inputErrorClass, errorMessage) => {
  const error = form.querySelector(`.${input.id}-error`);

  input.classList.add(inputErrorClass);
  error.textContent = errorMessage;
};
const hideInputError = (form, input, inputErrorClass) => {
  const error = form.querySelector(`.${input.id}-error`);

  input.classList.remove(inputErrorClass);
  error.textContent = "";
};

const validateInput = (form, input, inputErrorClass) => {
  if (input.validity.valid) {
    hideInputError(form, input, inputErrorClass);
  } else if (input.validity.patternMismatch) {
    showInputError(form, input, inputErrorClass, input.dataset.errorMessage);
  } else if (input.validity.valueMissing) {
    showInputError(form, input, inputErrorClass, "Вы пропустили это поле.");
  } else {
    showInputError(form, input, inputErrorClass, input.validationMessage);
  }
};

const hasValidState = (inputs) => {
  return !Array.from(inputs).some((input) => {
    return !input.validity.valid;
  });
};

const toggleSubmitButton = (inputs, button) => {
  hasValidState(inputs) ? (button.disabled = false) : (button.disabled = true);
};

const enableValidation = (validationOptions) => {
  const forms = document.querySelectorAll(validationOptions.formSelector);

  forms.forEach((form) => {
    const inputs = form.querySelectorAll(validationOptions.inputSelector);
    const submitButton = form.querySelector(
      validationOptions.submitButtonSelector
    );
    toggleSubmitButton(inputs, submitButton);
    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        validateInput(form, input, validationOptions.inputErrorClass);
        toggleSubmitButton(inputs, submitButton);
      });
    });
  });
};

export { enableValidation};
