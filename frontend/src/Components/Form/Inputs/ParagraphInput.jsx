/**
 * @module User/ParagraphInput
 */
import TextField from '@material-ui/core/TextField';

/**
 * shows the Input for long answer questions.
 * @param {Integer} value - response of user.
 * @param {Boolean} required - Whether Question is mandatory or not
 *
 * @property {Function} handleChange - Modifies the response of user
 */
function ParagraphInput(props) {
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
				multiline
				defaultValue={value}
				onChange={handleChange}
				required={required}
			/>
		</form>
	);
}

export default ParagraphInput;
