import '../App.css';
import React from 'react';
import {Button} from "react-bootstrap";

class Graphics extends React.Component {
	constructor(props) {
		super(props);
		this.canvasWidth = 1070;
		this.canvasHeight = 500;
		this.canvasRef = React.createRef();
		this.nodes = {};
	}

	drawCanvas() {
		const canvas = this.canvasRef.current;
		const context = canvas.getContext('2d');
		context.fillStyle = '#1f1f1b';
		context.fillRect(0, 0, context.canvas.width, context.canvas.height);

		this.drawNodes(4);
		this.drawMessage(0, 1, 0, 1);
		this.drawMessage(2, 3, 1, 4);
		this.drawMessage(1, 3, 2, 3);
		this.drawMessage(3, 1, 3, 4);
		this.drawMessage(1, 3, 4, 6);
		this.drawMessage(0, 2, 1, 6);
		this.drawMessage(1, 0, 1, 2);
	}

	drawNodes(n) {
		let space = this.canvasWidth / n;
		for (let i = 0; i < n; i++) {
			let pos = space / 2 + space * i;
			this.nodes[i] = {name: "Minimal-Node", pos: pos};
			this.drawNode(this.nodes[i]);
		}
	}

	drawNode(node) {
		const canvas = this.canvasRef.current;
		const context = canvas.getContext('2d');
		context.strokeStyle = 'white';
		context.lineWidth = 1;
		context.font = '14px arial';
		context.strokeText(node.name, node.pos - context.measureText(node.name).width / 2, 40);

		context.strokeStyle = 'white';
		context.lineWidth = 1;
		context.beginPath();
		context.moveTo(node.pos, 50);
		context.lineTo(node.pos, this.canvasHeight - 50);
		context.stroke();
	}

	drawMessage(node, destNode, clock, destClock) {
		let fromX = this.nodes[node].pos;
		let toX = this.nodes[destNode].pos;
		let fromY = 75 + clock * 50;
		let toY = 75 + destClock * 50;
		const canvas = this.canvasRef.current;
		const context = canvas.getContext('2d');
		let headLength = 10;
		let dx = toX - fromX;
		let dy = toY - fromY;
		let angle = Math.atan2(dy, dx);
		context.moveTo(fromX, fromY);
		context.lineTo(toX, toY);
		context.lineTo(toX - headLength * Math.cos(angle - Math.PI / 6), toY - headLength * Math.sin(angle - Math.PI / 6));
		context.moveTo(toX, toY);
		context.lineTo(toX - headLength * Math.cos(angle + Math.PI / 6), toY - headLength * Math.sin(angle + Math.PI / 6));
		context.stroke();
	}

	degToRad(degrees) {
		return degrees * Math.PI / 180;
	}

	render() {
		return <React.Fragment>
			<canvas ref={this.canvasRef} width={this.canvasWidth} height={this.canvasHeight}/>
			<Button onClick={() => {
				this.drawCanvas()
			}}>Draw</Button>
		</React.Fragment>;
	}
}

export default Graphics;
