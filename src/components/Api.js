const config = {
	baseUrl: 'https://nomoreparties.co/v1/plus-cohort-23',
	headers: {
		authorization: '43b4a3de-4bbd-4be1-abd1-bf011e8ef6fa',
			'Content-Type': 'application/json'
	}
}


class Api {
	constructor(options){
		this._baseUrl = options.baseUrl;
		this._headers = options.headers;
	}


	getInitialCard() {
		return fetch(`${this._baseUrl}/cards`, {
			headers: this._headers
		})
		.then(res => _returnError(res))
	}


	getInitialProfile() {
		return fetch(`${this._baseUrl}/users/me`, {
			headers: this._headers
		})
		.then(res => _returnError(res))
	}


	getSwapTextProfile(nikname, job) {
		return fetch(`${this._baseUrl}/users/me`, {
			method: 'PATCH',
			headers: this._headers,
			body: JSON.stringify({
				name: nikname.value,
				about: job.value
			})
		}).then(res => _returnError(res))
	}


	getAddCardOnServer(namestate, linkimg) {
		return fetch(`${this._baseUrl}/cards`, {
			method: 'POST',
			headers: this._headers,
			body: JSON.stringify({
			 name: namestate.value,
			 link: linkimg.value
			})
		})
		.then(res => _returnError(res)) 	
	}


	getSwapAvatar(avatarImage) {
		return fetch(`${this._baseUrl}/users/me/avatar`, {
			method: 'PATCH',
			headers: this._headers,
			body: JSON.stringify({
				avatar: avatarImage.value
			})
		})
		.then(res => this._returnError(res))
	}


	getAddLike(cardId, meth) {
		return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
			method: `${meth}`,
			headers: this._headers
		})
		.then(res => this._returnError(res))
	}


	getDeleteCard(cardId) {
		return fetch(`${this._baseUrl}/cards/${cardId}`, {
			method: 'DELETE',
			headers: this._headers
		})
		.then(res => this._returnError(res))
	}


	_returnError(item) {
		if(item.ok){
			return item.json();
		}
		return Promise.reject(`Что-то не так: ${item.status}`);
	}
}