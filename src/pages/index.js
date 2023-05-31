import './index.css';

import { 
	buttonInfo,
	inputName,
	inputNote, 
	buttonAdd,
	popupFormInfo,
	buttonImage,
	popupFormCreate,
	cardsContainer, 
	config,
	popupFormAvatar
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

const classUserInfo = new UserInfo('profile-info__name', 'profile-info__profession');

const popupImageClass = new PopupWithImage('.popup_form_opened-image');

const classCardGenerate = (item) => new Card({
	data: item,
	selector: `#card`,
	handleCardClick: () => {
		popupImageClass.open(item)
	},
	addListenerDel: () => {
	/* 	console.log(classCardGenerate(item).removeCard()) */
		api.getDeleteCard(item._id)
			.then(() => {
				classCardGenerate(item).removeCard()
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

const sectionItems = new Section({
	renderer: 
		(item, idPerson) => {
			return classCardGenerate(item).generate(idPerson);
		}
	},
	cardsContainer
)


// инициализация классов popup, без popup для картинки
const popupAddFormClass = new PopupWithForm({
	actionSubmit: (formData) => {
		renderLoading(true, popupFormCreate, 'Сохранение...');
		api.getAddCardOnServer(formData.inputName, formData.inputUrl)
			.then((res) => {
				sectionItems.addItem(res, res.owner._id);
			})
			.then(() => {
				popupAddFormClass.close()
			})
			.catch(err => console.log('popupAddFormClass', err))
			.finally(() => {
				renderLoading(false, popupFormCreate, 'Создать');
			})
	}
}, '.popup_form_add');

const popupAvatarFormClass = new PopupWithForm({
	actionSubmit: (formData) => {
		renderLoading(true, popupFormAvatar, 'Сохранение...');
		api.getSwapAvatar(formData.inputUrl)
		.then((res) => {
			classUserInfo.setAvatar(res);
		})
		.then(() => {
			popupAvatarFormClass.close()
		})
		.catch(err => console.log(err))
		.finally(() => {
			renderLoading(false, popupFormAvatar, 'Сохранить');
		})
	}
}, '.popup_form_avatar');

const popupEditFormClass = new PopupWithForm({
	actionSubmit: (formData) => {
		renderLoading(true, popupFormInfo, 'Сохранение...');
		api.getSwapTextProfile(formData.inputName, formData.inputJob)
		.then((res) => {
			classUserInfo.setUserInfo(res);
		})
		.then(() => {
			popupEditFormClass.close()
		})
		.catch(err => console.log(err))
		.finally(() => {
			renderLoading(false, popupFormInfo, 'Сохранить');
		})
	}
}, '.popup_form_edit');


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


buttonImage.addEventListener('click', () => {
	validationAvatarForm.resetValidation()
	popupAvatarFormClass.open()
})

buttonInfo.addEventListener('click', (evt) => {
	const userInfo = classUserInfo.getUserInfo();

	inputName.value = userInfo.name;
	inputNote.value = userInfo.about;

	validationEditForm.resetValidation()
	popupEditFormClass.open();
});

buttonAdd.addEventListener('click', () => {
	validationAddForm.resetValidation()
	popupAddFormClass.open();
});


Promise.all([
	api.getInitialProfile(),
	api.getInitialCard()
])
.then(([info, initialCards]) => {
	// заполнение профиля и аватара
	classUserInfo.setUserInfo(info);
	classUserInfo.setAvatar(info);
	
	sectionItems.renderItems(initialCards, info._id);


})
.catch((error) => {
	return console.log(error);
});
