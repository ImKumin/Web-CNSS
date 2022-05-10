import '../App.css';
import React from 'react';

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";
import JavaCell from "./JavaCell";

class Cells extends React.Component {

	DEFAULT_CODE = `import java.util.Arrays;
import cnss.simulator.*;
import cnss.lib.*;

public class JavaFiddle extends AbstractApplicationAlgorithm {
	public JavaFiddle() {
		super(true, "minimal-node");
	}
	
	public int initialise(int now, int node_id, Node self, String[] args) {
		super.initialise(now, node_id, self, args);
	
		super.log( now, "args: " + Arrays.asList(args));
	return 0;
	}
}`;

	constructor(props) {
		super(props);
		this.state = {
			cells: [
				{
					id: 1,
					code: this.DEFAULT_CODE
				},
				{
					id: 2,
					code: this.DEFAULT_CODE
				}
			]
		};
	}

	changeCellCode(i, newCode) {
		let newCells = [...this.state.cells];
		newCells[i].code = newCode;
		this.setState({cells: newCells});
	}

	renderCell(i) {
		return (
			<JavaCell cellInfo={this.state.cells[i]} onChange={(newCode) => this.changeCellCode(i, newCode)}/>
		);
	}

	render() {
		return (
			<React.Fragment>
				{this.state.cells.map((item, index) => {
					return this.renderCell(index);
				})}
			</React.Fragment>
		);
	}
}

export default Cells;
