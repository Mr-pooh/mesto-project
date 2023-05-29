export default class Section {
	constructor( { items, renderer}, selectorContain ){
		this._renderItems = items;
		this._renderer = renderer;
		this._container = selectorContain;
	}

	setItem(element){
		this._container.append(element);
	}

	addItem(element){
		this._container.prepend(element);
	}

	renderItems(){
		
		this._renderItems.forEach((item) => {
			this._renderer(item);
			
		});
	}

}