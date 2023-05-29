
export default class Card{
	constructor(	data, selector, renderer ){
		this._cardLink = `${data.link}`;
		this._cardTitle = `${data.name}`;
		this._cardLikeSum = `${data.likes.length}`;
		this._cardLikes = data.likes;
		this._selector = `${selector}`;
		this._cardId = `${data._id}`;
		this._ownerId = `${data.owner._id}`;
		this._renderer = renderer;
	}

	_getElement() {
		const cardCloneElement = document
		.querySelector(this._selector)
		.content
		.querySelector('.card')
		.cloneNode(true);

		return cardCloneElement;
	}

	generate(idPerson, url) {
		this._element = this._getElement();

		this._element.querySelector('.card__close').disabled = this._ownerId !== idPerson;

		this._setEventListeners(url);

		this._element.querySelector('.card__image').src = this._cardLink;
		this._element.querySelector('.card__image').alt = this._cardTitle;
		this._element.querySelector('.card__title').textContent = this._cardTitle;
		this._element.querySelector('.card__like-sum').textContent = this._cardLikeSum;

		this._cardLikes.forEach((item) => {
			if(item._id === idPerson){
				this._element.querySelector('.card__like').classList.add('card__like_active');
			}
		});

		return this._element;
	}

	_setEventListeners(url) {
		this._element.querySelector('.card__image').addEventListener('click', () => {
			this._clickOpenPopup();
		});
		
		this._element.querySelector('.card__like').addEventListener('click', (evt) => {
			this._clickLike(evt, url);
		});

		this._element.querySelector('.card__close').addEventListener('click', () => this._clickDelCard(url));

	}

	_clickLike(evt, url) {
		const itemLike = this._element.querySelector('.card__like');
		if(itemLike.classList.contains('card__like_active')){
			url.getAddLike(this._cardId, 'DELETE')
			.then((item) => {
				evt.target.classList.remove('card__like_active');
				this._element.querySelector('.card__like-sum').textContent = item.likes.length;
			})
			.catch((error) => {
				return console.log(error);
			});
		} else {
			url.getAddLike(this._cardId, 'PUT')
			.then((item) => {
				evt.target.classList.add('card__like_active');
				this._element.querySelector('.card__like-sum').textContent = item.likes.length;
			})
			.catch((error) => {
				return console.log(error);
			});
		}
	}


	_clickDelCard(url) {
		url.getDeleteCard(this._cardId)
		.then(() => {
			this._element.querySelector('.card__close').closest('.card').remove();
		})
		.catch(err => console.log(err));
	}

	_clickOpenPopup(){
		return this._renderer();
	}
	
}