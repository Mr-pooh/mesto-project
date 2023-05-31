
export default class Card{
	constructor(	{data, selector, handleCardClick, addListenerDel, addListenerLike} ){
		this._cardLink = `${data.link}`;
		this._cardTitle = `${data.name}`;
		this._cardLikeSum = `${data.likes.length}`;
		this._cardLikes = data.likes;
		this._selector = `${selector}`;
		this._cardId = `${data._id}`;
		this._ownerId = `${data.owner._id}`;
		this._handleCardClick = handleCardClick;
		this._addListenerDel = addListenerDel;
		this._addListenerLike = addListenerLike;
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
		
		this._element.querySelector('.card__image').src = this._cardLink;
		this._element.querySelector('.card__image').alt = this._cardTitle;
		this._element.querySelector('.card__title').textContent = this._cardTitle;
		this._element.querySelector('.card__like-sum').textContent = this._cardLikeSum;
		
		this._cardLikes.forEach((item) => {
			if(item._id === idPerson){
				this._element.querySelector('.card__like').classList.add('card__like_active');
			}
		});
		this._setEventListeners();
		
		return this._element;
	}

	_setEventListeners() {
		this._element.querySelector('.card__image').addEventListener('click', () => {
			this._clickOpenPopup();
		});
		
		this._element.querySelector('.card__like').addEventListener('click', (evt) => {
			this._clickLike(evt);
		});

		this._element.querySelector('.card__close').addEventListener('click', (evt) => this._clickDelCard(evt));

	}

	_clickLike(evt) {
		const itemLike = this._element.querySelector('.card__like');
		if(itemLike.classList.contains('card__like_active')){
			this._addListenerLike(evt, 'DELETE');
		} else {
			this._addListenerLike(evt, 'PUT');
		}
	}


	_clickDelCard(evt) {
		this._addListenerDel(evt);
	}

	_clickOpenPopup(){
		return this._handleCardClick();
	}

	addLike(evt, res) {
		evt.target.classList.toggle('card__like_active');
		evt.target.closest('.card').querySelector('.card__like-sum').textContent = res.likes.length;
	}
	
	removeCard(evt) {
		evt.target.closest('.card').remove()
	}

}