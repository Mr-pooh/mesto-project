import './index.css';

import { 
	buttonInfo,
	inputName,
	inputNote, 
	buttonAdd,
	popupFormInfo,
	popupAvatar,
	buttonImage,
	popupFormCreate,
	cardsContainer, 
	config
} from '../utilits/constant.js';


import {
	renderLoading
} from '../utilits/utilits.js';

// импорт классов
import Api from '../components/Api.js';
import Card from '../components/Card';
import Section from '../components/Section';
import UserInfo from '../components/UserInfo';
import PopupWithForm from '../components/PopupWithForm';
import PopupWithImage from '../components/PopupWithImage';
import FormValidator from '../components/FormValidator';

const api = new Api(config);


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
					})
					.catch((error) => {
						return console.log(error);
					});
				}
			});
			
				funck(classCardGenerate);
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
	const classUserInfo = new UserInfo('profile-info__name', 'profile-info__profession');
		
	
		/* ,
		({inputName, inputJob}) => {
			
				renderLoading(true, popupFormInfo, 'Сохранение...');
				api.getSwapTextProfile(inputName, inputJob)
				.then((res) => {
					classUserInfo.getUserInfo(res)
				})
				.catch(err => console.log(err))
				.finally(()=>  {
					renderLoading(false, popupFormInfo, 'Сохранить')
				})
	
				/* renderLoading(true, popupAvatar, 'Сохранение...');
				api.getSwapAvatar(inputUrl)
				.then((res) => {
					document.querySelector('.profile__image').src = res.avatar;
				})
				.catch(err => console.log(err))
				.finally(()=>  {
					renderLoading(false, popupAvatar, 'Сохранить')
				}) 
			
		},
		() => {
			api.getInitialProfile()
				.then(res => {
					inputName.value = res.name;
					inputNote.value = res.about;
					classUserInfo.getUserInfo(res)
				})
				.catch(err => console.log(err))
		} */
			
	const popupAvatarFormClass = new PopupWithForm({
		renderer: (formData) => {
			api.getSwapAvatar(formData.inputUrl)
			.then((res) => {
				document.querySelector('.profile__image').src = res.avatar;
			})
			.catch(err => console.log(err))
		}
	},
		'.popup_form_avatar'
		);
	const popupEditFormClass = new PopupWithForm({
		renderer: (formData) => {
			classUserInfo.setUserInfo(()=> {
				api.getSwapTextProfile(formData.inputName, formData.inputJob)
				then((res) => {
					classUserInfo.getUserInfo(res);
				})
				.catch(err => console.log(err))
			});
			/* classUserInfo.getUserInfo(false); */
		}
	},
		'.popup_form_edit'
		);
	
	
	buttonImage.addEventListener('click', () => {
		popupAvatarFormClass.open()
	})
	
	
	buttonInfo.addEventListener('click', (evt) => {
		api.getInitialProfile()
		.then(res => {
			popupEditFormClass.open();
			classUserInfo.getUserInfo(res);
			inputName.value = res.name;
			inputNote.value = res.about;

		})
		.catch(err => console.log(err))
	});
	
	
	buttonAdd.addEventListener('click', () => {
		popupAddFormClass.open();
	});

	classUserInfo.getUserInfo(info);
	document.querySelector('.profile__image').src = info.avatar;

	sectionItems.renderItems(initialCards ,(item) => {
		const cardGenerate = item.generate(info._id)
		sectionItems.setItem(cardGenerate);
	});


})
.catch((error) => {
	return console.log(error);
});
