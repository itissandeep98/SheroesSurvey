import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { useState } from 'react';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router';

function ConsentPage() {
	const [open, setOpen] = useState(true);
	const history = useHistory();
	return (
		<Modal isOpen={open}>
			<ModalHeader>Consent Page</ModalHeader>
			<ModalBody className="text-justify">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
				tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
				veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
				commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
				velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
				occaecat cupidatat non proident, sunt in culpa qui officia deserunt
				mollit anim id est laborum.
			</ModalBody>
			<ModalFooter>
				<Button
					variant="outlined"
					className="mr-2"
					onClick={() => setOpen(false)}>
					I Agree
				</Button>
				<Button
					variant="outlined"
					color="secondary"
					onClick={() => history.push('/')}>
					Disagree
				</Button>
			</ModalFooter>
		</Modal>
	);
}

export default ConsentPage;
