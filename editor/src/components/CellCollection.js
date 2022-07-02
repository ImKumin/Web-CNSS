import '../App.css';
import React from 'react';

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";
import Cell from "./Cell";

function CellCollection(props) {
	function renderCell(i) {
		return <Cell cellInfo={props.cells[i]}
					 onChange={newCode => props.changeCellCode(i, newCode)}
					 onFocusMarkdown={() => props.onFocusMarkdown(i, true)}
					 onBlurMarkdown={() => props.onFocusMarkdown(i, false)}
					 moveCellUp={() => props.moveCell(i, -1)}
					 moveCellDown={() => props.moveCell(i, +1)}
					 deleteCell={() => props.deleteCell(i)}
		/>;
	}

	function renderConsole() {
		return <Cell cellInfo={props.consoleCell}
					 onChange={null}
		/>;
	}

	return <React.Fragment>
		{props.cells.map((item, index) => {
			return renderCell(index);
		})}
		{renderConsole()}
	</React.Fragment>;
}

export default CellCollection;
