


function openPopup(item) {
	item.classList.add('popup_opened');
	document.addEventListener('click', closeOverlay);
	document.addEventListener('keyup', closePopupEscape);
}

function closePopupEscape(evt) {
	evt.preventDefault();
	if(evt.key === 'Escape') {
		const openedPopup = document.querySelector('.popup_opened');
		openedPopup && closePopup(openedPopup);
	}
}

function closeOverlay(evt) {
	if(evt.target.classList.contains('popup')) {
		closePopup(evt.target);
	}
}


function closePopup(item) {
	item.classList.remove('popup_opened');
	document.removeEventListener('click', closeOverlay);
	document.removeEventListener('keyup', closePopupEscape);
}



function renderLoading(isLoading, popupForm, word) {
	if(isLoading){
		return popupForm.querySelector('.popup__button-save').textContent = 'Сохранение...';
		
	}
	else {
		return popupForm.querySelector('.popup__button-save').textContent = `${word}`;
	}
}



export { openPopup, closeOverlay, closePopup, closePopupEscape, renderLoading }