import '../App.css';
import React from 'react';
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";

function Cell(props) {

	function onLoad() {

	}

	function onChange(newValue) {
		props.onChange(newValue);
	}

	return <React.Fragment>
		<div className="cell-border">
			<AceEditor
				id={"aceEditor"}
				height={props.cellInfo.style.height}
				width={850}
				placeholder=""
				mode={props.cellInfo.style.mode}
				theme="monokai"
				name={props.cellInfo.type}
				onLoad={onLoad}
				onChange={onChange}
				fontSize={14}
				showPrintMargin={false}
				showGutter={props.cellInfo.style.gutter}
				highlightActiveLine={false}
				readOnly={props.cellInfo.style.readOnly}
				value={props.cellInfo.code}
				cursorStart={0}
				setOptions={{
					enableBasicAutocompletion: true,
					enableLiveAutocompletion: true,
					enableSnippets: true,
					showLineNumbers: true,
					tabSize: 4,
				}}/>
		</div>
		<br/>
	</React.Fragment>;
}

export default Cell;
