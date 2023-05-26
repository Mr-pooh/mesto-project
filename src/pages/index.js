import './index.css';

import { 
	// popupEdit,
	buttonInfo,
	profileName,
	profileJob,
	inputName,
	inputNote, 
	buttonAdd,
	// popupAdd,
	// popupFormInfo,
	// popupAvatar,
	avatarImage,
	buttonImage,
	// popupFormAvatar,
	// inputAvatar
} from '../scripts/modal';

import { 
	// popupFormCreate,
	cardsContainer,
	createCardTemplate,
	// popupName,
	// popupNote
} from '../scripts/card.js';

import {
	enableValidation
} from '../scripts/validate.js'


import {
	// openPopup,		
	// closePopup,
	renderLoading
} from '../scripts/utils.js';

import {
	// downloadCards,
	// downloadProfileInfo,
	// swapTextProfile,
	// addCardOnServer,
	// swapImage
} from '../scripts/api.js'

// импорт классов
import {api} from '../components/Api.js'
import PopupWithForm from '../components/PopupWithForm';
import PopupWithImage from '../components/PopupWithImage';


// инициализация классов popup, без popup для картинки
const popupAddFormClass = new PopupWithForm({
	renderer: (formData) => {
		// renderLoading(true, popupFormCreate, 'Сохранение...');
		api.getAddCardOnServer(formData.inputName, formData.inputUrl)
			.then((item) => {
				console.log('getAddCardOnServer-item', item)
				cardsContainer.prepend(createCardTemplate(item.link, item.name, item.likes.length, false, item._id, item.likes, false));
			})
			.catch(err => console.log('popupAddFormClass', err))
			.finally(() => {
				// renderLoading(false, popupFormCreate, 'Создать');
			})
	}
}, '.popup_form_add');
const popupAvatarFormClass = new PopupWithForm({
	renderer: (formData) => {
		// renderLoading(true, popupFormAvatar, 'Сохранение...');
		api.getSwapAvatar(formData.inputUrl)
			.then((res) => {
				console.log('getSwapAvatar-res', res)
				avatarImage.src = res.avatar;
			})
			.catch(err => console.log('popupAvatarFormClass', err))
			.finally(() => {
				// renderLoading(false, popupFormAvatar, 'Сохранить');
			})
	}
}, '.popup_form_avatar');
const popupEditFormClass = new PopupWithForm({
	renderer: (formData) => {
		// renderLoading(true, popupFormInfo, 'Сохранение...');
		api.getSwapTextProfile(formData.inputName, formData.inputJob)
			.then((res) => {
				console.log('getSwapTextProfile-res', res)
				profileName.textContent = res.name;
				profileJob.textContent = res.about;
			})
			.catch(err => console.log('popupEditFormClass', err))
			.finally(() => {
				// renderLoading(false, popupFormInfo, 'Сохранить');
			})
	}
}, '.popup_form_edit');


buttonImage.addEventListener('click', () => {
	// openPopup(popupAvatar);
	popupAvatarFormClass.open()
})


buttonInfo.addEventListener('click', (evt) => {
	// openPopup(popupEdit);
	popupEditFormClass.open()
	inputName.value = profileName.textContent;
	inputNote.value = profileJob.textContent;
 });


buttonAdd.addEventListener('click', () => {
	// openPopup(popupAdd);
	popupAddFormClass.open();
});



enableValidation({
	formSelector: '.popup__form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__button-save',
  inputErrorClass: 'popup__field_type_error',
  errorClass: 'popup__field-error_active'
}); 


Promise.all([
	api.getInitialProfile(),
	api.getInitialCard()
])
.then(([info, initialCards]) => {

	profileName.textContent = info.name;
	profileJob.textContent = info.about;
	avatarImage.src = info.avatar;

	console.log('Promise.all=>info', info)
	console.log('Promise.all=>initialCards', initialCards)
	
	return initialCards.forEach(item => {
		const boolen = item.owner._id === info._id;
		cardsContainer.append(createCardTemplate(item.link, item.name, item.likes.length, !boolen, item._id, item.likes, info._id));
	});
})
.catch((error) => {
	return console.log(error);
});


// ----
// api.getInitialProfile()
// .then(res => console.log(res));