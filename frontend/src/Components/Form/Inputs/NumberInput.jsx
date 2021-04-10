import { TextField } from '@material-ui/core';

function NumberInput(props) {
	return (
		<form className="mt-3">
			<TextField
				id="outlined-basic"
				type="number"
				label="Type Your Answer Here"
				variant="outlined"
				fullWidth
			/>
		</form>
	);
}

export default NumberInput;
