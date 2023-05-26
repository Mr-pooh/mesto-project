

export default class Card{
	constructor(	data, selector ){
		this._cardLink = `${data.link}`;
		this._cardTitle = `${data.name}`;
		this._cardLikeSum = `${data.likes.length}`;
		this._selector = `${selector}`;
		this._cardId = `${data._id}`;
		this._ownerId = `${data.owner._id}`
	}

	_getElement() {
		const cardCloneElement = document
		.querySelector(this._selector)
		.content
		.querySelector('.card')
		.cloneNode(true);

		return cardCloneElement;
	}

	generate(idPerson) {
		this._element = this._getElement();

		this._element.querySelector('.card__close').disabled = this._ownerId !== idPerson;

		this._setEventListeners();

		this._element.querySelector('.card__image').src = this._cardLink;
		this._element.querySelector('.card__image').alt = this._cardTitle;
		this._element.querySelector('.card__title').textContent = this._cardTitle;
		this._element.querySelector('.card__like-sum').textContent = this._cardLikeSum;

		return this._element;
	}

	_setEventListeners() {
		this._element.querySelector('.card__image').addEventListener('click', () => {

		});
		
		this._element.querySelector('.card__like').addEventListener('click', (evt) => {
			this._clickLike();
		});

		this._element.querySelector('.card__close').addEventListener('click', () => {
			this._clickDelCard();
		});

	}

	_clickLike() {
		const itemLike = this._element.querySelector('.card__like');
		if(itemLike.classList.contains('card__like_active')){
			itemLike.classList.remove('card__like_active');
		} else {
			itemLike.classList.add('card__like_active');
		}
	}

	_clickDelCard() {
		const deleteItem = this._element.querySelector('.card__close').closest('.card');
		deleteItem.remove();
	}

	_clickOpenPopup(){
		
	}
	
}