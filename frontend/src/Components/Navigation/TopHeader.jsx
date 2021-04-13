import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { Image } from 'semantic-ui-react';
import './style.css';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { IconButton } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAction } from '../../Store/ActionCreators/auth';

function TopHeader() {
	const { key } = useSelector(state => state.auth);
	const dispatch = useDispatch();
	const [prevScrollpos, setprevScrollpos] = useState(window.pageYOffset);
	const [top, setTop] = useState(0);
	const [menu, setMenu] = useState(null);
	const handleClose = () => {
		setMenu(null);
	};
	const handleClick = e => {
		setMenu(e.currentTarget);
	};
	const handleLogout = () => {
		dispatch(logoutAction());
	};
	const handleScroll = () => {
		var currentScrollPos = window.pageYOffset;
		if (prevScrollpos > currentScrollPos) {
			setTop('0px');
		} else {
			setTop('-80px');
		}
		setprevScrollpos(currentScrollPos);
	};
	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});
	return (
		<Container
			fluid
			className="navbar_top shadow sticky-top bg-danger py-3"
			style={{ top: top }}>
			<Container>
				<Row>
					<Col className=" justify-content-center d-flex">
						<Image
							src={process.env.PUBLIC_URL + '/Icons/full-logo_white.svg'}
							alt="sheroes"
						/>
					</Col>
					{key && (
						<>
							<IconButton className="float-right p-0" onClick={handleClick}>
								<AccountCircleIcon fontSize="large" />
							</IconButton>
							<Menu anchorEl={menu} open={Boolean(menu)} onClose={handleClose}>
								<MenuItem onClick={handleClose}>
									<AssignmentIndIcon />
									Profile
								</MenuItem>
								<MenuItem onClick={handleLogout}>
									<ExitToAppIcon /> Logout
								</MenuItem>
							</Menu>
						</>
					)}
				</Row>
			</Container>
		</Container>
	);
}

export default TopHeader;
