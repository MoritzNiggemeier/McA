import * as UI from './ui.js';
import * as Track from './track.js';
import { Clip } from './clip.js';
import { VUmeter } from './vuMeter.js';


export	class Channel{

	private	_cID		: number;
	private	_clip		: Clip[];
	private	_data		: Float32Array;
	private	_analyser	: AnalyserNode;
	private	_container	: HTMLElement;
	public	vuMeter		: VUmeter;

	constructor( cID: number, data: Float32Array ){

		this._cID = cID;
		this._clip = [];
		this._data = data;

		this._analyser = new AnalyserNode(Track.audio.context!);

		this._container = document.createElement('div');
		this._container.setAttribute('class','channelContainer');

		let channelLeftContainer = document.createElement('div');
			channelLeftContainer.setAttribute('class','channelLeftContainer');

		let channelMiddleContainer = document.createElement('div');
			channelMiddleContainer.setAttribute('class','channelMiddleContainer');

		let channelRightContainer = document.createElement('div');
			channelRightContainer.setAttribute('class','channelRightContainer');

		let channelButtonMute = document.createElement('button');
			channelButtonMute.setAttribute('class','channelButton channelButtonMute');
			channelButtonMute.addEventListener('click', function(){ UI.buttonChannelMute(cID);} );

		let channelButtonSolo = document.createElement('button');
			channelButtonSolo.setAttribute('class','channelButton channelButtonSolo');
			channelButtonSolo.addEventListener('click', function(){ UI.buttonChannelSolo(cID);} );

		let channelButtonTrash = document.createElement('button');
			channelButtonTrash.setAttribute('class','channelButton channelButtonTrash');
			channelButtonTrash.addEventListener('click', function(){ UI.buttonChannelTrash(cID);} );

		let channelVolume = document.createElement('input');
			channelVolume.setAttribute('type','range');
			channelVolume.setAttribute('min','0');
			channelVolume.setAttribute('max','100');
			channelVolume.setAttribute('step','10');
			channelVolume.setAttribute('value','0');
			channelVolume.setAttribute('orient','vertical');
			channelVolume.setAttribute('class','channelVolume');

		this.vuMeter = new VUmeter( 'channelVUmeterContainer', 'channelVUmeterSegment', 12 );

		channelLeftContainer.appendChild(channelButtonMute);
		channelLeftContainer.appendChild(channelButtonSolo);
		channelLeftContainer.appendChild(channelButtonTrash);
		channelRightContainer.appendChild(this.vuMeter.node);
		this._container.appendChild(channelLeftContainer);
		this._container.appendChild(channelMiddleContainer);
		this._container.appendChild(channelRightContainer);

		let clip = new Clip( data );
		this._clip.push( clip );
		channelMiddleContainer.appendChild( clip.svg );

		//FIXME
		console.log( this._cID );
		console.log( this._data );
		console.log( this._analyser );

	}

	get clip(): Clip[]{
		return this._clip;
	}

	get container(): HTMLElement{
		return this._container;
	}

}