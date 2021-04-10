import { TextField } from '@material-ui/core';

function TextInput(props) {
	const { value } = props;
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
			/>
		</form>
	);
}

export default TextInput;
