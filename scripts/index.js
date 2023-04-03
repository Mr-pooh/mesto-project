
const popupAdd = document.querySelector('.popup_form_add');
const popupEdit = document.querySelector('.popup_form_edit');
const popupZoom = document.querySelector('.popup_form_opened-image');
const buttonAdd = document.querySelector('.profile__add-button');
const buttonInfo = document.querySelector('.profile-info__edit-button');

function openPopup(item) {
	item.classList.add('popup_opened');
}

function closePopup(item) {
	item.classList.remove('popup_opened');
}

buttonAdd.addEventListener('click', () => {
	openPopup(popupAdd);
});

const buttonsClose = document.querySelectorAll('.popup__button-close');
buttonsClose.forEach(item => {
	item.addEventListener('click', () => {
		closePopup(item.closest('.popup'));
	});
})





const inputName = document.querySelector('.profile-info__name');
const inputJob = document.querySelector('.profile-info__profession');
const popupFormInfo = document.querySelector('.popup__form_belong_profile');
const popupSave = popupFormInfo.querySelector('.popup__button-save');
const fieldName = popupFormInfo.querySelector('.popup__field_belong_name');
const fieldNote = popupFormInfo.querySelector('.popup__field_belong_note');

buttonInfo.addEventListener('click', () => {
 openPopup(popupEdit);
 inputName.textContent = `${fieldName.value}`;
 inputJob.textContent = `${fieldNote.value}`;
});

function submitFormInfo(evt) {
	evt.preventDefault();
	inputName.textContent = `${fieldName.value}`;
	inputJob.textContent = `${fieldNote.value}`;
	fieldName.textContent = inputName.value;
	fieldNote.textContent = inputJob.value;
	closePopup(popupEdit);
}
popupFormInfo.addEventListener('submit', submitFormInfo);



const cardTemplate = document.querySelector('#card').content;
const cardsContainer = document.querySelector('.cards');

function createCardTemplate(link, text) {
	const cardCloneElement = cardTemplate.querySelector('.card').cloneNode(true);
	const buttonDelete = cardCloneElement.querySelector('.card__close');
	const cardImage = cardCloneElement.querySelector('.card__image');
	const cardTitle = cardCloneElement.querySelector('.card__title');
	const popupImage = popupZoom.querySelector('.popup__image');
	const popupText = popupZoom.querySelector('.popup__text');

	cardImage.src = `${link}`;
	cardImage.setAttribute('alt', `${text}`);
	cardTitle.textContent = `${text}`;

	cardImage.addEventListener('click', ()=> {
		openPopup(popupZoom);
		popupImage.src = `${cardImage.src}`;
		popupText.textContent = `${cardTitle.textContent}`
	});

	buttonDelete.addEventListener('click', () => {
		const deleteItem = buttonDelete.closest('.card');
		deleteItem.remove();
	});

	cardCloneElement.querySelector('.card__like').addEventListener('click', evt => {
		evt.target.classList.toggle('card__like_active');
	});

	return cardCloneElement;
};

initialCards.forEach(item => {
	cardsContainer.append(createCardTemplate(item.link, item.name));
});

const popupFormCreate = document.querySelector('.popup__form_belong_card');
const popupButtonCreate = popupFormCreate.querySelector('.popup__button-save');

function handleCard(evt) {
	evt.preventDefault();
	const popupName = popupFormCreate.querySelector('.popup__field_belong_name');
	const popupNote = popupFormCreate.querySelector('.popup__field_belong_note')

	cardsContainer.prepend(createCardTemplate(popupNote.value, popupName.value));
	popupFormCreate.reset();
	closePopup(popupAdd);
};

popupFormCreate.addEventListener('submit', handleCard);
