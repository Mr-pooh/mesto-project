
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





const profileName = document.querySelector('.profile-info__name');
const profileJob = document.querySelector('.profile-info__profession');
const popupFormInfo = document.querySelector('.popup__form_belong_profile');
const inputName = popupFormInfo.querySelector('.popup__field_belong_name');
const inputNote = popupFormInfo.querySelector('.popup__field_belong_note');

buttonInfo.addEventListener('click', () => {
 openPopup(popupEdit);
 inputName.value = profileName.textContent;
 inputNote.value = profileJob.textContent;
});

function submitFormInfo(evt) {
	evt.preventDefault();
	profileName.textContent = inputName.value;
	profileJob.textContent = inputNote.value;
	closePopup(popupEdit);
}
popupFormInfo.addEventListener('submit', submitFormInfo);



const cardTemplate = document.querySelector('#card').content;
const cardsContainer = document.querySelector('.cards');
const popupImage = popupZoom.querySelector('.popup__image');
const popupText = popupZoom.querySelector('.popup__text');

function createCardTemplate(link, text) {
	const cardCloneElement = cardTemplate.querySelector('.card').cloneNode(true);
	const buttonDelete = cardCloneElement.querySelector('.card__close');
	const cardImage = cardCloneElement.querySelector('.card__image');
	const cardTitle = cardCloneElement.querySelector('.card__title');


	cardImage.src = `${link}`;
	cardImage.alt = `${text}`;
	cardTitle.textContent = `${text}`;

	cardImage.addEventListener('click', ()=> {
		openPopup(popupZoom);
		popupImage.src = `${cardImage.src}`;
		popupImage.alt = `${cardTitle.textContent}`;
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
const popupName = popupFormCreate.querySelector('.popup__field_belong_name');
const popupNote = popupFormCreate.querySelector('.popup__field_belong_note');

function handleCard(evt) {
	evt.preventDefault();
	cardsContainer.prepend(createCardTemplate(popupNote.value, popupName.value));
	popupFormCreate.reset();
	closePopup(popupAdd);
};

popupFormCreate.addEventListener('submit', handleCard);
