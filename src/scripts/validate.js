
const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
	const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
	inputElement.classList.add(inputErrorClass);
	errorElement.textContent = errorMessage;
	errorElement.classList.add(errorClass);
};

const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
	const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
	inputElement.classList.remove(inputErrorClass);
	errorElement.classList.remove(errorClass);
	errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, {inputErrorClass, errorClass}) => {
	if (inputElement.validity.patternMismatch) {
			inputElement.setCustomValidity(inputElement.dataset.errorMessage);
	} 
	else {
		inputElement.setCustomValidity("");
	}

	if (!inputElement.validity.valid) {
		showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
	} else {
		hideInputError(formElement, inputElement, inputErrorClass, errorClass);
	}
};

const setEventListeners = (formElement, {inputSelector, submitButtonSelector, ...arr}) => {
	const inputList = Array.from(formElement.querySelectorAll(inputSelector));
	const buttonElement = formElement.querySelector(submitButtonSelector);
	toggleButtonState(inputList, buttonElement);
	formElement.addEventListener('reset', () => {
    disableButton(buttonElement);
  });
	inputList.forEach((inputElement) => {
		inputElement.addEventListener('input', () => {
			checkInputValidity(formElement, inputElement, arr);
		
			toggleButtonState(inputList, buttonElement);
		});
	});
};

const enableValidation = ({formSelector, ...rest}) => {
	const formList = Array.from(document.querySelectorAll(formSelector));
	formList.forEach((formElement) => {
		setEventListeners(formElement, rest);
	});
};

function hasInvalidInput(inputList) {
	return inputList.some((inputElement) => {
		return !inputElement.validity.valid;
	})
}


function disableButton (buttonElement) {
	buttonElement.disabled = true;
}

function toggleButtonState(inputList, buttonElement) {
	if(hasInvalidInput(inputList)) {
		disableButton(buttonElement);
	}
	else {
		buttonElement.disabled = false;
	}
}

export { enableValidation }