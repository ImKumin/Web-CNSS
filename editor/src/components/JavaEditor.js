import '../App.css';
import React, {useState} from 'react';
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";
import CheerpJIntegration from "./CheerpJIntegration";

function JavaEditor() {
	const [code, setCode] = useState("");

	function onLoad() {

	}

	function onChange(newValue) {
		setCode(newValue);
	}

	return (
		<React.Fragment>
			<AceEditor
				id={"aceEditor"}
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
			<CheerpJIntegration code={code}/>
		</React.Fragment>
	);
}

export default JavaEditor;
