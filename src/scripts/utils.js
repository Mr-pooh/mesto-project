


function openPopup(item) {
	item.classList.add('popup_opened');
	document.addEventListener('click', closeOverlay);
	document.addEventListener('keyup', closePopupEscape);
}

function closePopupEscape(evt) {
	evt.preventDefault();
	if(evt.key !== 'Escape') {
	}
	else if(document.querySelector('.popup_opened')){
		closePopup(document.querySelector('.popup_opened'))
	}	
}

function closeOverlay(evt) {
	if(evt.target.classList.contains('popup')) {
		evt.target.classList.remove('popup_opened')
	}
}


function closePopup(item) {
	item.classList.remove('popup_opened');
	document.removeEventListener('click', closeOverlay);
	document.removeEventListener('keyup', closePopupEscape);
}



export { openPopup, closeOverlay, closePopup, closePopupEscape }