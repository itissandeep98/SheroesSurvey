import { FormGroup, Input, Label } from 'reactstrap';
import { Form } from 'semantic-ui-react';

function MultipleChoiceInput(props) {
	const { ques, options, index } = props;
	return (
		<Form className="mt-3 ui form field">
			<Form.Field>
				<label>
					Q{index}: {ques}
				</label>
				<FormGroup className="d-flex flex-column ml-4 radio_form">
					{options.map((option, i) => (
						<Label key={i}>
							<Input type="radio" id={i} name="option" />
							{option}
						</Label>
					))}
				</FormGroup>
			</Form.Field>
		</Form>
	);
}

export default MultipleChoiceInput;
