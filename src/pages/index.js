import './index.css';

import { 
	popupEdit,
	buttonInfo,
	profileName,
	profileJob,
	inputName,
	inputNote, 
	buttonAdd,
	popupAdd,
	popupFormInfo,
	popupAvatar,
	avatarImage,
	buttonImage,
	popupFormAvatar,
	inputAvatar
} from '../scripts/modal';

import { 
	popupFormCreate,
	cardsContainer,
	createCardTemplate,
	popupName,
	popupNote
} from '../scripts/card.js';

import {
	enableValidation
} from '../scripts/validate.js'


import {
	openPopup,		
	closePopup,
	renderLoading
} from '../scripts/utils.js';

import {
	// downloadCards,
	// downloadProfileInfo,
	// swapTextProfile,
	// addCardOnServer,
	swapImage
} from '../scripts/api.js'

// импорт классов
import {api} from '../components/Api.js';
import Card from '../components/Card';
import Section from '../components/Section';
import UserInfo from '../components/UserInfo';


buttonImage.addEventListener('click', () => {
	openPopup(popupAvatar);
})

popupFormAvatar.addEventListener('submit', (evt) => {
	evt.preventDefault();
	renderLoading(true, popupFormAvatar, 'Сохранить');
	api.getSwapAvatar(inputAvatar)
	.then((res) => {
		avatarImage.src = res.avatar;
		closePopup(popupAvatar);
		popupFormAvatar.reset();
	})
	.catch(error => console.log(error))
	.finally(()=> {
		renderLoading(false, popupFormAvatar, 'Сохранить');
	})
})


buttonInfo.addEventListener('click', (evt) => {
	openPopup(popupEdit);
	inputName.value = profileName.textContent;
	inputNote.value = profileJob.textContent;
 });

const closeButtons = document.querySelectorAll('.popup__button-close');  
closeButtons.forEach(item => {
	item.addEventListener('click', () => {
		closePopup(item.closest('.popup'));
	});
});



buttonAdd.addEventListener('click', () => {
	openPopup(popupAdd);
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


popupFormCreate.addEventListener('submit', (evt) => {
	evt.preventDefault();
	renderLoading(true, popupFormCreate, 'Создать');
	api.getAddCardOnServer(popupName, popupNote)
	.then((item) => {
		cardsContainer.prepend(createCardTemplate(item.link, item.name, item.likes.length, false, item._id, item.likes, false));
		popupFormCreate.reset();
		closePopup(popupAdd);
	})
	.catch(error => console.log(error))
	.finally(() => {
		renderLoading(false, popupFormCreate, 'Создать');
	})
})



popupFormInfo.addEventListener('submit', (evt) => {
evt.preventDefault();
	renderLoading(true, popupFormInfo, 'Сохранить');
	api.getSwapTextProfile(inputName, inputNote)
	.then((result) => {
		profileName.textContent = result.name;
		profileJob.textContent = result.about;
		closePopup(popupEdit);
	})
	.catch(err => console.log(err)) 
	.finally(() => {
		renderLoading(false, popupFormInfo, 'Сохранить');
	})
});


// ----
// api.getInitialProfile()
// .then(res => console.log(res));