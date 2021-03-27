import { Form, Input } from 'semantic-ui-react';

function NumberInput(props) {
	return (
		<Form className="mt-3">
			<Form.Field>
				
				<Input fluid type="number" placeholder="Type Your Answer Here" />
			</Form.Field>
		</Form>
	);
}

export default NumberInput;
