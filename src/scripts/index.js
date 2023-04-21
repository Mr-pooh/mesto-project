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


buttonInfo.addEventListener('click', () => {
	openPopup(popupEdit);
	inputName.value = profileName.textContent;
	inputNote.value = profileJob.textContent;
 });

const buttonsClose = document.querySelectorAll('.popup__button-close');
buttonsClose.forEach(item => {
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





/* import { showInputError,
	hideInputError,
	checkInputValidity,
	setEventListeners,
	enableValidation,
	hasInvalidInput,
	toggleButtonState } from './validate.js';

	enableValidation(); 


	const showInputError = (formElement, inputElement, errorMessage) => {
		const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
		inputElement.classList.add('popup__field_type_error');
		errorElement.textContent = errorMessage;
		errorElement.classList.add('popup__field-error_active');
	};
	
	const hideInputError = (formElement, inputElement) => {
		const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
		inputElement.classList.remove('popup__field_type_error');
		errorElement.classList.remove('popup__field-error_active');
		errorElement.textContent = '';
	};
	
	const checkInputValidity = (formElement, inputElement) => {
		if (inputElement.validity.patternMismatch) {
			// данные атрибута доступны у элемента инпута через ключевое слово dataset.
			// обратите внимание, что в js имя атрибута пишется в camelCase (да-да, в
			// HTML мы писали в kebab-case, это не опечатка)
				inputElement.setCustomValidity(inputElement.dataset.errorMessage);
		} 
		else {
			inputElement.setCustomValidity("");
		}

		if (!inputElement.validity.valid) {
			showInputError(formElement, inputElement, inputElement.validationMessage);
		} 
		else {
			hideInputError(formElement, inputElement);
		}
	};

	const setEventListeners = (formElement) => {
		const inputList = Array.from(formElement.querySelectorAll('.popup__field'));
		const buttonElement = formElement.querySelector('.popup__button-save');
		toggleButtonState(inputList, buttonElement);
		inputList.forEach((inputElement) => {
			inputElement.addEventListener('input', () => {
				checkInputValidity(formElement, inputElement);
				toggleButtonState(inputList, buttonElement);
			});
			
			
		});
	};
	
	const enableValidation = () => {
		const formList = Array.from(document.querySelectorAll('.popup__form'));
		formList.forEach((formElement) => {
			setEventListeners(formElement);
		});
	};

	
	enableValidation();
	
	
	function hasInvalidInput(inputList) {
		return inputList.some((inputElement) => {
			return !inputElement.validity.valid;
		})
	}
	
	function toggleButtonState(inputList, buttonElement) {
		if(hasInvalidInput(inputList)) {
			buttonElement.disabled = true;
		}
		else {
			buttonElement.disabled = false;
		}
	}





const popupAdd = document.querySelector('.popup_form_add');
const popupEdit = document.querySelector('.popup_form_edit');
const popupZoom = document.querySelector('.popup_form_opened-image');
const buttonAdd = document.querySelector('.profile__add-button');
const buttonInfo = document.querySelector('.profile-info__edit-button');


function openPopup(item) {
	item.classList.add('popup_opened');
	document.addEventListener('click', closeOverlay);
	document.addEventListener('keyup', closePopupEscape);
}



function closePopupEscape(evt) {
	
	evt.preventDefault();
	if(evt.key !== 'Escape') {
	}
	else if(document.querySelector('.popup_opened')){
		closePopup(document.querySelector('.popup_opened'))
	}	
}

function closeOverlay(evt) {
	if(evt.target.classList.contains('popup')) {
		evt.target.classList.remove('popup_opened')
	}
}



function closePopup(item) {
	item.classList.remove('popup_opened');
	document.removeEventListener('click', closeOverlay);
	document.removeEventListener('keyup', closePopupEscape);
}

buttonAdd.addEventListener('click', () => {

	openPopup(popupAdd);
});

const buttonsClose = document.querySelectorAll('.popup__button-close');

buttonsClose.forEach(item => {
	item.addEventListener('click', () => {
		closePopup(item.closest('.popup'));
	});
})










const profileName = document.querySelector('.profile-info__name');
const profileJob = document.querySelector('.profile-info__profession');
const popupFormInfo = document.querySelector('.popup__form_belong_profile');
const inputName = popupFormInfo.querySelector('.popup__field_belong_name');
const inputNote = popupFormInfo.querySelector('.popup__field_belong_note');

buttonInfo.addEventListener('click', () => {
 openPopup(popupEdit);
 inputName.value = profileName.textContent;
 inputNote.value = profileJob.textContent;
});

function submitFormInfo(evt) {
	evt.preventDefault();
	profileName.textContent = inputName.value;
	profileJob.textContent = inputNote.value;
	closePopup(popupEdit);
}
popupFormInfo.addEventListener('submit', submitFormInfo);



const cardTemplate = document.querySelector('#card').content;
const cardsContainer = document.querySelector('.cards');
const popupImage = popupZoom.querySelector('.popup__image');
const popupText = popupZoom.querySelector('.popup__text');

function createCardTemplate(link, text) {
	const cardCloneElement = cardTemplate.querySelector('.card').cloneNode(true);
	const buttonDelete = cardCloneElement.querySelector('.card__close');
	const cardImage = cardCloneElement.querySelector('.card__image');
	const cardTitle = cardCloneElement.querySelector('.card__title');


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

	cardCloneElement.addEventListener('click', evt => {
		if(evt.target.classList.contains('card__like')){
			evt.target.classList.toggle('card__like_active');
		}
	});

	return cardCloneElement;
};

initialCards.forEach(item => {
	cardsContainer.append(createCardTemplate(item.link, item.name));
});

const popupFormCreate = document.querySelector('.popup__form_belong_card');
const popupName = popupFormCreate.querySelector('.popup__field_belong_name');
const popupNote = popupFormCreate.querySelector('.popup__field_belong_note');

function handleCard(evt) {
	evt.preventDefault();
	cardsContainer.prepend(createCardTemplate(popupNote.value, popupName.value));
	popupFormCreate.reset();
	closePopup(popupAdd);
};

popupFormCreate.addEventListener('submit', handleCard); */