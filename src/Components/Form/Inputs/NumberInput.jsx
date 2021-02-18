import { Form, Input } from 'semantic-ui-react';

function NumberInput(props) {
	const { ques, index } = props;
	return (
		<Form className="mt-3">
			<Form.Field>
				<label>
					Q{index}: {ques}
				</label>
				<Input
					fluid
					rounded
					type="number"
					placeholder="Type Your Answer Here"
				/>
			</Form.Field>
		</Form>
	);
}

export default NumberInput;
