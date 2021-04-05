import { useEffect, useState } from 'react';
import { Col, Container, Row, Spinner } from 'reactstrap';
import { Button, Icon, List } from 'semantic-ui-react';
import Section from './Section';
import classNames from 'classnames';
import './style.css';
import Banner from './Banner';
import { useDispatch } from 'react-redux';
import { formFetch, formUpdate } from '../../Store/ActionCreators/form';
import {
	sectionCreate,
	sectionDelete,
} from '../../Store/ActionCreators/section';
import { withRouter } from 'react-router';

function CreateForm(props) {
	const [details, setDetails] = useState('');
	const [structure, setStructure] = useState([]);
	const [loading, setLoading] = useState(false);
	const [curr, setCurr] = useState(0);
	const dispatch = useDispatch();

	useEffect(() => {
		const { id } = props?.match?.params;
		dispatch(formFetch(id)).then(res => {
			setStructure(res?.section_sequence);
			setDetails(res);
		});
	}, [dispatch]);

	const addSection = () => {
		setLoading(true);
		const data = {
			question_sequence: [],
			form_id: props?.match?.params?.id,
			created_by: 2,
			updated_by: 2,
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
		const { id } = props?.match?.params;
		dispatch(formUpdate({ id, data }));
	};

	return (
		<Container className="mt-3" fluid>
			<Row className="d-flex justify-content-center">
				<Col lg={8}>
					<Row>
						<Col className="text-center">
							<h1 className="d-inline text-capitalize">{details.heading}</h1>
							<a
								className="zoom_on_hover float-right d-inline"
								style={{ cursor: 'pointer' }}
								href={`/${props?.match?.params?.id}`}
								target="_blank"
								rel="noopener noreferrer">
								<Icon name="eye" size="large" />
							</a>
						</Col>
					</Row>
					<Row>
						<Banner {...details} update={updateForm} key={3} />
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
										remove={() => removeSection(structure[curr], curr)}
									/>
								}
							</Col>
						)}
					</Row>
				</Col>
			</Row>
		</Container>
	);
}

export default withRouter(CreateForm);
