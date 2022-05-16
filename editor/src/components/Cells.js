import '../App.css';
import React from 'react';

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";
import JavaCell from "./JavaCell";

function Cells(props) {

	function renderCell(i) {
		return (
			<JavaCell cellInfo={props.cells[i]} onChange={(newCode) => props.changeCellCode(i, newCode)}/>
		);
	}

	return (
		<React.Fragment>
			{props.cells.map((item, index) => {
				return renderCell(index);
			})}
		</React.Fragment>
	);
}

export default Cells;
