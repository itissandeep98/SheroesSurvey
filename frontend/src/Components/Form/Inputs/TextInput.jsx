import { Form, Input } from 'semantic-ui-react';

function TextInput(props) {
	return (
		<Form className="mt-3">
			<Form.Field>
				<Input fluid placeholder="Type Your Answer Here" />
			</Form.Field>
		</Form>
	);
}

export default TextInput;
