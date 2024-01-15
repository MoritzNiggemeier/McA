import { MCA } from './index.js';
import { Clock } from './clock.js';
import * as UI from './ui.js';


export	function createUI(): void {
	
	let uiContainer = document.createElement('div');
		uiContainer.setAttribute('class','uiContainer');

	uiContainer.appendChild( createUIheader());
	MCA.ui.window = uiContainer.appendChild( createUIwindow() );
	uiContainer.appendChild( createUIfooter());
	uiContainer.appendChild( createCanvas());

	document.body.appendChild(uiContainer);
}


function createUIheader(): HTMLElement {

	let uiHeader = document.createElement('div');
		uiHeader.setAttribute('class','uiHeader');

	uiHeader.appendChild( createButtons());
	return uiHeader;
}


function createUIwindow(): HTMLElement {

	let uiWindow = document.createElement('div');
		uiWindow.setAttribute('class','uiWindow');

	return uiWindow;
}


function createUIfooter(): HTMLElement {

	let uiFooter = document.createElement('div');
		uiFooter.setAttribute('class','uiFooter');

	uiFooter.appendChild( createUIClocks());
	return uiFooter;
}


function createButtons(): HTMLElement{
	//	const htmlNS = "http://www.w3.org/1999/xhtml";

	let uiMenuButtons = document.createElement('div');
		uiMenuButtons.setAttribute('class','uiMenuButtons');

	let btnSeekStart = document.createElement('button');
		btnSeekStart.setAttribute('class','button btnSeekStart');
		btnSeekStart.setAttribute('disabled','');
		btnSeekStart.addEventListener('click', UI.buttonSeekStart );

	let btnSeekEnd = document.createElement('button');
		btnSeekEnd.setAttribute('class','button btnSeekEnd');
		btnSeekEnd.setAttribute('disabled','');
		btnSeekEnd.addEventListener('click', UI.buttonSeekEnd );

	let btnSeekBack = document.createElement('button');
		btnSeekBack.setAttribute('class','button btnSeekBack');
		btnSeekBack.setAttribute('disabled','');
		btnSeekBack.addEventListener('click', UI.buttonSeekBack );

	let btnSeekForward = document.createElement('button');
		btnSeekForward.setAttribute('class','button btnSeekForward');
		btnSeekForward.setAttribute('disabled','');
		btnSeekForward.addEventListener('click', UI.buttonSeekForward );

	let btnSeekMarkerA = document.createElement('button');
		btnSeekMarkerA.setAttribute('class','button btnSeekMarkerA');
		btnSeekMarkerA.setAttribute('disabled','');
		btnSeekMarkerA.addEventListener('click', UI.buttonSeekMarkerA );

	let btnSeekMarkerB = document.createElement('button');
		btnSeekMarkerB.setAttribute('class','button btnSeekMarkerB');
		btnSeekMarkerB.setAttribute('disabled','');
		btnSeekMarkerB.addEventListener('click', UI.buttonSeekMarkerB );

	let btnStop = document.createElement('button');
		btnStop.setAttribute('class','button btnStop');
		btnStop.setAttribute('disabled','');
		btnStop.addEventListener('click', UI.buttonStop );

	let btnPlay = document.createElement('button');
		btnPlay.setAttribute('class','button btnPlay');
		btnPlay.setAttribute('disabled','');
		btnPlay.addEventListener('click', UI.buttonPlay );

	let btnPlayAB = document.createElement('button');
		btnPlayAB.setAttribute('class','button btnPlayAB');
		btnPlayAB.setAttribute('disabled','');
		btnPlayAB.addEventListener('click', UI.buttonPlayAB );

	let btnLoop = document.createElement('button');
		btnLoop.setAttribute('class','button btnLoop');
		btnLoop.setAttribute('disabled','');
		btnLoop.addEventListener('click', UI.buttonLoop );

	let btnEject = document.createElement('input');
		btnEject.setAttribute('id','fileInput');
		btnEject.setAttribute('type','file');
		btnEject.addEventListener('change', UI.buttonEject );

	let btnEjectLabel = document.createElement('label');
		btnEjectLabel.setAttribute('for','fileInput');
		btnEjectLabel.setAttribute('class','ejectLabel');

	let btnEjectImg = document.createElement('span');
		btnEjectImg.setAttribute('class','button btnEject');

	let btnSetMarkerA = document.createElement('button');
		btnSetMarkerA.setAttribute('class','button btnSetMarkerA');
		btnSetMarkerA.setAttribute('disabled','');
		btnSetMarkerA.addEventListener('click', UI.buttonSetMarkerA );

	let btnSetMarkerB= document.createElement('button');
		btnSetMarkerB.setAttribute('class','button btnSetMarkerB');
		btnSetMarkerB.setAttribute('disabled','');
		btnSetMarkerB.addEventListener('click', UI.buttonSetMarkerB );

	let btnZoomIn = document.createElement('button');
		btnZoomIn.setAttribute('class','button btnZoomIn');
		btnZoomIn.setAttribute('disabled','');
		btnZoomIn.addEventListener('click', UI.buttonZoomIn );

	let btnZoomOut = document.createElement('button');
		btnZoomOut.setAttribute('class','button btnZoomOut');
		btnZoomOut.setAttribute('disabled','');
		btnZoomOut.addEventListener('click', UI.buttonZoomOut );

	let btnZoomArea = document.createElement('button');
		btnZoomArea.setAttribute('class','button btnZoomArea');
		btnZoomArea.setAttribute('disabled','');
		btnZoomArea.addEventListener('click', UI.buttonZoomArea );

	let btnZoomReset = document.createElement('button');
		btnZoomReset.setAttribute('class','button btnZoomReset');
		btnZoomReset.setAttribute('disabled','');
		btnZoomReset.addEventListener('click', UI.buttonZoomReset );

	let btnEditCut = document.createElement('button');
		btnEditCut.setAttribute('class','button btnEditCut');
		btnEditCut.setAttribute('disabled','');
		btnEditCut.addEventListener('click', UI.buttonEditCut );

	let btnDummy1 = document.createElement('span');
		btnDummy1.setAttribute('class','button btnDummy');

	let btnDummy2 = document.createElement('button');
		btnDummy2.setAttribute('class','button btnDummy');

	let btnDummy3 = document.createElement('button');
		btnDummy3.setAttribute('class','button btnDummy');

	let btnDummy4 = document.createElement('button');
		btnDummy4.setAttribute('class','button btnDummy');

	let btnDummy5 = document.createElement('button');
		btnDummy5.setAttribute('class','button btnDummy');

	let btnDummy6 = document.createElement('button');
		btnDummy6.setAttribute('class','button btnDummy');

	let btnDummy7 = document.createElement('button');
		btnDummy7.setAttribute('class','button btnDummy');

	btnEjectLabel.appendChild(btnEjectImg);
	uiMenuButtons.appendChild(btnSeekStart);
	uiMenuButtons.appendChild(btnSeekBack);
	uiMenuButtons.appendChild(btnDummy1);
	uiMenuButtons.appendChild(btnStop);
	uiMenuButtons.appendChild(btnPlay);
	uiMenuButtons.appendChild(btnDummy2);
	uiMenuButtons.appendChild(btnEjectLabel);
	uiMenuButtons.appendChild(btnEject);
	uiMenuButtons.appendChild(btnDummy3);
	uiMenuButtons.appendChild(btnSeekForward);
	uiMenuButtons.appendChild(btnSeekEnd);
	uiMenuButtons.appendChild(btnDummy4);
	uiMenuButtons.appendChild(btnSeekMarkerA);
	uiMenuButtons.appendChild(btnSetMarkerA);
	uiMenuButtons.appendChild(btnPlayAB);
	uiMenuButtons.appendChild(btnSetMarkerB);
	uiMenuButtons.appendChild(btnSeekMarkerB);
	uiMenuButtons.appendChild(btnDummy5);
	uiMenuButtons.appendChild(btnLoop);
	uiMenuButtons.appendChild(btnDummy6);
	uiMenuButtons.appendChild(btnEditCut);
	uiMenuButtons.appendChild(btnDummy7);
	uiMenuButtons.appendChild(btnZoomIn);
	uiMenuButtons.appendChild(btnZoomOut);
	uiMenuButtons.appendChild(btnZoomArea);
	uiMenuButtons.appendChild(btnZoomReset);

	MCA.ui.button = {
		seekStart	: btnSeekStart,
		seekEnd		: btnSeekEnd,
		seekBack	: btnSeekBack,
		seekForward : btnSeekForward,
		seekMarkerA : btnSeekMarkerA,
		seekMarkerB : btnSeekMarkerB,
		stop		: btnStop,
		play		: btnPlay,
		playAB		: btnPlayAB,
		loop		: btnLoop,
		editCut		: btnEditCut,
		setMarkerA	: btnSetMarkerA,
		setMarkerB	: btnSetMarkerB,
		zoomIn		: btnZoomIn,
		zoomOut		: btnZoomOut,
		zoomArea	: btnZoomArea,
		zoomReset	: btnZoomReset
	}

	return uiMenuButtons;
}


