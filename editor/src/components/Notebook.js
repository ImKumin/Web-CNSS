import '../App.css';
import React from 'react';

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";
import StickyBox from "react-sticky-box";
import Sidebar from "./Sidebar";
import {Col, Row} from "react-bootstrap";
import Cells from "./Cells";

class Notebook extends React.Component {

	DEFAULT_NODE = `import java.util.Arrays;
import cnss.simulator.*;
import cnss.lib.*;

public class MinimalNode extends AbstractApplicationAlgorithm {
	public MinimalNode() {
		super(true, "minimal-node");
	}
	
	public int initialise(int now, int node_id, Node self, String[] args) {
		super.initialise(now, node_id, self, args);
	
		super.log( now, "args: " + Arrays.asList(args));
	return 0;
	}
}`;
	DEFAULT_CONFIG = `node 0 0 cnss.lib.EndSystemControl rc.MinimalNode arg1 arg2 
node 1 0 cnss.lib.EndSystemControl rc.MinimalNode arg3 arg4`;

	constructor(props) {
		super(props);
		this.state = {
			cells: [
				this.generateCell("txt", this.DEFAULT_CONFIG, "Config"),
				this.generateCell("java", this.DEFAULT_NODE, "MinimalNode")
			]
		};
	}

	changeCellCode(i, newCode) {
		let newCells = [...this.state.cells];
		newCells[i].code = newCode;
		if (newCells[i].type == "java")
			newCells[i].className = this.calculateClassName(newCode);
		newCells[i].style.height = this.calculateCellHeight(newCode);
		this.setState({cells: newCells});
	}

	addNewCell(type) {
		let newCell = {};
		switch (type) {
			case "empty":
				newCell = this.generateCell("java", "");
				break;
			case "minimal-node":
				newCell = this.generateCell("java", this.DEFAULT_NODE);
				break;
		}
		let newCells = [...this.state.cells];
		newCells.push(newCell);
		this.setState({cells: newCells});
	}

	generateCell(type, code) {
		return {
			type: type,
			code: code,
			className: this.calculateClassName(code),
			style: {
				height: this.calculateCellHeight(code)
			}
		};
	}

	calculateClassName(code) {
		let match = code.match(new RegExp("class" + '\\s(\\w+)'));
		if (match && match.length > 1)
			return match[1];
		else
			return "";
	}

	calculateCellHeight(code) {
		let newLineCount = code.split(/\r\n|\r|\n/).length;
		return 30 + newLineCount * 17;
	}

	render() {
		return (
			<React.Fragment>
				<div style={{display: "flex", alignItems: "flex-start"}}>
					<StickyBox className="side-bar-sticky">
						<Sidebar cells={this.state.cells} addNewCell={(type) => this.addNewCell(type)}/>
					</StickyBox>
					<div>
						<br/>
						<div className="container-fluid no-padding">
							<Row className="full-row">
								<Col className='col-sm-3'>

								</Col>
								<Col className='col-sm-9'>
									<Cells cells={this.state.cells}
										   changeCellCode={(i, newCode) => this.changeCellCode(i, newCode)}/>
								</Col>
							</Row>
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default Notebook;
