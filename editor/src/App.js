import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Row, Container, Col, Button} from 'react-bootstrap';
import JavaEditor from './components/JavaEditor';

function App() {
	return (
		<React.Fragment>
			<div className="container-fluid no-padding">
				<Row className="full-row">
					<Col className='col-sm-3'>
						<Button> Compile </Button>
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
