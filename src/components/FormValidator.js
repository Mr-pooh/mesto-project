export default class FormValidator {
	constructor(options, validatedEl) {
		this._options = options
		this._validatedEl = validatedEl;
	}

	_getElement() {
    const _validatedElement = document.querySelector(this._validatedEl)
    return _validatedElement;
  }

	// Функция, которая добавляет класс с ошибкой
	_showInputError(inputElement) {
		const errorElement = this._element.querySelector(`.${inputElement.id}-error`);

		inputElement.classList.add(this._options.inputErrorClass);
		errorElement.textContent = inputElement.validationMessage;
		errorElement.classList.add(this._options.errorClass)
	}

	// Функция, которая удаляет класс с ошибкой
	_hideInputError(inputElement) {
		const errorElement = this._element.querySelector(`.${inputElement.id}-error`);

		inputElement.classList.remove(this._options.inputErrorClass);
		errorElement.classList.remove(this._options.errorClass)
		errorElement.textContent = ''
	}

	// Функция, которая проверяет валидность поля
	_isValid(inputElement) {

		if (inputElement.validity.patternMismatch) {
			inputElement.setCustomValidity(inputElement.dataset.errorMessage);
		} else {
			inputElement.setCustomValidity("");
		}

		if (!inputElement.validity.valid) {
			// Если поле не проходит валидацию, покажем ошибку
			this._showInputError(inputElement);
		} else {
			// Если проходит, скроем
			this._hideInputError(inputElement);
		}
	}

	// проверка всех полей на валидность
	_hasInvalidInput() {
		return this._inputList.some((inputElement) => {
			return !inputElement.validity.valid;
		})
	}

	_disableButton() {
		this._buttonElement.disabled = true;
	}

	_toggleButtonState() {
		if (this._hasInvalidInput()) {
			this._disableButton();
		} else {
			this._buttonElement.disabled = false
		}
	}

	// установка слушателей на поля ввода
	_setEventListeners() {
		this._inputList = Array.from(this._element.querySelectorAll(this._options.inputSelector));
		this._buttonElement = this._element.querySelector(this._options.submitButtonSelector);

		this._toggleButtonState();
		this._inputList.forEach((inputElement) => {
			inputElement.addEventListener('input', () => {
				this._isValid(inputElement);
				this._toggleButtonState();
			});
		});
	}

	// сброс ошибки и проверка активности кнопки сабмит
	resetValidation() {
		this._inputList.forEach((inputElement) => {
			this._hideInputError(inputElement)
		});
		
		this._toggleButtonState();
		}

	enableValidation() {
		this._element = this._getElement()
		this._setEventListeners()
	}

}