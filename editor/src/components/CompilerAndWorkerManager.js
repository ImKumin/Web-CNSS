import '../App.css';
import React from 'react';
import {Button} from "react-bootstrap";

function CompilerAndWorkerManager(props) {

	let time = [];
	function compileJavaCode() {
		time.push({
			action: "Start",
			time: new Date().getTime()
		});
		createWorker();
	}

	function createWorker() {
		props.changeConsoleCellCode("Preparing Worker...\n");
		let myWorker = new Worker('./workers/CompileCodeWorker.js');
		myWorker.onmessage = (e) => receiveWorkerMessage(e.data);

		let data = {
			cells: props.cells,
			otherFiles: props.otherFiles
		};
		myWorker.postMessage(data);
		time.push({
			action: "Create Worker And Send Data To Worker",
			time: new Date().getTime() - time[0].time
		});
	}

	function receiveWorkerMessage(data) {
		time.push({
			action: data.message,
			time: new Date().getTime() - time[0].time
		});
		switch (data.type) {
			case "override":
				props.changeConsoleCellCode(data.message);
				break;
			case "add":
				props.addConsoleCellCode(data.message);
				console.log(time);
				break;
			default:
				props.changeConsoleCellCode(data.message);
				break;
		}
	}

	return (
		<React.Fragment>
			<Button className="bg-danger" onClick={() => compileJavaCode()}
					id="compileButton"> Compile </Button>
			<div id="console" className="d-none"></div>
		</React.Fragment>
	);
}

export default CompilerAndWorkerManager;
