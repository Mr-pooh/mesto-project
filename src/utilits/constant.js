const cardsContainer = document.querySelector('.cards');
const popupFormCreate = document.querySelector('.popup__form_belong_card');
const buttonInfo = document.querySelector('.profile-info__edit-button');
const popupFormInfo = document.querySelector('.popup__form_belong_profile');
const inputName = popupFormInfo.querySelector('.popup__field_belong_name');
const inputNote = popupFormInfo.querySelector('.popup__field_belong_note');
const popupAvatar = document.querySelector('.popup_form_avatar');
const buttonImage = document.querySelector('.profile__image-container');
const buttonAdd = document.querySelector('.profile__add-button');
const config = {
	baseUrl: 'https://nomoreparties.co/v1/plus-cohort-23',
	headers: {
		authorization: '43b4a3de-4bbd-4be1-abd1-bf011e8ef6fa',
			'Content-Type': 'application/json'
	}
}







export { cardsContainer, popupFormCreate, buttonAdd, buttonInfo, popupFormInfo, inputName, inputNote, popupAvatar, buttonImage, config }