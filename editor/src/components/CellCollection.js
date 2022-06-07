import '../App.css';
import React from 'react';

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";
import Cell from "./Cell";

function CellCollection(props) {

	function renderCell(i) {
		return <Cell cellInfo={props.cells[i]} onChange={newCode => props.changeCellCode(i, newCode)}/>;
	}

	function renderConsole() {
		return <Cell cellInfo={props.consoleCell} onChange={()=>{}}/>;
	}

	return <React.Fragment>
		{props.cells.map((item, index) => {
			return renderCell(index);
		})}
		{renderConsole()}
	</React.Fragment>;
}

export default CellCollection;
