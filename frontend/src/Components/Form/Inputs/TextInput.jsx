/**
 * @module User/TextInput
 */
import { TextField } from '@material-ui/core';

/**
 * shows the Input for short answer questions.
 * @param {Integer} quesId - Unique ID of the Question.
 * @param {Boolean} required - Whether Question is mandatory or not
 *
 * @property {Function} handleChange - Modifies the response of user
 */
function TextInput(props) {
	const { value, required, other_params } = props;
	const handleChange = e => {
		props.modifyResponse(e.target.value);
	};
	return (
		<form className="mt-3">
			<TextField
				type={other_params.datatype === 'INT' && 'number'}
				id="outlined-basic"
				label="Type Your Answer Here"
				variant="outlined"
				fullWidth
				defaultValue={value}
				onChange={handleChange}
				required={required}
				inputProps={{
					maxLength: other_params.limit_length,
				}}
			/>
			{other_params.datatype === 'INT' && (
				<small className="text-muted">
					Your response should lie between {other_params.min_val} -{' '}
					{other_params.max_val}, otherwise your response might be discarded
				</small>
			)}
		</form>
	);
}

export default TextInput;
