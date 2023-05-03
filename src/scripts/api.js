

const config = {
	baseUrl: 'https://nomoreparties.co/v1/plus-cohort-23',
	headers: {
		authorization: '43b4a3de-4bbd-4be1-abd1-bf011e8ef6fa',
			'Content-Type': 'application/json'
	}
}

function swapTextProfile(nikname, job) {
	return fetch(`${config.baseUrl}/users/me`, {
		method: 'PATCH',
		headers: config.headers,
		body: JSON.stringify({
			name: nikname.value,
			about: job.value
		})
	})
	.then(res => returnError(res))
}


function downloadProfileInfo(){
	return fetch(`${config.baseUrl}/users/me`, {
		headers: config.headers
	})
	.then(res => returnError(res))
}

function downloadCards() {
	return fetch(`${config.baseUrl}/cards`, {
		headers: config.headers
	})
	.then(res => returnError(res))
}

function deleteCard(cardId) {
	return fetch(`${config.baseUrl}/cards/${cardId}`, {
	method: 'DELETE',
	headers: config.headers
	})
	.then(res => returnError(res))
}

function addCardOnServer(namestate, linkimg){
	return fetch(`${config.baseUrl}/cards`, {
		method: 'POST',
		headers: config.headers,
		 body: JSON.stringify({
			 name: namestate.value,
			 link: linkimg.value
		 })
	 })
	 .then(res => returnError(res))
 }


 function addLike(cardId, meth) {
	return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
	method: `${meth}`,
	headers: config.headers
	})
	.then(res => returnError(res))
 }

 function swapImage(avatarimg) {
	return fetch(`${config.baseUrl}/users/me/avatar`, {
		method: `PATCH`,
		headers: config.headers,
		body: JSON.stringify({
			avatar: avatarimg.value
		})
	})
	.then(res => returnError(res))
 }

 function returnError(item) {
	if(item.ok){
		return item.json();
	}
	return Promise.reject(`Что-то не так: ${item.status}`);
}

export { addCardOnServer, swapTextProfile, downloadCards, downloadProfileInfo, deleteCard, addLike, swapImage }