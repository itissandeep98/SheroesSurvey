/**
 * @module Admin/FormEdit
 */
import { useEffect, useState } from 'react';
import { Col, Container, Row, Spinner } from 'reactstrap';
import { Button, Icon, List } from 'semantic-ui-react';
import Section from './Section';
import classNames from 'classnames';
import Banner from './Banner';
import { useDispatch, useSelector } from 'react-redux';
import { formFetch, formUpdate } from '../../Store/ActionCreators/form';
import {
	sectionCreate,
	sectionDelete,
} from '../../Store/ActionCreators/section';
import { withRouter } from 'react-router';
import NavigationBar from '../Navigation/NavigationBar';
import ConsentPage from './ConsentPage';

/**
 * Provides the ability to edit everything in the form.
 * @param {Integer} id - Unique ID of the Form taken from the URL.
 * @param {Integer} userid -  Unique ID of the logged in user.
 *
 * @property {Function} addSection -Updates the content in option
 * @property {Function} removeSection -Updates the content in option
 * @property {Function} updateForm -Updates the content in option
 * 
 */

function CreateForm(props) {
	const userid = useSelector(state => state?.auth?.userId);
	const { id } = props?.match?.params;
	const [details, setDetails] = useState('');
	const [structure, setStructure] = useState([]);
	const [loading, setLoading] = useState(false);
	const [curr, setCurr] = useState(0);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(formFetch(id)).then(res => {
			setStructure(res?.section_sequence);
			setDetails(res);
		});
	}, [dispatch]);

	const addSection = () => {
		setLoading(true);
		const data = {
			question_sequence: [],
			form_id: id,
			created_by: userid,
			updated_by: userid,
		};
		dispatch(sectionCreate(data)).then(res => {
			if (structure) {
				setStructure([...structure, res.id]);
			} else {
				setStructure([res.id]);
			}
			setCurr(structure.length);
			setLoading(false);
		});
	};

	const removeSection = (id, index) => {
		setStructure([...structure.slice(0, index), ...structure.slice(index + 1)]);
		dispatch(sectionDelete(id));
		if (index == 0) {
			if (structure.length > 0) {
				setCurr(0);
			}
		} else {
			setCurr(index - 1);
		}
	};

	const updateForm = data => {
		dispatch(formUpdate({ id, data }));
	};

	return (
		<Container className="mt-3" fluid>
			{details && (
				<Row className="d-flex justify-content-center">
					<Col lg={8}>
						<Row>
							<Col className="text-center">
								<NavigationBar
									form_id={id}
									response_toggle={details?.is_active}
								/>
								<h1 className="d-inline text-capitalize">{details.heading}</h1>
							</Col>
						</Row>
						<Row>
							<Banner {...details} update={updateForm} key={3} />
						</Row>
						<Row>
							<ConsentPage
								update={updateForm}
								consent_toggle={details?.consent_toggle}
								consent_text={details?.consent_text}
							/>
						</Row>

						<Row className="mt-4">
							<Col xs={2}>
								<div className="sticky-top text-center" style={{ zIndex: 0 }}>
									<br />
									<Button onClick={addSection} size="mini" disabled={loading}>
										{loading ? (
											<Spinner />
										) : (
											<>
												<Icon name="plus" />
												Add Section
											</>
										)}
									</Button>
									<List>
										{structure?.map((section, i) => (
											<List.Item
												as="a"
												key={i}
												onClick={() => setCurr(i)}
												className={classNames('text-center mb-2', {
													'text-danger': curr === i,
													'text-dark ': curr !== i,
												})}>
												Section {i + 1}
											</List.Item>
										))}
									</List>
								</div>
							</Col>
							{structure?.length > 0 && curr > -1 && (
								<Col>
									{
										<Section
											key={structure[curr]}
											id={structure[curr]}
											index={curr + 1}
											userid={userid}
											remove={() => removeSection(structure[curr], curr)}
										/>
									}
								</Col>
							)}
						</Row>
					</Col>
				</Row>
			)}
		</Container>
	);
}

export default withRouter(CreateForm);
