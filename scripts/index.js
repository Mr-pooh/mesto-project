
const buttonAdd = document.querySelector('.profile__add-button');
const buttonInfo = document.querySelector('.profile-info__edit-button');
const popup = document.querySelectorAll('.popup');

function formInfo() {
	popup[0].classList.toggle('popup_opened');
}

function formEdit() {
	popup[1].classList.toggle('popup_opened');
}

function formImage() {
	popup[2].classList.toggle('popup_opened');
}

buttonInfo.addEventListener('click', formInfo);
buttonAdd.addEventListener('click', formEdit);
const buttonClose = document.querySelectorAll('.popup__button-close');
buttonClose[0].addEventListener('click', formInfo);
buttonClose[1].addEventListener('click', formEdit);
buttonClose[2].addEventListener('click', formImage);

const inputName = document.querySelector('.profile-info__name');
const inputJob = document.querySelector('.profile-info__profession');
const popupFormInfo = document.querySelectorAll('.popup__form')[0];
const popupSave = popupFormInfo.querySelector('.popup__button-save')

function handleFormSubmit(evt) {
	evt.preventDefault();

	const popupInput = popupFormInfo.querySelectorAll('.popup__field');

	popupInput[0] = inputName.value;
	popupInput[1] = inputJob.value;

	inputName.textContent = `${popupInput[0].value}`;
	inputJob.textContent = `${popupInput[1].value}`;

}

popupFormInfo.addEventListener('submit', handleFormSubmit);
popupSave.addEventListener('click', formInfo);


const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


const cardTemplate = document.querySelector('#card').content;
const cardsContainer = document.querySelector('.cards');


function cardTemplateCreate() {
	const cardCloneElement = cardTemplate.querySelector('.card').cloneNode(true);
	const buttonDelete = cardCloneElement.querySelector('.card__close');

	buttonDelete.addEventListener('click', () => {
		const deleteItem = buttonDelete.closest('.card');
		deleteItem.remove();
	});

	cardCloneElement.querySelector('.card__like').addEventListener('click', evt => {
		evt.target.classList.toggle('card__like_active');
	});

	return cardsContainer.prepend(cardCloneElement);

};

function popupFormSee() {
	const cardImage = document.querySelector('.card__image');
	const cardTitle = document.querySelector('.card__title');
	const popupImage = document.querySelector('.popup__image');
	const popupText = document.querySelector('.popup__text');
	cardImage.addEventListener('click', ()=> {
		popup[2].classList.toggle('popup_opened');
		popupImage.src = `${cardImage.src}`;
		popupText.textContent = `${cardTitle.textContent}`
	});
}

initialCards.forEach(item => {

	cardTemplateCreate();
	const cardImage = document.querySelector('.card__image');
	const cardTitle = document.querySelector('.card__title');
	cardImage.src = `${item.link}`;
	cardImage.setAttribute('alt', `${item.name}`);
	cardTitle.textContent = `${item.name}`;
		popupFormSee();

	
});

const popupFormCreate = document.querySelectorAll('.popup__form')[1];
const popupButtonCreate = popupFormCreate.querySelector('.popup__button-save');

function createCard(evt) {
	evt.preventDefault();
	cardTemplateCreate();
const cardImage = document.querySelector('.card__image');
const cardTitle = document.querySelector('.card__title');
const popupInput = popupFormCreate.querySelectorAll('.popup__field');
cardTitle.textContent = `${popupInput[0].value}`;
cardImage.src = `${popupInput[1].value}`;
popupInput[0].value = '';
popupInput[1].value = '';
popupFormSee();

};

popupFormCreate.addEventListener('submit', createCard);
popupButtonCreate.addEventListener('click', formEdit)

