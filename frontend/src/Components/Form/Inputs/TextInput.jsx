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
	const { value, required } = props;
	const handleChange = e => {
		props.modifyResponse(e.target.value);
	};
	return (
		<form className="mt-3">
			<TextField
				id="outlined-basic"
				label="Type Your Answer Here"
				variant="outlined"
				fullWidth
				defaultValue={value}
				onChange={handleChange}
				required={required}
			/>
		</form>
	);
}

export default TextInput;
