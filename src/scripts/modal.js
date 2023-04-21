
import { closePopup } from "./utils.js";


const popupEdit = document.querySelector('.popup_form_edit');
const buttonInfo = document.querySelector('.profile-info__edit-button');
const profileName = document.querySelector('.profile-info__name');
const profileJob = document.querySelector('.profile-info__profession');
const popupFormInfo = document.querySelector('.popup__form_belong_profile');
const inputName = popupFormInfo.querySelector('.popup__field_belong_name');
const inputNote = popupFormInfo.querySelector('.popup__field_belong_note');


function submitFormInfo(evt) {
	evt.preventDefault();
	profileName.textContent = inputName.value;
	profileJob.textContent = inputNote.value;
	closePopup(popupEdit);
}



const popupAdd = document.querySelector('.popup_form_add');
const buttonAdd = document.querySelector('.profile__add-button');



export { 
	popupEdit,
	popupFormInfo, 
	buttonInfo, 
	submitFormInfo, 
	profileName, 
	profileJob, 
	inputName, 
	inputNote, 
	buttonAdd, 
	popupAdd 
};