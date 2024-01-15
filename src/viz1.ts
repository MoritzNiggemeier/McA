import { MCA } from './index.js';
import * as Track from './track.js';


export	function render(): void {
	let canvas = MCA.ui.viz1!;
	let context = canvas.getContext("2d")!;
	context.clearRect(0, 0, canvas.width, canvas.height);
	for( let i = 0; i < Track.audio.amplitude!.length; i++ ){
		const value = Track.audio.amplitude![i] / 256;
		const y = canvas.height - canvas.height * value;
		context!.fillStyle = "lime";
		context!.fillRect(i, y, 1, 1);
	}
}