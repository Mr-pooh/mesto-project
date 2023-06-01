


export default class Api {
	constructor(options){
		this._baseUrl = options.baseUrl;
		this._headers = options.headers;
	}


	getInitialCard() {
		return fetch(`${this._baseUrl}/cards`, {
			headers: this._headers
		})
		.then(res => this._getResponseData(res))
	}


	getInitialProfile() {
		return fetch(`${this._baseUrl}/users/me`, {
			headers: this._headers
		})
		.then(res => this._getResponseData(res))
	}


	getSwapTextProfile(nikname, job) {
		return fetch(`${this._baseUrl}/users/me`, {
			method: 'PATCH',
			headers: this._headers,
			body: JSON.stringify({
				name: nikname,
				about: job
			})
		}).then(res => this._getResponseData(res))
	}


	getAddCardOnServer(namestate, linkimg) {
		return fetch(`${this._baseUrl}/cards`, {
			method: 'POST',
			headers: this._headers,
			body: JSON.stringify({
			 name: namestate,
			 link: linkimg
			})
		})
		.then(res => this._getResponseData(res)) 	
	}


	getSwapAvatar(avatarImage) {
		return fetch(`${this._baseUrl}/users/me/avatar`, {
			method: 'PATCH',
			headers: this._headers,
			body: JSON.stringify({
				avatar: avatarImage
			})
		})
		.then(res => this._getResponseData(res))
	}


	getAddLike(cardId, meth) {
		return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
			method: `${meth}`,
			headers: this._headers
		})
		.then(res => this._getResponseData(res))
	}


	getDeleteCard(cardId) {
		return fetch(`${this._baseUrl}/cards/${cardId}`, {
			method: 'DELETE',
			headers: this._headers
		})
		.then(res => this._getResponseData(res))
	}


	_getResponseData(item) {
		if(item.ok){
			return item.json();
		}
		return Promise.reject(`Что-то не так: ${item.status}`);
	}
}
