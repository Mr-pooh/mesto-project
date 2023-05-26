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
import {api} from '../components/Api.js';
import Card from '../components/Card';
import Section from '../components/Section';
import UserInfo from '../components/UserInfo';
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
	const classUserInfo = new UserInfo(info);

	const cardList = new Section({
		items: initialCards,
		renderer: (item) => {
			const classCardGenerate = new Card(item, `#card`); 
			const cardGenerate = classCardGenerate.generate(info._id);
			cardList.setItem(cardGenerate);
		}
	}, cardsContainer);

	//Создак класс UserInfo и использовал его для отрисовки на странице информации профиля
	//Создал класс Section, который отрисовывает карточки на странице с помощью класса Card
	//Пока не добавил взаимодействие с Popup. кнопка удаления работает без Api, толко в вёрстке на статике. С лайками такая же истоия

	
	
	console.log('Promise.all=>info', info)
	console.log('Promise.all=>initialCards', initialCards)
	
	
	
	classUserInfo.getUserInfo({
		names: profileName,
		aboutJob: profileJob,
		avatars: avatarImage
	});
	cardList.renderItems();


})
.catch((error) => {
	return console.log(error);
});


// ----
// api.getInitialProfile()
// .then(res => console.log(res));