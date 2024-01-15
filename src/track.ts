import { MCA } from './index.js';
import * as UI from './ui.js';
import * as Type from './types.js';
import { renderLoop } from './index.js';
import { Channel } from './channel.js';


const svgNS = "http://www.w3.org/2000/svg";


export	let container	: HTMLElement;
export	let svg			: SVGElement;

export	let playback	: SVGElement;
export	let cursor		: SVGElement;
export	let marker		: SVGElement;
export	let markerA		: SVGElement;
export	let markerB		: SVGElement;

export	let res			= { width: 2000, height: 100 };



let zoom = 1;

export	function getZoom(): number {
	return zoom;
}

export	function setZoom( z: number ): void {
	zoom = z;
}

export	let audio: Type.AudioConfig = {
	isInitialized: false,
	isPlaying: false,
	isPaused: false,
	isLooping: false,
	duration: 0,
	durationAB: 0,
	offset: 0,
}

export	function init(): void {
	audio.context = new window.AudioContext();
	audio.analyser = new AnalyserNode(audio.context);
	audio.amplitude = new Uint8Array(audio.analyser.frequencyBinCount);
	audio.timeDomain = new Float32Array(audio.analyser.fftSize);

	container = document.createElement('div');
	container.setAttribute('class','trackContainer');
	MCA.ui.window!.appendChild(container);

	svg = document.createElementNS(svgNS, "svg");
	svg.setAttribute('preserveAspectRatio','none');
	svg.setAttribute('width','3200');
	svg.setAttribute('height','100');
	svg.setAttribute('style','width:100%;height:100%;background-color:#0000;');
	svg.setAttribute('viewBox', `0 0 ${res.width} ${res.height}`);

	playback = document.createElementNS(svgNS,'rect');
	playback.setAttribute('x','0');
	playback.setAttribute('y','0');
	playback.setAttribute('width','1');
	playback.setAttribute('height','100');
	playback.setAttribute('fill','#ffffff');

	cursor = document.createElementNS(svgNS,'rect');
	cursor.setAttribute('x','0');
	cursor.setAttribute('y','0');
	cursor.setAttribute('width','1');
	cursor.setAttribute('height','100');
	cursor.setAttribute('fill','#ffffff');

	marker = document.createElementNS(svgNS,'rect');
	marker.setAttribute('x','0');
	marker.setAttribute('y','0');
	marker.setAttribute('width','1');
	marker.setAttribute('height','100');
	marker.setAttribute('fill','#ffffff');

	markerA = document.createElementNS(svgNS,'rect');
	markerA.setAttribute('x','0');
	markerA.setAttribute('y','0');
	markerA.setAttribute('width','1');
	markerA.setAttribute('height','100');
	markerA.setAttribute('fill','#00ff00');

	markerB = document.createElementNS(svgNS,'rect');
	markerB.setAttribute('x','0');
	markerB.setAttribute('y','0');
	markerB.setAttribute('width','1');
	markerB.setAttribute('height','100');
	markerB.setAttribute('fill','#00ff00');

	svg.appendChild(playback);
	svg.appendChild(cursor);
	svg.appendChild(marker);
	svg.appendChild(markerA);
	svg.appendChild(markerB);

	svg.addEventListener('mousedown', UI.onClipDrag );
	svg.addEventListener('click', UI.mouseChannelClick );
	svg.addEventListener('mousemove', UI.mouseChannelMove);
	svg.addEventListener('mouseout', UI.mouseChannelOut );

	container.appendChild(svg);
}

export	let pos = { playback : 0, cursor : 0, marker : 0, markerA : 0, markerB : 0 }

