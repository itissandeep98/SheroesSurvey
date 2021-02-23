import { Dropdown, Form, Icon, Input } from 'semantic-ui-react';
import { QuestionTypes } from '../../Utils/QuestionTypes';

function Question(props) {
	const { ques, type, modify } = props;
	return (
		<div className="mt-3 mb-5 d-flex align-items-center">
			<Form className=" mr-2 w-100">
				<Input
					fluid
					defaultValue={ques}
					onBlur={e => modify('ques', e.target.value)}
					placeholder="Type Your Question Here"
				/>
				<br />
				<Dropdown
					placeholder="Select Question Type"
					search
					selection
					options={QuestionTypes}
					value={type}
					onChange={(e, { value }) => modify('type', value)}
				/>
			</Form>
			<Icon
				name="times"
				className="float-right"
				size="large"
				onClick={props.remove}
			/>
		</div>
	);
}

export default Question;
