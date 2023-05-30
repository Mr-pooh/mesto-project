function renderLoading(isLoading, popupForm, word) {
	if(isLoading){
		return popupForm.querySelector('.popup__button-save').textContent = 'Сохранение...';
		
	}
	else {
		return popupForm.querySelector('.popup__button-save').textContent = `${word}`;
	}
}

export {renderLoading}