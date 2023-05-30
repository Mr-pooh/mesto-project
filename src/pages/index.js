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
	 popupFormInfo,
	 popupAvatar,
	avatarImage,
	buttonImage,
	inputAvatar,
	// popupFormAvatar,
	// inputAvatar
} from '../scripts/modal';

import { 
	popupFormCreate,
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
import FormValidator from '../components/FormValidator';




const sectionItems = new Section({
	items: [],
	renderer: 
		(item, funck) => {
			const classCardGenerate = new Card({
				data: item,
				selector: `#card`,
				handleCardClick: () => {
					const data = {
						src: item.link,
						textContent: item.name,
					}
					const popupImageClass = new PopupWithImage(data, '.popup_form_opened-image')
					popupImageClass.open()
				},
				addListenerDel: (evt) => {
					api.getDeleteCard(item._id)
						.then(() => {
							evt.target.closest('.card').remove();
						})
						.catch(err => console.log(err));
					},
				addListenerLike: (evt, meth) => {
					api.getAddLike(item._id, `${meth}`)
					.then((item) => {
						evt.target.classList.toggle('card__like_active');
						evt.target.closest('.card').querySelector('.card__like-sum').textContent = item.likes.length;
						/* evt.target.classList.contain('card__like-sum').textContent = item.likes.length; */
					})
					.catch((error) => {
						return console.log(error);
					});
				}
			});
			
				funck(classCardGenerate);
			
			/* const cardAddGen = classCardGenerate.generate(false);
			sectionItems.addItem(cardAddGen); */
		}
	},
	cardsContainer
)


// инициализация классов popup, без popup для картинки
const popupAddFormClass = new PopupWithForm({
	renderer: (formData) => {
		 renderLoading(true, popupFormCreate, 'Сохранение...');
		api.getAddCardOnServer(formData.inputName, formData.inputUrl)
			.then((res) => {
				sectionItems.renderItems([res] ,(item) => {
					const cardAddGenerate = item.generate(res.owner._id)
					sectionItems.addItem(cardAddGenerate);
				});
			})
			.catch(err => console.log('popupAddFormClass', err))
			.finally(() => {
				 renderLoading(false, popupFormCreate, 'Создать');
			})
	}
}, '.popup_form_add');


const validationOptions = {
		formSelector: '.popup__form',
		inputSelector: '.popup__field',
		submitButtonSelector: '.popup__button-save',
		inputErrorClass: 'popup__field_type_error',
		errorClass: 'popup__field-error_active'
	}

const validationAddForm = new FormValidator(
	validationOptions, '.popup_form_add'
)
validationAddForm.enableValidation()

const validationEditForm = new FormValidator(
	validationOptions, '.popup_form_edit'
)
validationEditForm.enableValidation()

const validationAvatarForm = new FormValidator(
	validationOptions, '.popup_form_avatar'
)
validationAvatarForm.enableValidation()


Promise.all([
	api.getInitialProfile(),
	api.getInitialCard()
])
.then(([info, initialCards]) => {
	const classUserInfo = new UserInfo(
		info,
		({inputName, inputJob, inputUrl}) => {
				if(inputName, inputJob){
					renderLoading(true, popupFormInfo, 'Сохранение...');
					api.getSwapTextProfile(inputName, inputJob)
					.then((res) => {
						document.querySelector('.profile-info__name').textContent = res.name;
						document.querySelector('.profile-info__profession').textContent = res.about;
					})
					.catch(err => console.log(err))
					.finally(()=>  {
						renderLoading(false, popupFormInfo, 'Сохранить')
					})
				}
				else {
					renderLoading(true, popupAvatar, 'Сохранение...');
					api.getSwapAvatar(inputUrl)
					.then((res) => {
						document.querySelector('.profile__image').src = res.avatar;
					})
					.catch(err => console.log(err))
					.finally(()=>  {
						renderLoading(false, popupAvatar, 'Сохранить')
					})
				}
		},
		() => {
				api.getInitialProfile()
					.then(res => {
						inputName.value = res.name;
						inputNote.value = res.about;
						document.querySelector('.profile-info__name').textContent = res.name;

						document.querySelector('.profile-info__profession').textContent = res.about;

						document.querySelector('.profile__image').src = res.avatar;
					})
					.catch(err => console.log(err))
				}
			
	);

	
	/* sectionItems.setItem(cardGenerate); */
			
			//Создал класс UserInfo и использовал его для отрисовки на странице информации профиля
			//Создал класс Section, который отрисовывает карточки на странице с помощью класса Card
			//Пока не добавил взаимодействие с Popup. кнопка удаления работает без Api, толко в вёрстке на статике. С лайками такая же истоия
			
			
			
			console.log('Promise.all=>info', info)
			console.log('Promise.all=>initialCards', initialCards)



			
			const popupAvatarFormClass = new PopupWithForm({
				renderer: (formData) => {
					classUserInfo.setUserInfo(formData);
				}
			},
			 '.popup_form_avatar'
			 );
			const popupEditFormClass = new PopupWithForm({
				renderer: (formData) => {
					classUserInfo.setUserInfo(formData);
					classUserInfo.getUserInfo(false);
				}
			},
			 '.popup_form_edit'
			 );
			
			
			buttonImage.addEventListener('click', () => {
				// openPopup(popupAvatar);
				popupAvatarFormClass.open()
			})
			
			
			buttonInfo.addEventListener('click', (evt) => {
				// openPopup(popupEdit);
				popupEditFormClass.open();
				classUserInfo.getUserInfo(false);
			/* 	classUserInfo.getUserInfo(); */
				/* inputName.value = profileName.textContent;
				inputNote.value = profileJob.textContent; */
			 });
			
			
			buttonAdd.addEventListener('click', () => {
				// openPopup(popupAdd);
				popupAddFormClass.open();
			});
			


			classUserInfo.getUserInfo(true);



			sectionItems.renderItems(initialCards ,(item) => {
				const cardGenerate = item.generate(info._id)
				sectionItems.setItem(cardGenerate);
			});


		})
		.catch((error) => {
			return console.log(error);
});


//const popupAvatarFormClass = new PopupWithForm({
//	renderer: (formData) => {
		
	//	classUserInfo.setUserInfo(api, formData);
		// renderLoading(true, popupFormAvatar, 'Сохранение...');
		/* api.getSwapAvatar(formData.inputUrl)
			.then((res) => {
				console.log('getSwapAvatar-res', res)
				avatarImage.src = res.avatar;
			})
			.catch(err => console.log('popupAvatarFormClass', err))
			.finally(() => {
				// renderLoading(false, popupFormAvatar, 'Сохранить');
			}) */
//	}
//}, '.popup_form_avatar');
//const popupEditFormClass = new PopupWithForm({
	//renderer: (formData) => {

	//	classUserInfo.setUserInfo(api, formData);
		// renderLoading(true, popupFormInfo, 'Сохранение...');
		/* api.getSwapTextProfile(formData.inputName, formData.inputJob)
			.then((res) => {
				console.log('getSwapTextProfile-res', res)
				profileName.textContent = res.name;
				profileJob.textContent = res.about;
			})
			.catch(err => console.log('popupEditFormClass', err))
			.finally(() => {
				// renderLoading(false, popupFormInfo, 'Сохранить');
			}) */
//	}
//}, '.popup_form_edit');


//buttonImage.addEventListener('click', () => {
	// openPopup(popupAvatar);
	//popupAvatarFormClass.open()
//})


//buttonInfo.addEventListener('click', (evt) => {
	// openPopup(popupEdit);
	//popupEditFormClass.open()
	//inputName.value = profileName.textContent;
	//inputNote.value = profileJob.textContent;
 //});


//buttonAdd.addEventListener('click', () => {
	// openPopup(popupAdd);
	//popupAddFormClass.open();
//});

// ----
// api.getInitialProfile()
// .then(res => console.log(res));