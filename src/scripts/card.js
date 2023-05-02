import {
	openPopup
} from './utils.js';




const cardTemplate = document.querySelector('#card').content;
const cardsContainer = document.querySelector('.cards');
const popupZoom = document.querySelector('.popup_form_opened-image');
const popupImage = popupZoom.querySelector('.popup__image');
const popupText = popupZoom.querySelector('.popup__text');

const popupFormCreate = document.querySelector('.popup__form_belong_card');
const popupName = popupFormCreate.querySelector('.popup__field_belong_name');
const popupNote = popupFormCreate.querySelector('.popup__field_belong_note');


import {
	deleteCard,
	addLike
} from './api.js'


function createCardTemplate(link, text, sum, buttonSwap, cardId, id) {
	const cardCloneElement = cardTemplate.querySelector('.card').cloneNode(true);
	const buttonDelete = cardCloneElement.querySelector('.card__close');
	const cardImage = cardCloneElement.querySelector('.card__image');
	const cardTitle = cardCloneElement.querySelector('.card__title');
	const cardLikeSumm = cardCloneElement.querySelector('.card__like-sum');
	const cardLike = cardCloneElement.querySelector('.card__like');
	
	
	cardImage.src = `${link}`;
	cardImage.alt = `${text}`;
	cardTitle.textContent = `${text}`;
	cardLikeSumm.textContent = `${sum}`;
	id.forEach((item) => {
		if(item._id === '18fe758bd624620838d3446e'){
			cardLike.classList.add('card__like_active');
		}
	})
	
	cardImage.addEventListener('click', ()=> {
		openPopup(popupZoom);
		popupImage.src = `${cardImage.src}`;
		popupImage.alt = `${cardTitle.textContent}`;
		popupText.textContent = `${cardTitle.textContent}`
	});
	
	buttonDelete.disabled = buttonSwap;

	buttonDelete.addEventListener('click', () => {
		const deleteItem = buttonDelete.closest('.card');
		deleteCard(cardId)
		.then((res) => {
			if(res.ok){
				return res.json();
			}
			return Promise.reject(`Что-то пошло не так: ${res.status}`)
		})
	
		.catch(err => console.log(err));
		deleteItem.remove();
	});



	
cardLike.addEventListener('click', evt => {
	if(cardLike.classList.contains('card__like_active')){
		addLike(cardId, 'DELETE')
			.then((res) => {
				if(res.ok){
					return res.json();
				}
				return Promise.reject(`Что-то пошло не так: ${res.status}`)
			})
			.then((item) => {
				evt.target.classList.remove('card__like_active');
				cardLikeSumm.textContent = item.likes.length;
			})
			.catch(err => console.log(err));
	} else {
		addLike(cardId, 'PUT')
	.then((res) => {
		if(res.ok){
			return res.json();
		}
		return Promise.reject(`Что-то пошло не так: ${res.status}`)
	})
	.then((result) => {
		evt.target.classList.add('card__like_active');
		cardLikeSumm.textContent = result.likes.length;
	})
	.catch(err => console.log(err));
	}
})
		

	
	return cardCloneElement;
};



export { popupFormCreate, createCardTemplate, cardsContainer, popupName, popupNote }

