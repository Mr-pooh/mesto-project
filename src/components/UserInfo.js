export default class UserInfo{
constructor( name, about ){
		this._name = document.querySelector(`.${name}`);
		this._about = document.querySelector(`.${about}`);
		this._avatar = document.querySelector('.profile__image');
	}

	// возвращает обьект с инф. пользователя
	getUserInfo() {
		return this._setInfo
	}

	// добавление инф. о пользователе на страницу
	setUserInfo(setInfo) {
		this._setInfo = setInfo;

		this._name.textContent =	this._setInfo.name,
		this._about.textContent = this._setInfo.about;
	}

	// добавление аватара на страницу
	setAvatar(data) {
		// перезапись актуального обьекта с инф. польз.
		this._setInfo = data;

		this._avatar.src = data.avatar;
	}
}