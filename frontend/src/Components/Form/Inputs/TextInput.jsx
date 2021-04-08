import { TextField } from '@material-ui/core';

function TextInput(props) {
	return (
		<form className="mt-3">
				<TextField
					id="outlined-basic"
					label="Type Your Answer Here"
					variant="outlined"
					fullWidth
				/>
		</form>
	);
}

export default TextInput;
