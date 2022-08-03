import '../App.css';
import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ImportExportProjectModal(props) {
	function copyToClipboard() {
		navigator.clipboard.writeText(props.exportProject());
	}

	return <React.Fragment>
		<Modal show={props.show} onHide={props.handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Export/Import Project</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<input className={"form-control form-control-lg"} type="text" value={props.exportProject()}/>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={copyToClipboard}>
					Copy
				</Button>
				<Button variant="secondary" onClick={props.handleClose}>
					Close
				</Button>
			</Modal.Footer>
		</Modal>
	</React.Fragment>;
}

export default ImportExportProjectModal;
