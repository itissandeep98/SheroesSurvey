import { Form, Input, List } from 'semantic-ui-react';
import Button from '@material-ui/core/Button';
import { Icon } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
	optionCreate,
	optionFetch,
} from '../../../Store/ActionCreators/question';

function Options(props) {
	const { quesId } = props;
	const [options, setOptions] = useState([]);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(optionFetch()).then(res => {
			setOptions(res);
		});
	}, [dispatch]);
	const addOptions = () => {
		const data = {
			question_id: quesId,
			content: 'Option',
		};

		dispatch(optionCreate(data)).then(res => {
			setOptions([...options, res]);
		});
	};
	return (
		<Form.Field className="mt-3">
			<List>
				{options.map(option => (
					<List.Item key={Math.random()}>
						<List.Icon
							name="circle outline"
							size="small"
							verticalAlign="middle"
							className="text-danger"
						/>
						<List.Content>
							<Input defaultValue={option.content} />
						</List.Content>
					</List.Item>
				))}
				<List.Item>
					<Button
						variant="outlined"
						onClick={addOptions}
						startIcon={<Icon className="fa fa-plus" />}>
						Add option
					</Button>
				</List.Item>
			</List>
		</Form.Field>
	);
}

export default Options;
