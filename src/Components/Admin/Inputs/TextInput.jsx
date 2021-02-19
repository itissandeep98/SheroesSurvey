import { Form, Input } from 'semantic-ui-react';

function TextInput(props) {
	const { ques, index } = props;
	return (
		<Form className="mt-3">
			<Input fluid rounded placeholder="Type Your Question Here" />
		</Form>
	);
}

export default TextInput;
