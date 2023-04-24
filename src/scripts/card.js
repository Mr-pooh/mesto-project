import {
	openPopup,		
	closePopup
} from './utils.js';

import {
	popupAdd
} from './modal.js'

const initialCards = [
	{
		name: 'Архыз',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
	},
	{
		name: 'Челябинская область',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
	},
	{
		name: 'Иваново',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
	},
	{
		name: 'Камчатка',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
	},
	{
		name: 'Холмогорский район',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
	},
	{
		name: 'Байкал',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
	}
];

const cardTemplate = document.querySelector('#card').content;
const cardsContainer = document.querySelector('.cards');
const popupZoom = document.querySelector('.popup_form_opened-image');
const popupImage = popupZoom.querySelector('.popup__image');
const popupText = popupZoom.querySelector('.popup__text');

const popupFormCreate = document.querySelector('.popup__form_belong_card');
const popupName = popupFormCreate.querySelector('.popup__field_belong_name');
const popupNote = popupFormCreate.querySelector('.popup__field_belong_note');

function handleCard(evt) {
	evt.preventDefault();
	cardsContainer.prepend(createCardTemplate(popupNote.value, popupName.value));
	popupFormCreate.reset();
	closePopup(popupAdd);
};





function createCardTemplate(link, text) {
	const cardCloneElement = cardTemplate.querySelector('.card').cloneNode(true);
	const buttonDelete = cardCloneElement.querySelector('.card__close');
	const cardImage = cardCloneElement.querySelector('.card__image');
	const cardTitle = cardCloneElement.querySelector('.card__title');

	const cardLike = cardCloneElement.querySelector('.card__like');
	
	
	cardImage.src = `${link}`;
	cardImage.alt = `${text}`;
	cardTitle.textContent = `${text}`;
	
	cardImage.addEventListener('click', ()=> {
		openPopup(popupZoom);
		popupImage.src = `${cardImage.src}`;
		popupImage.alt = `${cardTitle.textContent}`;
		popupText.textContent = `${cardTitle.textContent}`
	});
	
	buttonDelete.addEventListener('click', () => {
		const deleteItem = buttonDelete.closest('.card');
		deleteItem.remove();
	});
	
	cardLike.addEventListener('click', evt => {
		evt.target.classList.toggle('card__like_active');
	});
	
	return cardCloneElement;
};



export { handleCard, popupFormCreate, createCardTemplate, initialCards, cardsContainer }


