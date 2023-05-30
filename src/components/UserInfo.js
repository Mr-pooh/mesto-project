export default class UserInfo{
constructor( name, about ){
		this._name = document.querySelector(`.${name}`);
		this._about = document.querySelector(`.${about}`);
		
/* 		this._renderer = renderer;
		this._formAdd = formAdd; */
	}

	getUserInfo({ name, about }) {

		this._name.textContent =	name,
		this._about.textContent = about;

	}

	setUserInfo(setInfo) {
		this._setInfo = setInfo;
	}

}