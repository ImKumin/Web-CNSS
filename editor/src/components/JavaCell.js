import '../App.css';
import React from 'react';
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";

function JavaCell(props) {

	function onLoad() {

	}

	function onChange(newValue) {
		props.onChange(newValue);
	}

	return (
		<React.Fragment>
			<div className="cell-border">
				<AceEditor
					id={"aceEditor"}
					height={props.cellInfo.style.height}
					width={850}
					placeholder="Code here"
					mode="java"
					theme="monokai"
					name={"java-cell"}
					onLoad={onLoad}
					onChange={onChange}
					fontSize={14}
					showPrintMargin={false}
					showGutter={true}
					highlightActiveLine={false}
					value={props.cellInfo.code}
					setOptions={{
						enableBasicAutocompletion: true,
						enableLiveAutocompletion: true,
						enableSnippets: true,
						showLineNumbers: true,
						tabSize: 4,
					}}/>
			</div>
			<br/>
		</React.Fragment>
	);
}

export default JavaCell;
