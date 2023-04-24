


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
	/* else if(document.querySelector('.popup_opened')){
		closePopup(document.querySelector('.popup_opened'))
	} */	
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



export { openPopup, closeOverlay, closePopup, closePopupEscape }