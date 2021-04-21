import { TextField } from '@material-ui/core';

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
