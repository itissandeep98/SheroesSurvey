/**
 * @module ProfileSummary
 */

import { Button } from '@material-ui/core';
import { Col, Container, Row } from 'reactstrap';
import { Label, Statistic } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
/**
 * Represents the user statistics with his details
 * @property {Object} user -Details of currently logged in User
 * @property {String} user.first_name - First name of user
 * @property {String} user.last_name - Last name of user
 * @property {String} user.username - Username of user
 *
 */
function ProfileSummary() {
	const user = useSelector(state => state.user);
	return (
		<Container fluid>
			<Row className="d-flex justify-content-center">
				<Col lg={8}>
					<Row className=" my-3 py-4  bg-white align-items-center d-flex justify-content-center">
						<Col md={4} className="text-center">
							<Label circular color="red" size="massive">
								{user?.first_name[0]}
								{user?.last_name[0]}
							</Label>
							<h3>{user?.username}</h3>
						</Col>
						{user.user_type !== 'EU' && (
							<Col>
								<Row>
									<Col className=" d-flex justify-content-around">
										<Statistic>
											<Statistic.Value>{user?.forms?.length}</Statistic.Value>
											<Statistic.Label>Forms</Statistic.Label>
										</Statistic>
										{/* <Statistic>
										<Statistic.Value>31</Statistic.Value>
										<Statistic.Label>Views</Statistic.Label>
									</Statistic>
									<Statistic>
										<Statistic.Value>10</Statistic.Value>
										<Statistic.Label>Responses</Statistic.Label>
									</Statistic> */}
									</Col>
								</Row>
								<Row>
									<Col>
										<Button
											variant="outlined"
											className="w-100"
											color="secondary">
											Edit Profile
										</Button>
									</Col>
								</Row>
							</Col>
						)}
					</Row>
				</Col>
			</Row>
		</Container>
	);
}

export default ProfileSummary;
