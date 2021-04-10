import { IconButton, TextField } from '@material-ui/core';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
	optionDelete,
	optionUpdate,
} from '../../../Store/ActionCreators/option';
import DeleteIcon from '@material-ui/icons/Delete';

function Option(props) {
	const { id, index, content, deleteOption } = props;
	const [value, setValue] = useState(content);
	const dispatch = useDispatch();
	const updateOption = () => {
		const data = {
			content: value,
		};
		dispatch(optionUpdate({ id, data }));
	};

	return (
		<>
			<TextField
				variant="outlined"
				label={`Option ${index}`}
				defaultValue={props.content}
				onChange={e => setValue(e.target.value)}
				onKeyUp={updateOption}
			/>
			<IconButton onClick={deleteOption}>
				<DeleteIcon />
			</IconButton>
		</>
	);
}

export default Option;
