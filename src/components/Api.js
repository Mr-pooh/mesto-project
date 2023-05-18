const config = {
	baseUrl: 'https://nomoreparties.co/v1/plus-cohort-23',
	headers: {
		authorization: '43b4a3de-4bbd-4be1-abd1-bf011e8ef6fa',
			'Content-Type': 'application/json'
	}
}


function returnError(item) {
	if(item.ok){
		return item.json();
	}
	return Promise.reject(`Что-то не так: ${item.status}`);
}

class Api {
	constructor(options){
		this._baseUrl = options.baseUrl;
		this._headers = options.headers;
	}
	getInitialCard() {
		return fetch(`${this._baseUrl}/cards`).then(res => returnError(res))
	}
	getInitialProfile() {
		return fetch(`${this._baseUrl}/users/me`).then(res => returnError(res))
	}

}