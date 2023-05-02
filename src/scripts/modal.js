

const popupEdit = document.querySelector('.popup_form_edit');
const buttonInfo = document.querySelector('.profile-info__edit-button');
const profileName = document.querySelector('.profile-info__name');
const profileJob = document.querySelector('.profile-info__profession');
const popupFormInfo = document.querySelector('.popup__form_belong_profile');
const inputName = popupFormInfo.querySelector('.popup__field_belong_name');
const inputNote = popupFormInfo.querySelector('.popup__field_belong_note');

const popupAvatar = document.querySelector('.popup_form_avatar');
const avatarImage = document.querySelector('.profile__image');
const buttonImage = document.querySelector('.profile__image-container');
const popupFormAvatar = document.querySelector('.popup__form_belong_avatar');
const inputAvatar = popupFormAvatar.querySelector('.popup__field_belong_note');


const popupAdd = document.querySelector('.popup_form_add');
const buttonAdd = document.querySelector('.profile__add-button');



export { 
	popupEdit,
	popupFormInfo, 
	buttonInfo, 
	profileName, 
	profileJob, 
	inputName, 
	inputNote, 
	buttonAdd, 
	popupAdd,
	popupAvatar,
	avatarImage,
	popupFormAvatar,
	inputAvatar,
	buttonImage
};