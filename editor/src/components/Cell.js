import '../App.css';
import React, {useMemo} from 'react';
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";
import SimpleMdeReact from "react-simplemde-editor";
import "../Easymde.min.css";
import CellType from "./CellType";

function Cell(props) {
	const autofocusNoSpellcheckerOptions = useMemo(() => {
		return {
			autofocus: false,
			spellChecker: false,
			status: false,
			tabSize: 8
		}
	}, []);

	function onFocus() {

	}

	function onLoad() {

	}

	function onChange(newValue) {
		props.onChange(newValue);
	}

	function renderMarkdownCell() {
		return <div className="cell-border">
			<SimpleMdeReact value={props.cellInfo.code} onChange={onChange}
							   options={autofocusNoSpellcheckerOptions}/>
		</div>;
	}

	function render() {
		if (props.cellInfo.type === CellType.markdown)
			return renderMarkdownCell();
		return <div className="cell-border">
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
				onFocus={onFocus}
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
	}

	return <React.Fragment>
		{render()}
		<br/>
	</React.Fragment>;
}

export default Cell;
