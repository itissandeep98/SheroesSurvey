import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { TextField } from '@material-ui/core';

function ConsentPage() {
	return (
		<Accordion className="w-100 rounded-lg">
			<AccordionSummary
				expandIcon={<ExpandMoreIcon />}
				aria-label="Expand"
				aria-controls="additional-actions1-content"
				id="additional-actions1-header">
				<FormControlLabel
					aria-label="Acknowledge"
					onClick={event => event.stopPropagation()}
					onFocus={event => event.stopPropagation()}
					control={<Checkbox />}
					label="Include Consent Form"
				/>
			</AccordionSummary>
			<AccordionDetails>
				<TextField
					fullWidth
					multiline
					label="Consent Form"
					variant="outlined"
				/>
			</AccordionDetails>
		</Accordion>
	);
}

export default ConsentPage;
