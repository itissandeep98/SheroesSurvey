import { Form, TextArea } from 'semantic-ui-react';

function ParagraphInput(props) {
	return (
		<Form className="mt-3">
			<Form.Field>
				<TextArea rows="10" placeholder="Type Your Answer Here" />
			</Form.Field>
		</Form>
	);
}

export default ParagraphInput;
