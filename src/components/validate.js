const validationConfiguration = {
  formSelector: "",
  inputSelector: "",
  submitButtonSelector: "",
  inputErrorClass: "",
};
const setConfiguration = (inputConfiguration) => {
  for (let key of Object.keys(validationConfiguration)) {
    validationConfiguration[key] = inputConfiguration[key];
  }
};

const showInputError = (form, input, errorMessage) => {
  const error = form.querySelector(`.${input.id}-error`);

  input.classList.add(validationConfiguration.inputErrorClass);
  error.textContent = errorMessage;
};
const hideInputError = (form, input) => {
  const error = form.querySelector(`.${input.id}-error`);

  input.classList.remove(validationConfiguration.inputErrorClass);
  error.textContent = "";
};

const validateInput = (form, input) => {
  if (input.validity.valid) {
    hideInputError(form, input);
  } else if (input.validity.patternMismatch) {
    showInputError(form, input, input.dataset.errorMessage);
  } else if (input.validity.valueMissing) {
    showInputError(form, input, "Вы пропустили это поле.");
  } else {
    showInputError(form, input, input.validationMessage);
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

const clearValidationErrors = (popup) => {
  const form = popup.querySelector(validationConfiguration.formSelector);
  const inputs = form.querySelectorAll(validationConfiguration.inputSelector);
  const submitButton = form.querySelector(
    validationConfiguration.submitButtonSelector
  );

  inputs.forEach((input) => hideInputError(form, input));
  toggleSubmitButton(inputs, submitButton);
};

const setEventListeners = (form) => {
  const inputs = form.querySelectorAll(validationConfiguration.inputSelector);
  const submitButton = form.querySelector(
    validationConfiguration.submitButtonSelector
  );
  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      validateInput(form, input, validationConfiguration.inputErrorClass);
      toggleSubmitButton(inputs, submitButton);
    });
  });
};

const enableValidation = (validationOptions) => {
  setConfiguration(validationOptions);
  const forms = document.querySelectorAll(validationConfiguration.formSelector);
  forms.forEach((form) => {
    setEventListeners(form);
  });
};

export { enableValidation, clearValidationErrors };
