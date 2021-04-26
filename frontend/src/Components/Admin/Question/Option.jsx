/**
 * @module Admin/Option
 */
import { IconButton, TextField } from '@material-ui/core';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { optionUpdate } from '../../../Store/ActionCreators/option';
import DeleteIcon from '@material-ui/icons/Delete';
/**
 * Represents a Single Option in Multiple Choice Question On Admin Panel.
 * @param {Integer} id - Unique ID of the option.
 * @param {Integer} index - Position of Option in List.
 * @param {String} content - Text of the option.
 *
 * @property {Function} updateOption -Updates the content in option
 */

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
				value={value}
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
