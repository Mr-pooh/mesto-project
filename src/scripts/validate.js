
const showInputError = (formElement, inputElement, errorMessage) => {
	const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
	inputElement.classList.add('popup__field_type_error');
	errorElement.textContent = errorMessage;
	errorElement.classList.add('popup__field-error_active');
};

const hideInputError = (formElement, inputElement) => {
	const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
	inputElement.classList.remove('popup__field_type_error');
	errorElement.classList.remove('popup__field-error_active');
	errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
	if (inputElement.validity.patternMismatch) {
		// данные атрибута доступны у элемента инпута через ключевое слово dataset.
		// обратите внимание, что в js имя атрибута пишется в camelCase (да-да, в
		// HTML мы писали в kebab-case, это не опечатка)
			inputElement.setCustomValidity(inputElement.dataset.errorMessage);
	} 
	else {
		inputElement.setCustomValidity("");
	}

	if (!inputElement.validity.valid) {
		showInputError(formElement, inputElement, inputElement.validationMessage);
	} else {
		hideInputError(formElement, inputElement);
	}
};

const setEventListeners = (formElement) => {
	const inputList = Array.from(formElement.querySelectorAll('.popup__field'));
	const buttonElement = formElement.querySelector('.popup__button-save');
	toggleButtonState(inputList, buttonElement);
	inputList.forEach((inputElement) => {
		inputElement.addEventListener('input', () => {
			checkInputValidity(formElement, inputElement);
		
			toggleButtonState(inputList, buttonElement);
		});
	});
};

const enableValidation = () => {
	const formList = Array.from(document.querySelectorAll('.popup__form'));
	formList.forEach((formElement) => {
		formElement.addEventListener('submit', function (evt) {
			evt.preventDefault();
			
		});
		setEventListeners(formElement);
	});
};

function hasInvalidInput(inputList) {
	return inputList.some((inputElement) => {
		return !inputElement.validity.valid;
	})
}

function toggleButtonState(inputList, buttonElement) {
	if(hasInvalidInput(inputList)) {
		buttonElement.disabled = true;
	}
	else {
		buttonElement.disabled = false;
	}
}

export { enableValidation }