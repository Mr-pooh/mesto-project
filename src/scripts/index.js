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
	popupFormAvatar
} from './modal.js';

import { 
	popupFormCreate,
	cardsContainer,
	createCardTemplate
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
	swapImage()
	.then((res) => {
		if(res.ok){
			return res.json();
		}
		return Promise.reject(`Что-то не так: ${res.status}`)
	})
	.then((res) => {
		avatarImage.src = res.avatar;
		closePopup(popupAvatar);
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

downloadProfileInfo()
.then((res) => {
	if(res.ok){
		return res.json();
	}
	return Promise.reject(`Что-то пошло не так: ${res.status}`);
})
.then((result) => {
	profileName.textContent = result.name;
	profileJob.textContent = result.about;
	avatarImage.src = result.avatar;
})
.catch((error) => {
	return console.log(error);
});


downloadCards()
.then((res) => {
	if(res.ok){
		return res.json()
	}
	return Promise.reject(`Что-то пошло не так: ${res.status}`);
})
.then((result) => {
	return result.forEach(item => {
		const boolen = item.owner._id === '18fe758bd624620838d3446e';
		cardsContainer.append(createCardTemplate(item.link, item.name, item.likes.length, !boolen, item._id, item.likes));
		
	});
})
.catch(error => {
console.log(error)
});



popupFormCreate.addEventListener('submit', (evt) => {
	evt.preventDefault();
	renderLoading(true, popupFormCreate, 'Создать');
	addCardOnServer()
	.then((res) => {
		if(res.ok){
			return res.json();
		}
		return Promise.reject(`Что-то не так: ${res.status}`)
	})
	.then((item) => {
	 const boolen = () => {
		item.owner._id === '18fe758bd624620838d3446e';
	 }
	 cardsContainer.prepend(createCardTemplate(item.link, item.name, item.likes.length, !boolen, item._id, item.likes));
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
	swapTextProfile()
	.then((res) => {
		if(res.ok){
			return res.json();
		}
		return Promise.reject(`Что-то пошло не по плану: ${res.status}`)
	})
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