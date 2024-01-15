import * as Type from './types.js';
import * as DOM from './dom.js';
import * as Viz1 from './viz1.js';
import * as Track from './track.js';


export const MCA: Type.MCAconfig = {
	init: false,
	channel: [],
	ui: {},
};


export function renderLoop(){
	const svgpos = (sec: number) => (sec / Track.audio.duration * Track.res.width).toString();
	MCA.channel.forEach( channel => {
		Track.cursor.setAttribute('x', svgpos( Track.pos.cursor ));
		Track.marker.setAttribute('x', svgpos( Track.pos.marker ));
		Track.markerA.setAttribute('x', svgpos( Track.pos.markerA ));
		Track.markerB.setAttribute('x', svgpos( Track.pos.markerB ));
		Track.playback.setAttribute('x', svgpos( Track.getTime()));
		channel.vuMeter.update();
	});
	MCA.ui.clock!.position.time = Track.getTime();
	MCA.ui.clock!.cursor.time = Track.pos.cursor;
	MCA.ui.clock!.selection.time = Track.pos.playback;
	Track.container.setAttribute('style',`width:${MCA.channel[0].clip[0].svg.clientWidth}px;height:${MCA.channel.length * 107}px;`);	//TODO out of renderLoop
	Viz1.render();
	requestAnimationFrame( renderLoop );
}


function init(): void {
	DOM.createUI();
}
init();