import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Row, Container, Col, Button} from 'react-bootstrap';
import JavaEditor from './components/JavaEditor';
import CheerpJIntegration from "./components/CheerpJIntegration";

function App() {
	return (
		<React.Fragment>
			<div className="container-fluid no-padding">
				<Row className="full-row">
					<Col className='col-sm-3'>
						<CheerpJIntegration/>
					</Col>
					<Col className='col-sm-9'>
						<JavaEditor/>
					</Col>
				</Row>
			</div>
		</React.Fragment>
	);
}

export default App;
