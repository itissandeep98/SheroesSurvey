import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Button, Image } from 'semantic-ui-react';
import { useState } from 'react';
import moment from 'moment';
import { useHistory } from 'react-router';
import { CardActionArea, IconButton, Tooltip } from '@material-ui/core';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteIcon from '@material-ui/icons/Delete';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import './style.scss';

function FormCard(props) {
	const {
		id,
		heading,
		description,
		section_sequence,
		created_by,
		updated_on,
		banner_path,
	} = props;
	const [modal, setModal] = useState(false);
	const history = useHistory();
	const defaultImage = process.env.PUBLIC_URL + 'assets/Images/default.png';

	const toggle = () => setModal(!modal);
	return (
		<>
			<Modal isOpen={modal} toggle={toggle}>
				<ModalHeader toggle={toggle}>Delete Form</ModalHeader>
				<ModalBody>
					Are you sure you want to delete form titled <em>"{heading}"</em>?
				</ModalBody>
				<ModalFooter>
					<Button primary onClick={props.delete}>
						Yes
					</Button>
					<Button secondary onClick={toggle}>
						Cancel
					</Button>
				</ModalFooter>
			</Modal>
			<Card className="my-2 border-danger border rounded_lg card_hover">
				<CardActionArea onClick={() => history.push(`/admin/${id}`)}>
					<CardMedia
						style={{
							maxHeight: '8rem',
						}}
						className="overflow-hidden">
						<Image src={banner_path ?? defaultImage} fluid />
					</CardMedia>
					<CardHeader
						title={heading}
						subheader={`Updated ${moment(updated_on).fromNow()}`}
					/>
					<CardContent>
						<Typography variant="body2" color="textSecondary" component="p">
							{description?.substring(0, 100)}
						</Typography>
					</CardContent>
				</CardActionArea>
				<CardActions disableSpacing>
					<Tooltip title="Preview Form" placement="top">
						<IconButton onClick={() => window.open(`/${id}`, '_blank').focus()}>
							<VisibilityIcon />
						</IconButton>
					</Tooltip>
					<Tooltip title="View Responses" placement="top">
						<IconButton onClick={() => history.push(`/admin/${id}/responses`)}>
							<SupervisorAccountIcon />
						</IconButton>
					</Tooltip>
					<Tooltip title="Delete Form" placement="top">
						<IconButton onClick={toggle}>
							<DeleteIcon />
						</IconButton>
					</Tooltip>
				</CardActions>
			</Card>
		</>
	);
}

export default FormCard;
