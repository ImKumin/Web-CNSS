import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Row, Col} from 'react-bootstrap';
import JavaCell from './components/JavaCell';
import LoadCheerpJAndCompileCode from "./components/LoadCheerpJAndCompileCode";
import Sidebar from "./components/Sidebar";
import StickyBox from "react-sticky-box";
import Cells from "./components/Cells";

function App() {
	return (
		<React.Fragment>
			<div style={{display: "flex", alignItems: "flex-start"}}>
				<StickyBox className="side-bar-sticky">
					<Sidebar/>
				</StickyBox>
				<div>
					<br/>
					<div className="container-fluid no-padding">
						<Row className="full-row">
							<Col className='col-sm-3'>

							</Col>
							<Col className='col-sm-9'>
								<Cells/>
							</Col>
						</Row>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
}

export default App;
