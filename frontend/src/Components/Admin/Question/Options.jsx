import { Form, List, Placeholder } from 'semantic-ui-react';
import Button from '@material-ui/core/Button';
import { Icon } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
	optionCreate,
	optionDelete,
	optionFetch,
} from '../../../Store/ActionCreators/option';
import Option from './Option';

function Options(props) {
	const { quesId } = props;
	const [options, setOptions] = useState([]);
	const [loading, setLoading] = useState(true);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(optionFetch(quesId)).then(res => {
			setOptions(res ?? []);
			setLoading(false);
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

	const deleteOption = (id, index) => {
		setOptions([...options.slice(0, index), ...options.slice(index + 1)]);
		dispatch(optionDelete(id));
	};
	return (
		<Form.Field className="mt-3">
			{loading ? (
				<Placeholder>
					<Placeholder.Paragraph>
						<Placeholder.Line />
						<Placeholder.Line />
					</Placeholder.Paragraph>
				</Placeholder>
			) : (
				<List verticalAlign="middle">
					{options.map((option, i) => (
						<List.Item key={Math.random()}>
							<List.Icon
								name="circle outline"
								size="small"
								verticalAlign="middle"
								className="text-danger"
							/>
							<List.Content>
								<Option
									{...option}
									index={i + 1}
									deleteOption={() => deleteOption(option.id, i)}
								/>
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
			)}
		</Form.Field>
	);
}

export default Options;
