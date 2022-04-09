import '../App.css';
import React from 'react';
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";

function JavaEditor() {
	return (
		<React.Fragment>
			<AceEditor
				height={window.innerHeight - 1}
				width={document.body.scrollWidth * 0.75}
				placeholder="CNSS Source Code"
				mode="java"
				theme="monokai"
				name="blah2"
				onLoad={onLoad}
				onChange={onChange}
				fontSize={14}
				showPrintMargin={true}
				showGutter={true}
				highlightActiveLine={true}
				value={""}
				setOptions={{
					enableBasicAutocompletion: true,
					enableLiveAutocompletion: true,
					enableSnippets: true,
					showLineNumbers: true,
					tabSize: 2,
				}}/>
		</React.Fragment>
	);
}

function onLoad() {

}

function onChange(newValue) {

}

export default JavaEditor;
