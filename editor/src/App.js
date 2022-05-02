import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Row, Container, Col, Button} from 'react-bootstrap';
import JavaCell from './components/JavaCell';
import LoadCheerpJAndCompileCode from "./components/LoadCheerpJAndCompileCode";

function App() {
	return (
		<div className="container-fluid no-padding">
			<Row className="full-row">
				<Col className='col-sm-3'>

				</Col>
				<Col className='col-sm-9'>
					<JavaCell/>
					<JavaCell/>
					<JavaCell/>
					<LoadCheerpJAndCompileCode/>
				</Col>
			</Row>
		</div>
	);
}

export default App;
