import {Channel} from './channel.js';
import {Clock} from './clock.js';


export	type UIbutton = {
	seekStart	: HTMLButtonElement;
	seekEnd		: HTMLButtonElement;
	seekBack	: HTMLButtonElement;
	seekForward : HTMLButtonElement;
	seekMarkerA : HTMLButtonElement;
	seekMarkerB : HTMLButtonElement;
	stop		: HTMLButtonElement;
	play		: HTMLButtonElement;
	playAB		: HTMLButtonElement;
	loop		: HTMLButtonElement;
	editCut		: HTMLButtonElement;
	setMarkerA	: HTMLButtonElement;
	setMarkerB	: HTMLButtonElement;
	zoomIn		: HTMLButtonElement;
	zoomOut		: HTMLButtonElement;
	zoomArea	: HTMLButtonElement;
	zoomReset	: HTMLButtonElement;
}

export	type UIclock = {
	position	: Clock;
	remaining	: Clock;
	cursor		: Clock;
	length		: Clock;
	marker		: Clock;
	markerA		: Clock;
	markerB		: Clock;
	selection	: Clock;
}

export	type AudioConfig = {	//TODO should be represented by Track
	isInitialized	: boolean,
	isPlaying		: boolean,
	isPaused		: boolean,
	isLooping		: boolean,
	duration		: number,
	durationAB		: number,
	offset			: number,
	context?		: AudioContext,
	buffer?			: AudioBuffer,
	source?			: AudioBufferSourceNode,
	analyser?		: AnalyserNode,
	amplitude?		: Uint8Array,
	timeDomain?		: Float32Array,
}

export	type MCAconfig = {
	init				: boolean,
	channel				: Channel[],
	ui: Partial<{
		window			: HTMLElement,
		button			: UIbutton,
		clock			: UIclock,
		viz1			: HTMLCanvasElement,
	}>
}