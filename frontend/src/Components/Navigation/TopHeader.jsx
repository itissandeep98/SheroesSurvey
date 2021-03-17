import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { Image } from 'semantic-ui-react';
import './style.css';

function TopHeader() {
	const [prevScrollpos, setprevScrollpos] = useState(window.pageYOffset);
	const [top, setTop] = useState(0);
	const handleScroll = () => {
		var currentScrollPos = window.pageYOffset;
		if (prevScrollpos > currentScrollPos) {
			setTop('0px');
		} else {
			setTop('-50px');
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
			<Row>
				<Col className=" justify-content-center d-flex">
					<Image
						src={process.env.PUBLIC_URL + '/Icons/full-logo_white.svg'}
						alt="sheroes"
					/>
				</Col>
			</Row>
		</Container>
	);
}

export default TopHeader;
