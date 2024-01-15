export	class Clock{

	private	_time: number = 0;

	private	_textContainer: HTMLElement;
	private	_timeContainer: HTMLElement;
	private	_textNode: Text;
	private	_timeNode: Text;

	constructor( text: string ){

		this._textNode = document.createTextNode(`${text.toUpperCase()}\n`);
		this._timeNode = document.createTextNode('00:00:00.000');

		this._textContainer = document.createElement('p');
		this._textContainer.setAttribute('class','uiClock');

		this._timeContainer = document.createElement('span');
		this._timeContainer.setAttribute('class','uiClockData');

		this._timeContainer.appendChild( this._timeNode );
		this._textContainer.appendChild( this._textNode );
		this._textContainer.appendChild( this._timeContainer );

	}

	get node(): HTMLElement{
		return this._textContainer;
	}

	get time(): number{
		return this._time;
	}

	set time( time: number ){
		this._time = time;
		this._timeNode.nodeValue = new Date(this._time * 1000).toISOString().slice(11,-1);
	}

}