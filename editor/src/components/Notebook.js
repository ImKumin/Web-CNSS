import '../App.css';
import React from 'react';

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";
import StickyBox from "react-sticky-box";
import Sidebar from "./Sidebar";
import {Col, Row} from "react-bootstrap";
import CellCollection from "./CellCollection";
import CellType from "./CellTypeEnum";
import CellCode from "./CellCodeEnum";
import Graphics from "./Graphics";
import ImportExportProjectModal from "./ImportExportProjectModal";

const localStorageName = "CheerpJNotebook";
const indexedDbName = "CheerpJNotebookIndexexDb";
const indexedDbStoreName = "CheerpJNotebookIndexexDbStore";

class Notebook extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			cells: this.generateDefaultProjectCells(),
			otherFiles: [],
			consoleCell: this.generateCell(CellType.console, "", "xml", true, true),
			projects: {"Project 1": this.cells},
			selectedProject: "Project 1",
			showModal: false
		};
	}

	componentDidMount() {
		this.loadNotebook();
	}

	addNewCell(type, code) {
		let newCell;
		switch (type) {
			case "empty":
				newCell = this.generateCell(CellType.java, "");
				break;
			case "minimal-node":
				newCell = this.generateCell(CellType.java, CellCode.DEFAULT_NODE);
				break;
			case "markdown":
				newCell = this.generateCell(CellType.markdown, CellCode.DEFAULT_MARKDOWN);
				if (code)
					newCell = this.generateCell(CellType.markdown, code);
				break;
			case "periodic-node":
				newCell = this.generateCell(CellType.java, CellCode.PERIODIC_NODE);
				break;
			case "java-node":
				newCell = this.generateCell(CellType.java, code ? code : "");
				break;
			case "markdown-node":
				newCell = this.generateCell(CellType.markdown, code ? code : "");
				break;
			default:
				newCell = this.generateCell(CellType.java, code ? code : "");
				break;
		}
		let newCells = [...this.state.cells];
		let duplicate = false;
		for (let i in newCells) {
			if (newCells[i].code === newCell.code && newCells[i].type === newCell.type && newCell.type !== CellType.markdown) {
				newCells[i] = newCell;
				duplicate = true;
			}
		}
		if (!duplicate)
			newCells.push(newCell);
		this.setState({cells: newCells});
		this.saveProject();
	}

	generateCell(type, code, mode, gutter, readOnly) {
		return {
			type: type,
			code: code,
			className: this.calculateClassName(code),
			packageName: this.calculateClassPackageName(code),
			style: {
				height: this.calculateCellHeight(code),
				gutter: gutter !== undefined ? gutter : true,
				readOnly: readOnly !== undefined ? readOnly : false,
				mode: mode !== undefined ? mode : "java"
			},
			markdown: {
				focused: false
			}
		};
	}

	generateDefaultProjectCells() {
		return [
			this.generateCell(CellType.txt, CellCode.DEFAULT_CONFIG, "xml"),
			this.generateCell(CellType.markdown, CellCode.DEFAULT_MARKDOWN),
			this.generateCell(CellType.java, CellCode.DEFAULT_NODE)
		]
	}

	changeConsoleCellCode(newCode) {
		let newCell = this.state.consoleCell;
		newCell.code = newCode;
		newCell.style.height = this.calculateCellHeight(newCell.code);
		this.setState({consoleCell: newCell});
	}

	addConsoleCellCode(newCode) {
		let newCell = this.state.consoleCell;
		newCell.code += newCode;
		newCell.style.height = this.calculateCellHeight(newCell.code);
		this.setState({consoleCell: newCell});
	}

	changeCellCode(i, newCode) {
		let newCells = [...this.state.cells];
		newCells[i].code = newCode;
		if (newCells[i].type === CellType.java) {
			newCells[i].className = this.calculateClassName(newCode);
			newCells[i].packageName = this.calculateClassPackageName(newCode);
		}
		newCells[i].style.height = this.calculateCellHeight(newCode);
		this.setState({cells: newCells});
		this.saveProject();
	}

	moveCell(i, value) {
		if (i + value === 0)
			return;
		let newCells = [...this.state.cells];
		let element = newCells[i];
		newCells.splice(i, 1);
		newCells.splice(i + value, 0, element);
		this.setState({cells: newCells});
		this.saveProject();
	}

	deleteCell(i) {
		let newCells = [...this.state.cells];
		newCells.splice(i, 1);
		this.setState({cells: newCells});
		this.saveProject();
	}

	addFile(name, type, content, size) {
		let file = {
			name: name,
			type: type,
			content: content,
			size: size
		};
		let newFiles = [...this.state.otherFiles];
		let duplicate = false;
		for (let i in newFiles) {
			if (newFiles[i].name === file.name && newFiles[i].type === file.type) {
				newFiles[i] = file;
				duplicate = true;
			}
		}
		if (!duplicate)
			newFiles.push(file);
		this.setState({otherFiles: newFiles});
		this.saveProject();
	}

	onFocusMarkdown(i, value) {
		let newCells = [...this.state.cells];
		newCells[i].markdown.focused = value;
		this.setState({cells: newCells})
	}

	calculateClassName(code) {
		let match = code.match(new RegExp("class" + '\\s(\\w+)'));
		if (match && match.length > 1)
			return match[1];
		else
			return "";
	}

	calculateClassPackageName(code) {
		let match = code.match(new RegExp("package " + '([\\s\\S]*?)' + ";"));
		if (match && match.length > 1)
			return match[1];
		else
			return "";
	}

	calculateCellHeight(code) {
		let newLineCount = code.split(/\r\n|\r|\n/).length;
		return 30 + newLineCount * 17;
	}

	deleteAll() {
		this.deleteProject(this.state.selectedProject);
		this.deleteOtherFiles();
		this.setState({cells: this.generateDefaultProjectCells()});
		this.saveProject();
	}

	deleteProject(name) {
		let projects = this.state.projects;
		if (Object.keys(projects).length <= 1)
			return;
		projects[name] = [];
		this.setState({projects: projects});
	}

	deleteOtherFiles() {
		this.setState({otherFiles: []});
	}

	selectProject(name) {
		//TODO: This is not being used
		this.setState({cells: this.state.projects[name]});
		this.setState({selectedProject: name});
	}

	saveProject() {
		let cells = [...this.state.cells];
		let projects = this.state.projects;
		projects[this.state.selectedProject] = cells;
		this.setState({projects: projects});
		this.saveNotebook();
	}

	initColabMode() {
		//TODO: Colab
		console.log("Initing collaborative mode.");
		window.Convergence.connectAnonymously("http://localhost:8000/api/realtime/convergence/default", "kumin")
			.then(d => {
				let domain = d;
				// Now open the model, creating it using the initial data if it does not exist.
				return domain.models().openAutoCreate({
					collection: "example-ace",
					id: "kuminExampleId",
					ephemeral: true,
					data: {text: "Hello Kumin"}
				})
			})
			.then(handleOpen)
			.catch(error => {
				console.error("Could not open model ", error);
			});

		function handleOpen(model) {
			console.log("Handling");
		}
	}

	loadNotebook() {
		let cached = this.loadFromCache(localStorageName);
		if (cached)
			this.setState(cached);
		this.openIndexedDb(this.loadOtherFiles, this);
	}

	saveNotebook() {
		let objToSaveLocalStorage = {
			cells: this.state.cells,
			projects: this.state.projects,
			selectedProject: this.state.selectedProject
		};
		this.saveToCache(localStorageName, objToSaveLocalStorage);
		if (this.state.otherFiles.length > 0)
			this.openIndexedDb(this.saveOtherFiles, this);
	}

	loadFromCache(variable) {
		const cache = localStorage.getItem(variable);
		return JSON.parse(cache);
	}

	saveToCache(variable, value) {
		localStorage.setItem(variable, JSON.stringify(value));
	}

	saveOtherFiles(open, context) {
		let db = open.result;
		let tx = db.transaction(indexedDbStoreName, "readwrite");
		for (let i in context.state.otherFiles)
			tx.objectStore(indexedDbStoreName).put({id: i, file: context.state.otherFiles[i]});
		tx.oncomplete = function () {
			db.close();
		};
	}

	loadOtherFiles(open, context) {
		let db = open.result;
		let tx = db.transaction(indexedDbStoreName, "readwrite");
		let store = tx.objectStore(indexedDbStoreName);
		let otherFiles = store.getAll();
		otherFiles.onsuccess = function () {
			let files = otherFiles.result;
			let finalObj = [];
			for (let i in files)
				finalObj.push(files[i].file);
			context.setState({otherFiles: finalObj});
		}
		tx.oncomplete = function () {
			db.close();
		};
	}

	openIndexedDb(onSuccess, context) {
		if (!window.indexedDB)
			return;
		let open = window.indexedDB.open(indexedDbName, 1);

		open.onupgradeneeded = function () {
			let db = open.result;
			db.createObjectStore(indexedDbStoreName, {keyPath: "id"});
		};

		open.onsuccess = () => {
			onSuccess(open, context);
		};
	}

	handleClose() {
		this.setState({showModal: false});
	}

	handleShow(type) {
		switch (type) {
			case "import":
				break;
			case "export":
				break;
		}
		this.setState({showModal: true});
	}

	exportProject() {
		let obj = {
			cells: this.state.cells,
			otherFiles: this.state.otherFiles
		};
		return encodeURI(JSON.stringify(obj));
	}

	importProject(encoded) {
		let decoded = JSON.parse(decodeURI(encoded));
		this.setState({
			cells: decoded.cells,
			otherFiles: decoded.otherFiles
		})
	}

	render() {
		return (
			<React.Fragment>
				<div style={{display: "flex", alignItems: "flex-start"}}>
					<StickyBox className="side-bar-sticky">
						<Sidebar cells={this.state.cells}
								 otherFiles={this.state.otherFiles}
								 cheerpJInfo={this.state.cheerpJInfo}
								 addNewCell={(type, code) => this.addNewCell(type, code)}
								 changeConsoleCellCode={(newCode) => this.changeConsoleCellCode(newCode)}
								 addConsoleCellCode={(newCode) => this.addConsoleCellCode(newCode)}
								 addFile={(name, type, content, size) => this.addFile(name, type, content, size)}
								 deleteAll={() => this.deleteAll()}
								 openModal={(type) => this.handleShow(type)}
						/>
					</StickyBox>
					<div>
						<br/>
						<div className="container-fluid no-padding">
							<Row className="full-row">
								<Col className='col-sm-1'>

								</Col>
								<Col className='col-sm-10'>
									<CellCollection cells={this.state.cells}
													changeCellCode={(i, newCode) => this.changeCellCode(i, newCode)}
													consoleCell={this.state.consoleCell}
													onFocusMarkdown={(i, value) => this.onFocusMarkdown(i, value)}
													moveCell={(i, value) => this.moveCell(i, value)}
													deleteCell={(i) => this.deleteCell(i)}
									/>
									<Graphics/>
								</Col>
							</Row>
						</div>
						{/*
						 <div>
								<Button onClick={() => this.initColabMode()}> Init Colab </Button>
						</div>
						*/}
					</div>
					<ImportExportProjectModal show={this.state.showModal}
											  handleClose={() => this.handleClose()}
											  importProject={(encoded) => this.importProject(encoded)}
											  exportProject={() => this.exportProject()}
					/>
				</div>
			</React.Fragment>
		);
	}
}

export default Notebook;
