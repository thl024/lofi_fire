import React from 'react';
import './PianoRoll.css'

export class PianoRoll extends React.Component {

    constructor(props) {
        super(props);
        this.canvas= React.createRef();
        this.colCount = 16;
        this.rowCount = 36;
        this.onCanvasClick = this.onCanvasClick.bind(this);
    }

    componentDidMount() {
        this.drawCanvas()
    }

    drawCanvas() {
        // Initial canvas drawing
        const canvasCtx = this.canvas.current.getContext('2d')
        this.renderGrid(canvasCtx);
    }

    renderGrid(ctx) {
        const w = this.canvas.current.scrollWidth;
        const h = this.canvas.current.scrollHeight;

        const x_step = w/this.colCount;
        const y_step = h/this.rowCount;

        // Drawing horizontal lines
        ctx.beginPath();
        for (var x=0;x<=w;x+=x_step) {
            ctx.moveTo(x, 0);
            ctx.lineTo(x, h);
        }
        // set the color of the line
        ctx.strokeStyle = 'rgb(255,0,0)';
        ctx.lineWidth = 0.5;
        // the stroke will actually paint the current path
        ctx.stroke();



        // for the sake of the example 2nd path
        ctx.beginPath();
        for (var y=0;y<=h;y+=y_step) {
            ctx.moveTo(0, y);
            ctx.lineTo(w, y);
        }
        // set the color of the line
        ctx.strokeStyle = 'rgb(20,20,20)';
        // just for fun
        ctx.lineWidth = 5;
        // for your original question - you need to stroke only once
        ctx.stroke();
    }

    onCanvasClick() {
        console.log("clicked");
    }

    render() {
        return <canvas className="piano-roll-wrapper"ref={this.canvas} onClick={this.onCanvasClick} />
    }

}