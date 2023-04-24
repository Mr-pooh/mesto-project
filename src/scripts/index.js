import '../pages/index.css';

import { 
	popupEdit,
	popupFormInfo,
	buttonInfo,
	submitFormInfo, 
	profileName,
	profileJob,
	inputName,
	inputNote, 
	buttonAdd,
	popupAdd
} from './modal.js';

import { 
	handleCard,
	popupFormCreate,
	initialCards,
	createCardTemplate,
	cardsContainer
} from './card.js';

import {
	enableValidation
} from './validate.js'


import {
	openPopup,		
	closePopup 
} from './utils.js';


buttonInfo.addEventListener('click', (evt) => {
	openPopup(popupEdit);
	
	inputName.value = profileName.textContent;
	inputNote.value = profileJob.textContent;
	
 });

const closeButtons = document.querySelectorAll('.popup__button-close'); //Таки там же кнопки 'buttons' то бишь во множественном. 
closeButtons.forEach(item => {
	item.addEventListener('click', () => {
		closePopup(item.closest('.popup'));
	});
});

popupFormInfo.addEventListener('submit', submitFormInfo);



buttonAdd.addEventListener('click', () => {
	openPopup(popupAdd);
});

popupFormCreate.addEventListener('submit', handleCard);

initialCards.forEach(item => {
	cardsContainer.append(createCardTemplate(item.link, item.name));
});


enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__button-save',
  inputErrorClass: 'popup__field_type_error',
  errorClass: 'popup__field-error_active'
}); 