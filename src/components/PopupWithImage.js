import Popup from "./Popup";

export default class PopupWithImage extends Popup {
	constructor(selector) {
		super(selector);
		this._popupImage = this._element.querySelector('.popup__image')
		this._popupText = this._element.querySelector('.popup__text')
	}

	open(data) {
		super.open()
		// очистка popup
		this._popupImage.src = '';
		this._popupImage.alt = '';
    this._popupText.textContent = '';

		this._popupImage.src = data.link;
		this._popupImage.alt = data.name;
    this._popupText.textContent = data.name;
		
	}
}