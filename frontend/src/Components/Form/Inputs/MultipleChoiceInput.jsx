import { FormGroup, Input, Label } from 'reactstrap';
import { Form } from 'semantic-ui-react';

function MultipleChoiceInput(props) {
	const options = [
		{
			key: 1,
			text: 'option 1',
		},
		{
			key: 2,
			text: 'option 2',
		},
		{
			key: 3,
			text: 'option 3',
		},
		{
			key: 4,
			text: 'option 4',
		},
	];
	return (
		<Form className="mt-3 ui form field">
			<Form.Field>
				<div className="d-flex flex-column ml-4 radio_form">
					{options.map((option, i) => (
						<Label key={i}>
							<Input type="radio" id={i} name="option" />
							{option.text}
						</Label>
					))}
				</div>
			</Form.Field>
		</Form>
	);
}

export default MultipleChoiceInput;
