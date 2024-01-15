const svgNS = "http://www.w3.org/2000/svg";

let clipID = 0;

const smoothing = 2;

const avg = (values: number[]) => values.reduce((sum, value) => sum + value, 0) / values.length;
const max = (values: Float32Array) => values.reduce((max, value) => Math.max(max, value), 0);


export	class Clip{

	private	_data		: Float32Array;
	private	_wave		: Float32Array;

	private	_res			= { width: 2000, height: 100 };

	private	_svg			: SVGElement;
	private	_mask		: SVGElement;
	private	_path		: SVGElement;
	private	_rect		: SVGElement;

	get svg(): SVGElement{
		return this._svg;
	}

	constructor( data: Float32Array ){

		this._data = data;
		this._wave = this.calculateWaveform();

		let	cID = clipID++;

		this._svg = document.createElementNS(svgNS, "svg");
		this._svg.setAttribute('preserveAspectRatio','none');
		this._svg.setAttribute('width','3200');
		this._svg.setAttribute('height','100');
		this._svg.setAttribute('style','width:100%;height:100px;');
		this._svg.setAttribute('viewBox', `0 0 ${this._res.width} ${this._res.height}`);
	
		let gradient = document.createElementNS(svgNS,'linearGradient');
			gradient.setAttribute('id',`gradient${cID}`);
			gradient.setAttribute('x1','0');
			gradient.setAttribute('x2','0');
			gradient.setAttribute('y1','0');
			gradient.setAttribute('y2','1');
	
		let stop1 = document.createElementNS(svgNS, 'stop');
			stop1.setAttribute('offset','10%');
			stop1.setAttribute('stop-color','#ff0000');
			stop1.setAttribute('stop-opacity','1');
	
		let stop2 = document.createElementNS(svgNS, 'stop');
			stop2.setAttribute('offset','20%');
			stop2.setAttribute('stop-color','#ffbb00');
			stop2.setAttribute('stop-opacity','1');
	
		let stop3 = document.createElementNS(svgNS, 'stop');
			stop3.setAttribute('offset','50%');
			stop3.setAttribute('stop-color','#00cc00');
			stop3.setAttribute('stop-opacity','1');
	
		let stop4 = document.createElementNS(svgNS, 'stop');
			stop4.setAttribute('offset','80%');
			stop4.setAttribute('stop-color','#ffbb00');
			stop4.setAttribute('stop-opacity','1');
	
		let stop5 = document.createElementNS(svgNS, 'stop');
			stop5.setAttribute('offset','90%');
			stop5.setAttribute('stop-color','#ff0000');
			stop5.setAttribute('stop-opacity','1');
	
		this._mask = document.createElementNS(svgNS,'mask');
		this._mask.setAttribute('id',`mask${cID}`);
	
		this._path = document.createElementNS(svgNS,'path');
		this._path.setAttribute('fill',`url(#gradient${cID})`);
		this._path.setAttribute('d', this.calculatePath());
	
		this._rect = document.createElementNS(svgNS,'rect');
		this._rect.setAttribute('mask', `url(#mask${cID})`);
		this._rect.setAttribute('x','0');
		this._rect.setAttribute('y','0');
		this._rect.setAttribute('width',`${this._res.width}`);
		this._rect.setAttribute('height',`${this._res.height}`);
		this._rect.setAttribute('fill',`url(#gradient${cID})`);
	
		gradient.appendChild(stop1);
		gradient.appendChild(stop2);
		gradient.appendChild(stop3);
		gradient.appendChild(stop4);
		gradient.appendChild(stop5);
		this._svg.appendChild(gradient);
		this._mask.appendChild(this._path);
		this._svg.appendChild(this._mask);
		this._svg.appendChild(this._rect);
	}

	calculateWaveform(): Float32Array {
		const dataPoints = this._res.width / smoothing;
		const values = new Float32Array( dataPoints );
		const dataWindow = Math.round( this._data.length / dataPoints );
		for( let i = 0, y = 0, buffer: number[] = []; i < this._data.length; i++ ){
			const summedValue = Math.abs( this._data[i] ) / 2;
			buffer.push( summedValue );
			if( buffer.length === dataWindow ){
				values[ y++ ] = avg( buffer );
				buffer = [];
			}
		}
		return values;
	}

	calculatePath(): string {
		const maxValue = max( this._wave );
		let path = `M 0 ${this._res.height / 2} `;
		for( let i = 0; i < this._wave.length; i++ ){
			path += `L ${i * smoothing} ${(1 - this._wave[i] / maxValue) * ( this._res.height / 2 )} `;
		}
		for( let i = this._wave.length - 1; i > -1; i-- ){
			path += `L ${i * smoothing} ${50 + ( 50 - ( 1 - this._wave[i] / maxValue) * ( this._res.height / 2 ))} `;
	}
		path += `V ${ this._res.height / 2 } H 0 Z`;
		return path;
	}

}