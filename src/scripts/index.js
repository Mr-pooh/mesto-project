import '../pages/index.css';

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
} from './modal.js';

import { 
	popupFormCreate,
	cardsContainer,
	createCardTemplate,
	popupName,
	popupNote
} from './card.js';

import {
	enableValidation
} from './validate.js'


import {
	openPopup,		
	closePopup,
	renderLoading
} from './utils.js';

import {
	downloadCards,
	downloadProfileInfo,
	swapTextProfile,
	addCardOnServer,
	swapImage
} from './api.js'




buttonImage.addEventListener('click', () => {
	openPopup(popupAvatar);
})

popupFormAvatar.addEventListener('submit', (evt) => {
	evt.preventDefault();
	renderLoading(true, popupFormAvatar, 'Сохранить');
	swapImage(inputAvatar)
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
	downloadProfileInfo(),
	downloadCards()
])
.then(([info, initialCards]) => {
	profileName.textContent = info.name;
	profileJob.textContent = info.about;
	avatarImage.src = info.avatar;
	
	return initialCards.forEach(item => {
		const boolen = item.owner._id === info._id;
		cardsContainer.append(createCardTemplate(item.link, item.name, item.likes.length, !boolen, item._id, item.likes, info._id));
	});
})
.catch((error) => {
	return console.log(error);
});


popupFormCreate.addEventListener('submit', (evt) => {
	evt.preventDefault();
	renderLoading(true, popupFormCreate, 'Создать');
	addCardOnServer(popupName, popupNote)
	.then((item) => {
	 cardsContainer.prepend(createCardTemplate(item.link, item.name, item.likes.length, false, item._id, item.likes, info._id));
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
	swapTextProfile(inputName, inputNote)
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