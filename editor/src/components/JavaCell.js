import '../App.css';
import React, {useEffect, useState} from 'react';
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";
import {Button} from "react-bootstrap";
import ImportScript from "../hooks/ImportScript";

function JavaCell() {
	const [currentCode, setCurrentCode] = useState(`import java.util.Arrays;
import cnss.simulator.*;
import cnss.lib.*;

public class JavaFiddle extends AbstractApplicationAlgorithm {
  
  public JavaFiddle() {
      super(true, "minimal-node");
  }

  public int initialise(int now, int node_id, Node self, String[] args) {
    super.initialise(now, node_id, self, args);

    super.log( now, "args: " + Arrays.asList(args));
\t\treturn 0;
\t}
} 

`);

	function onLoad() {

	}

	function onChange(newValue) {
		setCurrentCode(newValue);
	}

	return (
		<React.Fragment>
			<div className="cell-border">
				<AceEditor
					id={"aceEditor"}
					height={500}
					width={700}
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
					value={currentCode}
					setOptions={{
						enableBasicAutocompletion: true,
						enableLiveAutocompletion: true,
						enableSnippets: true,
						showLineNumbers: true,
						tabSize: 2,
					}}/>
			</div>
			<br/>
		</React.Fragment>
	);
}

export default JavaCell;
