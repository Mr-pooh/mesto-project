import Popup from "./Popup";

export default class PopupWithForm extends Popup {
	constructor({actionSubmit}, selector) {
		super(selector);
		this._actionSubmit = actionSubmit
		this._refHandleSubmitForm = this._handleSubmitForm.bind(this)
	}

	// получение данных всех полей формы
	_getInputValues() {
		this._inputList = this._element.querySelectorAll('.popup__field');

		this._formValues = {};
	
		this._inputList.forEach(input => {
			this._formValues[input.name] = input.value;
		});
	
		return this._formValues;
	}

	close() {
		super.close()
		
		// удаление слушателя сабмита
		this._element.removeEventListener('keyup', this._refHandleSubmitForm);
		
		// сброс значения полей формы при закрытии
		this._popupForm.reset();
	}

	// выполняет вызов колбек-функ. которая сохр. на сервере значение полей
	_handleSubmitForm(evt) {
		evt.preventDefault();

		this._actionSubmit(this._getInputValues())
	}

	setEventListeners() {
		super.setEventListeners()

		this._popupForm = this._element.querySelector('.popup__form')

		// обработчик сабмита формы
		this._popupForm.addEventListener('submit', this._refHandleSubmitForm)
	}
}