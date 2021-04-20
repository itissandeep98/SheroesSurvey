import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { TextField } from '@material-ui/core';
import { useState } from 'react';

function ConsentPage(props) {
	const { consent_toggle, consent_text, update } = props;
	const [toggle, setToggle] = useState(consent_toggle);
	const [text, setText] = useState(consent_text);
	const toggleConsent = e => {
		update({ consent_toggle: e.target.checked });
		setToggle(!toggle);
	};
	const updateConsent = e => {
		setText(e.target.value);
		update({ consent_text: e.target.value });
	};
	return (
		<Accordion className="w-100 rounded-lg">
			<AccordionSummary expandIcon={<ExpandMoreIcon />}>
				<FormControlLabel
					onClick={toggleConsent}
					checked={toggle}
					onFocus={event => event.stopPropagation()}
					control={<Checkbox />}
					label="Include Consent Form"
				/>
			</AccordionSummary>
			<AccordionDetails>
				<TextField
					value={text}
					fullWidth
					multiline
					label="Consent Form"
					variant="outlined"
					onChange={updateConsent}
				/>
			</AccordionDetails>
		</Accordion>
	);
}

export default ConsentPage;
