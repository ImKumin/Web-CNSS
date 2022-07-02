import '../App.css';
import React from 'react';
import {Button} from "react-bootstrap";

function CompilerAndWorkerManager(props) {

	function compileJavaCode() {
		createWorker();
	}

	function createWorker() {
		props.changeConsoleCellCode("Preparing Worker...\n");
		let myWorker = new Worker('./workers/CompileCodeWorker.js');
		myWorker.onmessage = (e) => receiveWorkerMessage(e.data);
		myWorker.postMessage(props.cells);
	}

	function receiveWorkerMessage(data) {
		switch (data.type) {
			case "override":
				props.changeConsoleCellCode(data.message);
				break;
			case "add":
				props.addConsoleCellCode(data.message);
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
