import { Dropdown, Form, Icon, Input } from 'semantic-ui-react';
import { QuestionTypes } from '../../Utils/QuestionTypes';

function Question(props) {
	const { index, ques, type, modify } = props;
	return (
		<>
			Question {index}
			<Dropdown
				className="float-right"
				item
				direction="left"
				icon={<Icon name="ellipsis vertical" />}
				simple>
				<Dropdown.Menu>
					<Dropdown.Item onClick={props.remove}>
						<Icon name="trash" />
						Delete
					</Dropdown.Item>
					<Dropdown.Item disabled>
						<Icon name="asterisk" />
						Mark Important
					</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
			<div className="mt-3 mb-5 d-flex align-items-center ">
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
			</div>
		</>
	);
}

export default Question;
