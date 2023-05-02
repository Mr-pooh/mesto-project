import {
	popupName,
	popupNote,
} from './card.js'

import {
	inputName,
	inputNote,
	inputAvatar
} from './modal.js'


const config = {
	baseUrl: 'https://nomoreparties.co/v1/plus-cohort-23',
	headers: {
		authorization: '43b4a3de-4bbd-4be1-abd1-bf011e8ef6fa',
			'Content-Type': 'application/json'
	}
}

function swapTextProfile() {
	return fetch(`${config.baseUrl}/users/me`, {
		method: 'PATCH',
		headers: config.headers,
		body: JSON.stringify({
			name: inputName.value,
			about: inputNote.value
		})
	})
}


function downloadProfileInfo(){
	return fetch(`${config.baseUrl}/users/me`, {
		headers: config.headers
	})
}

function downloadCards() {
	return fetch(`${config.baseUrl}/cards`, {
		headers: config.headers
	})
}

function deleteCard(cardId) {
	return fetch(`${config.baseUrl}/cards/${cardId}`, {
	method: 'DELETE',
	headers: config.headers
	})
}

function addCardOnServer(){
	return fetch(`${config.baseUrl}/cards`, {
		method: 'POST',
		headers: config.headers,
		 body: JSON.stringify({
			 name: popupName.value,
			 link: popupNote.value
		 })
	 })
 }


 function addLike(cardId, meth) {
	return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
	method: `${meth}`,
	headers: config.headers
	})
 }

 function swapImage() {
	return fetch(`${config.baseUrl}/users/me/avatar`, {
		method: `PATCH`,
		headers: config.headers,
		body: JSON.stringify({
			avatar: inputAvatar.value
		})
	})
 }



export { addCardOnServer, swapTextProfile, downloadCards, downloadProfileInfo, deleteCard, addLike, swapImage }