/**
 * @module User/Banner
 */
import { useState } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { Button, Icon, Image } from 'semantic-ui-react';
import classNames from 'classnames';
import './style.css';

/**
 * Provides Form details and banner
 * @param {Object} details - Details of the form
 * @param {String} details.description - Description of form
 * @param {String} details.heading - Heading of form
 * @param {URL} details.banner_path - Path of banner image
 * 
 */
function Banner(props) {
	const { heading, description, banner_path } = props;
	const [hidden, setHidden] = useState(true);

	return (
		<Container
			fluid
			className="form_banner px-3 overflow-hidden my-3 bg-white rounded_lg">
			<Row>
				<div className="w-100">
					<Image src={banner_path} fluid />
				</div>
				<Col className="my-3">
					<h1 className="text-capitalize text-center">{heading}</h1>
					<p
						className={classNames('text-justify overflow-hidden form_desc ', {
							hidden_banner: !hidden,
						})}>
						{description}
					</p>
				</Col>
			</Row>
			{description?.length > 200 && (
				<Row>
					<Col className="text-center mt-n3">
						<Button
							icon
							className="bg-white"
							fluid
							onClick={() => setHidden(!hidden)}>
							<Icon
								name={classNames('chevron', {
									up: hidden,
									down: !hidden,
								})}
							/>
						</Button>
					</Col>
				</Row>
			)}
		</Container>
	);
}

export default Banner;
