export default class Popup {
	constructor(selector) {
		this._selector = selector;
		// сохранение ссылок на функ. в переменных для удаления слушателей
		this._refCloseOverlay = this._closeOverlay.bind(this)
		this._refHandleEscClose = this._handleEscClose.bind(this)
		this._refCloseButton = this._closeButton.bind(this)
	}

	_getElement() {
    const _popupElement = document.querySelector(this._selector)
    return _popupElement;
  }

	open() {
		this._element = this._getElement()
		
		this._element.classList.add('popup_opened');
		this.setEventListeners()
	}
	
	close() {
		this._element.classList.remove('popup_opened');

		this._removeListener()
	}

	// удаление слушателей
	_removeListener() {
		document.removeEventListener('click', this._refCloseOverlay);
		document.removeEventListener('keyup', this._refHandleEscClose);
		this._closeBtn.removeEventListener('keyup', this._refCloseButton);
	}

	// закрытие по кнопке Esc
	_handleEscClose(evt) {
		if(evt.key === 'Escape') {
			this.close();
		}
	}
	// закрытие по клику на оверлей
	_closeOverlay(evt) {
		if(evt.target === this._element) {
			this.close();
		}
	}
	// закрытие по кнопке мод. окна
	_closeButton() {
		this.close();
	}

	// установка слушателей
	setEventListeners() {
		this._closeBtn = this._element.querySelector('.popup__button-close')
		
		this._closeBtn.addEventListener('click', this._refCloseButton);
		document.addEventListener('click', this._refCloseOverlay);
		document.addEventListener('keyup', this._refHandleEscClose);
	}
}