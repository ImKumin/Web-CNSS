import '../App.css';
import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ImportExportProjectModal(props) {
	const [input, setInput] = useState("");

	function importProject() {
		props.importProject(input);
	}

	function copyToClipboard() {
		navigator.clipboard.writeText(props.exportProject());
	}

	function renderModal() {
		if (props.import)
			return renderImportModal();
		return renderExportModal();
	}

	function renderExportModal() {
		return <React.Fragment>
			<Modal.Header closeButton>
				<Modal.Title>Export Project</Modal.Title>
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
		</React.Fragment>
	}

	function renderImportModal() {
		return <React.Fragment>
			<Modal.Header closeButton>
				<Modal.Title>Import Project</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<input className={"form-control form-control-lg"} type="text" onInput={e => setInput(e.target.value)}/>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={importProject}>
					Import
				</Button>
				<Button variant="secondary" onClick={props.handleClose}>
					Close
				</Button>
			</Modal.Footer>
		</React.Fragment>
	}

	return <React.Fragment>
		<Modal show={props.show} onHide={props.handleClose}>
			{renderModal()}
		</Modal>
	</React.Fragment>;
}

export default ImportExportProjectModal;