export	function process( buffer: ArrayBuffer ){

	if( MCA.init ) { reset(); }

	console.time('decodeAudioData');
	return audio.context!.decodeAudioData(buffer)
	.then(audioBuffer => {
	if( !audio.context ){ return; }
		console.timeEnd('decodeAudioData');

		MCA.init = true;
		audio.buffer = audioBuffer;

		splitChannels(audioBuffer);

		const source = audio.context.createBufferSource();

		source.buffer = audioBuffer;
		source.connect(audio.context.destination);

		audio.source = new AudioBufferSourceNode(audio.context, {
			buffer: audioBuffer,
			loop: true
		});

		audio.duration = audio.source!.buffer!.duration;

		MCA.ui.clock!.length.time = audio.source.buffer!.duration;

		pos.markerB = audio.source.buffer!.duration;
		MCA.ui.clock!.markerB.time = pos.markerB;

		setupNodes();
		UI.activate();
		renderLoop();

	});
}

export	function play(): void {
	if( audio.isPlaying && !audio.isPaused ){
		audio.isPaused = true;
		audio.source!.onended = null;
		audio.source!.stop();
		pos.playback += audio.context!.currentTime - audio.offset;
		MCA.ui.button!.play.setAttribute('class','button btnPlay');
	} else {
		audio.isPlaying = true;
		audio.isPaused = false;
		audio.source = new AudioBufferSourceNode(audio.context!, { buffer: audio.buffer });
		audio.source.connect(audio.analyser!);
		audio.source.connect(audio.context!.destination);
		audio.offset = audio.context!.currentTime;
		audio.source.onended = onTrackStop;
		if( audio.durationAB > 0 ){
			audio.source.start( 0, pos.playback, audio.durationAB - ( pos.playback - pos.markerA ));
		} else {
			audio.source.start( 0, pos.playback );
		}
		MCA.ui.button!.play.setAttribute('class','button btnPause');
		MCA.ui.button!.stop.removeAttribute('disabled');
	}
}

export	function stop(): void {
	audio.source!.onended = null;
	if( audio.isPlaying && !audio.isPaused ){ audio.source!.stop(); }
	audio.isPlaying = false;
	audio.isPaused = false;
	audio.durationAB = 0;
	pos.playback = pos.marker;
	MCA.ui.button!.play.setAttribute('class','button btnPlay');
	MCA.ui.button!.stop.setAttribute('disabled','');
}
	
export	function getTime(): number {
	if( audio.isPlaying && !audio.isPaused ){
		return audio.context!.currentTime - audio.offset + pos.playback;
	} else {
		return pos.playback;
	}
}
	
export	function setTime( sec: number ): void {
	if( sec < 0 ){ sec = 0; }
	if( sec > audio.duration ){ sec = audio.duration; }
	pos.playback = sec;
	if( audio.isPlaying && !audio.isPaused ){
		audio.source!.onended = null;
		audio.source!.stop();
		audio.isPlaying = false;
		play();
	}
}

function splitChannels( audioBuffer: AudioBuffer ): void {
	for( let cID = 0; cID < audioBuffer.numberOfChannels; cID++ ){
		addChannel( audioBuffer.getChannelData(cID), cID );
	}
}

function reset(): void {
	stop();
	MCA.channel = [];
	pos = { playback : 0, cursor : 0, marker : 0, markerA : 0, markerB : 0 };
	while( MCA.ui.window?.firstChild ){ MCA.ui.window.removeChild( MCA.ui.window.firstChild ); }
}

function addChannel( audioBuffer: Float32Array, cID: number ): void{
	let ct = new Channel( cID, audioBuffer );
	MCA.channel.push( ct );
	MCA.ui.window!.appendChild(ct.container);
}

function setupNodes(): void {
	let javascriptNode = audio.context!.createScriptProcessor(1024, 1, 1);
		javascriptNode.onaudioprocess = () => { audio.analyser!.getByteTimeDomainData(audio.amplitude!); };
		audio.source!.connect(audio.context!.destination);
		audio.source!.connect(audio.analyser!);
		audio.analyser!.connect(javascriptNode);
	javascriptNode.connect(audio.context!.destination);
}

function onTrackStop(){
	if( audio.isLooping ){
		setTime( audio.durationAB > 0 ? pos.markerA : 0 );
	} else {
		stop();
	}
}