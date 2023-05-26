import Popup from "./Popup";

export default class PopupWithImage extends Popup {
	constructor(data, selector) {
		super(selector);
		this._imageUrl = data.src
		this._imageText = data.textContent
	}

	open() {
		super.open()
		
		const _popupImage = this._element.querySelector('.popup__image')
		const _popupText = this._element.querySelector('.popup__text')

		// очистка popup
		_popupImage.src = '';
		_popupImage.alt = '';
    _popupText.textContent = '';

		_popupImage.src = this._imageUrl;
		_popupImage.alt = this._imageText;
    _popupText.textContent = this._imageText;
		
	}
}