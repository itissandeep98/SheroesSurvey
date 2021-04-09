import TextField from '@material-ui/core/TextField';

function ParagraphInput(props) {
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
				multiline
				defaultValue={value}
				rows={10}
				onChange={handleChange}
			/>
		</form>
	);
}

export default ParagraphInput;
