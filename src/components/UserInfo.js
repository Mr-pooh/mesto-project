export default class UserInfo{
constructor({ name, avatar, about}, renderer, formAdd){
		this._name = name;
		this._about = about;
		this._avatar = avatar;
		this._renderer = renderer;
		this._formAdd = formAdd;
	}

	getUserInfo(bool) {
		this._element = document.querySelector('.profile');

		this._element.querySelector('.profile-info__name').textContent = this._name;

		this._element.querySelector('.profile-info__profession').textContent = this._about;

		this._element.querySelector('.profile__image').src = this._avatar;


			this._formAdd()

	}

	setUserInfo(formData) {
		this._renderer(formData);
	}

}