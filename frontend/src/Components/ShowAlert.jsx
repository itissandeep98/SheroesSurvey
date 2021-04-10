import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

export const ShowAlert = (props) => {
	const { open, toggle } = props;
	return (
		<Snackbar open={open} autoHideDuration={3000} onClose={toggle}  >
			<MuiAlert
				elevation={6}
				variant="filled"
				onClose={toggle}
				severity="success">
				This is a success message!
			</MuiAlert>
		</Snackbar>
	);
};
