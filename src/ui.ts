import { MCA } from './index.js';
import * as Track from './track.js';


export	function buttonSeekStart(): void {
//	console.log('pressed ButtonSeekStart');
	Track.setTime( 0 );
}
	
export	function buttonSeekBack(): void {
//	console.log('pressed ButtonSeekBack');
	Track.setTime( Track.getTime() - 5 );
}
	
export	function buttonSeekMarkerA(): void {
//	console.log('pressed ButtonSeekMarkeA');
	Track.setTime( Track.pos.markerA );
}
				
export	function buttonStop(): void {
//	console.log('pressed ButtonStop');
	Track.stop();
}
	
export	function buttonPlay(): void {
//	console.log('pressed ButtonPlay');
	Track.play();
}
	
export	function buttonPlayAB(): void {
//	console.log('pressed ButtonPlayAB');
	Track.audio.durationAB = Track.pos.markerB - Track.pos.markerA;
	Track.setTime( Track.pos.markerA );
}
		
export	function buttonLoop(): void {
//	console.log('pressed ButtonLoop');
	Track.audio.isLooping = !Track.audio.isLooping;
	MCA.ui.button!.loop.setAttribute('class', 'button btnLoop' + (Track.audio.isLooping ? ' btnBlue' : ''));
}
		
export	function buttonEject( event: Event ): void {
//	console.log('pressed ButtonEject');
	if( !Track.audio.isInitialized ){ Track.init(); }
	let target = event.target as HTMLInputElement;
	if( target.files!.length > 0 ){
		let file: File = (target.files as FileList)[0];
		const reader = new FileReader();
		reader.onload = event => Track.process(event.target!.result as ArrayBuffer);
		reader.readAsArrayBuffer(file);
	}
}
	
export	function buttonSeekMarkerB(): void {
//	console.log('pressed ButtonSeekMarkerB');
	Track.setTime( Track.pos.markerB );
}
		
export	function buttonSeekForward(): void {
//	console.log('pressed ButtonSeekForward');
	Track.setTime( Track.getTime() + 5 );
}
	
export	function buttonSeekEnd(): void {
//	console.log('pressed ButtonSeekEnd');
	Track.setTime( Track.audio.duration );
}
	
export	function buttonSetMarkerA(): void {
//	console.log('pressed ButtonSetMarkerA');
	Track.pos.markerA = Track.pos.marker;
	MCA.ui.clock!.markerA.time = Track.pos.markerA;
}
	
export	function buttonSetMarkerB(): void {
//	console.log('pressed ButtonSetMarkerB');
	Track.pos.markerB = Track.pos.marker;
	MCA.ui.clock!.markerB.time = Track.pos.markerB;
}

export	function buttonZoomIn(): void {
	Track.setZoom( Track.getZoom() + 0.1 );
	console.log(`pressed ButtonZoomIn (zoom: ${Track.getZoom()})`);
}
	
export	function buttonZoomOut(): void {
	Track.setZoom( Track.getZoom() - 0.1 );
	console.log(`pressed ButtonZoomOut (zoom: ${Track.getZoom()})`);
}
	
export	function buttonZoomArea(): void {
	console.log(`pressed ButtonZoomArea (zoom: ${Track.getZoom()})`);
}
	
export	function buttonZoomReset(): void {
	Track.setZoom( 1 );
	console.log(`pressed ButtonZoomReset (zoom: ${Track.getZoom()})`);
}

export	function buttonEditCut(): void {
	console.log('pressed ButtonEditCut');
}
	
export	function buttonChannelMute( cID: number ): void {
	console.log(`pressed ButtonMuteChannel(${cID})`);
}
	
export	function buttonChannelSolo( cID: number ): void {
	console.log(`pressed ButtonSoloChannel(${cID})`);
}
	
export	function buttonChannelTrash( cID: number ): void {
	console.log(`pressed ButtonRemoveChannel(${cID})`);
}

export	function mouseChannelClick( event: MouseEvent ): void {
	const position = ( event.offsetX / MCA.channel[0].clip[0].svg.getBoundingClientRect().width ) * Track.audio.duration;	// FIXME clip[id]
	if( position < Track.pos.markerB ){ MCA.ui.button!.setMarkerA.removeAttribute('disabled'); }
	if( position > Track.pos.markerA ){ MCA.ui.button!.setMarkerB.removeAttribute('disabled'); }
	if( position >= Track.pos.markerB ){ MCA.ui.button!.setMarkerA.setAttribute('disabled',''); }
	if( position <= Track.pos.markerA ){ MCA.ui.button!.setMarkerB.setAttribute('disabled',''); }
	Track.pos.marker = position;
	Track.setTime( position );

}

export	function mouseChannelMove( event: MouseEvent ): void {
	Track.pos.cursor = event.offsetX / MCA.channel[0].clip[0].svg.getBoundingClientRect().width * Track.audio.duration;	// FIXME clip[id]
}

export	function mouseChannelOut(): void {
	Track.pos.cursor = 0;
}



let offsetX = 0;

export	function onClipDrag( event: MouseEvent ): void {
	console.log( event );
	offsetX = event.clientX;
	document.addEventListener('mouseup', onClipDrop);
	document.addEventListener('mousemove', onClipMove);
}

export	function onClipMove( event: MouseEvent ): void {
	let x = event.clientX - offsetX;
	console.log( x );
}

export	function onClipDrop(): void {
	document.removeEventListener('mouseup', onClipDrop);
	document.removeEventListener('mousemove', onClipMove);
}

export function activate(): void {
	MCA.ui.button!.seekStart.removeAttribute('disabled');
	MCA.ui.button!.seekEnd.removeAttribute('disabled');
	MCA.ui.button!.seekBack.removeAttribute('disabled');
	MCA.ui.button!.seekForward.removeAttribute('disabled');
	MCA.ui.button!.seekMarkerA.removeAttribute('disabled');
	MCA.ui.button!.seekMarkerB.removeAttribute('disabled');
	MCA.ui.button!.setMarkerA.removeAttribute('disabled');
	MCA.ui.button!.setMarkerB.removeAttribute('disabled');
	MCA.ui.button!.play.removeAttribute('disabled');
	MCA.ui.button!.playAB.removeAttribute('disabled');
	MCA.ui.button!.loop.removeAttribute('disabled');
	MCA.ui.button!.editCut.removeAttribute('disabled');
	MCA.ui.button!.zoomIn.removeAttribute('disabled');
	MCA.ui.button!.zoomOut.removeAttribute('disabled');
	MCA.ui.button!.zoomArea.removeAttribute('disabled');
	MCA.ui.button!.zoomReset.removeAttribute('disabled');
}