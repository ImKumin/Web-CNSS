import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Row, Col} from 'react-bootstrap';
import Cell from './components/Cell';
import LoadCheerpJAndCompileCode from "./components/LoadCheerpJAndCompileCode";
import Sidebar from "./components/Sidebar";
import StickyBox from "react-sticky-box";
import CellCollection from "./components/CellCollection";
import Notebook from "./components/Notebook";

function App() {
	return (
		<React.Fragment>
			<Notebook/>
		</React.Fragment>
	);
}

export default App;
