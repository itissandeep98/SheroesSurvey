import TextField from '@material-ui/core/TextField';

function ParagraphInput(props) {
	return (
		<form className="mt-3">
			<TextField
				id="outlined-basic"
				label="Type Your Answer Here"
				variant="outlined"
				fullWidth
				multiline
				rows={10}
			/>
		</form>
	);
}

export default ParagraphInput;
