export default class UserInfo{
	constructor({ name, avatar, about, _id }){
		this._name = name;
		this._about = about;
		this._avatar = avatar;
		this._id = _id;
	}

	getUserInfo({names, aboutJob, avatars}) {
		names.textContent = this._name;
		aboutJob.textContent = this._about;
		avatars.src = this._avatar;
		
	}

	setUserInfo() {

	}

}