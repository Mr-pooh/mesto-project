export default class UserInfo{
	constructor({ name, avatar, about}){
		this._name = name;
		this._about = about;
		this._avatar = avatar;
	}

	getUserInfo() {
		this._element = document.querySelector('.profile');

		this._element.querySelector('.profile-info__name').textContent = this._name;

		this._element.querySelector('.profile-info__profession').textContent = this._about;

		this._element.querySelector('.profile__image').src = this._avatar;

		
	}

	setUserInfo(api, {inputName, inputJob, inputUrl}) {
		api.getSwapTextProfile(inputName, inputJob)
		.then((res) => {
			this._element.querySelector('.profile-info__name').textContent = res.name;
			this._element.querySelector('.profile-info__profession').textContent = res.about;
		})
		.catch(err => console.log(err));
		api.getSwapAvatar(inputUrl)
		.then((res) => {
			this._element.querySelector('.profile__image').src = res.avatar;
		})
		.catch(err => console.log(err));
	}

}