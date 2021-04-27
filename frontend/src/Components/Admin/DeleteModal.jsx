/**
 * @module Admin/DeleteModal
 */
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Button } from 'semantic-ui-react';

/**
 * Provides a popup for deleting something.
 * @param {Boolean} modal -Whether Popup is open or not.
 * @param {Function} toggle - Toggles the popup.
 * @param {Function} delete - function to call after user confirms deletion.
 */
function DeleteModal(props) {
	const { modal, toggle } = props;
	return (
		<Modal isOpen={modal} toggle={toggle}>
			<ModalHeader toggle={toggle}>Delete</ModalHeader>
			<ModalBody>Are you sure you want to delete this ?</ModalBody>
			<ModalFooter>
				<Button primary onClick={props.delete}>
					Yes
				</Button>
				<Button secondary onClick={toggle}>
					Cancel
				</Button>
			</ModalFooter>
		</Modal>
	);
}

export default DeleteModal;
