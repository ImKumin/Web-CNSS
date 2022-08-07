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

	drawCanvas(nodes) {
		const canvas = this.canvasRef.current;
		const context = canvas.getContext('2d');
		context.fillStyle = '#1f1f1b';
		context.fillRect(0, 0, context.canvas.width, context.canvas.height);

		this.drawNodes(nodes);
	}

	drawNodes(nodesObj) {
		let space = this.canvasWidth / nodesObj.length;
		for (let i = 0; i < nodesObj.length; i++) {
			let pos = space / 2 + space * i;
			this.nodes[i] = {name: nodesObj[i].nodeName, pos: pos};
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

	drawMessages(messagesObj) {
		for (let i in messagesObj) {
			let m = messagesObj[i];
			this.drawMessage(m.fromNode, m.toNode, m.time, m.time + 20, m.dropped);
		}
	}

	drawMessage(node, destNode, clock, destClock, dropped) {
		let fromX = this.nodes[node].pos;
		let toX = this.nodes[destNode].pos;
		let fromY = 75 + clock;
		let toY = 75 + destClock;
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
