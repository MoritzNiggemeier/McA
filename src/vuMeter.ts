import * as Track from './track.js';


export	class VUmeter{

	private	_container: HTMLElement;
	private	_segment: HTMLElement[];
	private	_resolution: number;

	constructor( containerClass: string, segmentClass: string, resolution: number ){

		this._container = document.createElement('div');
		this._container.setAttribute('class', containerClass);

		this._resolution = resolution;

		this._segment = [];
		for( let i = 0; i < resolution; i++ ){
			let segment = document.createElement('div');
				segment.setAttribute('class', segmentClass)
			this._segment.push(segment);
			this._container.appendChild(segment);
		}
	}

	get node(): HTMLElement{
		return this._container;
	}

	private set value( value: number ){
		for( let i = 0; i < this._segment.length; i++ ){
			let col = '0f0';
			if( i < 6 ){ col = 'ff0'; }
			if( i < 3 ){ col = 'f00'; }
			col = value > ((this._resolution - i ) / this._resolution ) ? col : '444';
			this._segment[i].setAttribute('style',`background-color:#${col};`);
		}
	}

	update(): void {
		Track.audio.analyser!.getFloatTimeDomainData(Track.audio.timeDomain!);
		let sumOfSquares = 0;
		for (let i = 0; i < Track.audio.timeDomain!.length; i++) {
		  sumOfSquares += Track.audio.timeDomain![i] ** 2;
		}
		let avgPowerDecibels = 10 * Math.log10(sumOfSquares / Track.audio.timeDomain!.length);
		let peakInstantaneousPower = 0;
		for (let i = 0; i < Track.audio.timeDomain!.length; i++) {
		  let power = Track.audio.timeDomain![i] ** 2;
		  peakInstantaneousPower = Math.max(power, peakInstantaneousPower);
		}
		let peakInstantaneousPowerDecibels = 10 * Math.log10(peakInstantaneousPower);
		avgPowerDecibels + peakInstantaneousPowerDecibels;
		this.value = ( avgPowerDecibels > -30 ) ? (( 30 + avgPowerDecibels ) / 30) : 0;
	}

}