import { Form, TextArea } from 'semantic-ui-react';

function ParagraphInput(props) {
	const { ques, index } = props;
	return (
		<Form className="mt-3">
			<Form.Field>
				<label>
					Q{index}: {ques}
				</label>
				<TextArea rows="10" placeholder="Type Your Answer Here" />
			</Form.Field>
		</Form>
	);
}

export default ParagraphInput;