function createUIClocks(): HTMLElement {

	MCA.ui.clock = {
		position	: new Clock('position'),
		remaining	: new Clock('remaining'),
		cursor		: new Clock('cursor'),
		length		: new Clock('length'),
		marker		: new Clock('marker'),
		markerA		: new Clock('marker A'),
		markerB		: new Clock('marker B'),
		selection	: new Clock('selection'),
	};

	let uiClockContainer = document.createElement('div');
		uiClockContainer.setAttribute('class','uiClockContainer');
		uiClockContainer.appendChild( MCA.ui.clock.position.node );
		uiClockContainer.appendChild( MCA.ui.clock.remaining.node );
		uiClockContainer.appendChild( MCA.ui.clock.cursor.node );
		uiClockContainer.appendChild( MCA.ui.clock.length.node );
		uiClockContainer.appendChild( MCA.ui.clock.marker.node );
		uiClockContainer.appendChild( MCA.ui.clock.markerA.node );
		uiClockContainer.appendChild( MCA.ui.clock.markerB.node );
		uiClockContainer.appendChild( MCA.ui.clock.selection.node );

	return uiClockContainer;
}


function createCanvas(): HTMLCanvasElement {
	let canvas = document.createElement('canvas');
		canvas.setAttribute('class','canvas');
		canvas.setAttribute('width','1024');
		canvas.setAttribute('height','512');

	MCA.ui.viz1 = canvas;
	return canvas;
}