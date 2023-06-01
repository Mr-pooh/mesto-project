export default class Section {
	constructor( { renderer}, selectorContain ){
		this._renderer = renderer;
		this._container = selectorContain;
	}

/* 	setItem(element){
		this._container.append(element);
	} */

	addItem(element, idPerson){
		this._container.prepend(this._renderer(element, idPerson));
	}

	renderItems(items, idPerson){
		this._renderItems = items;
		this._renderItems.forEach((item) => {
			this._container.append(this._renderer(item, idPerson))
		})
		
	}

}