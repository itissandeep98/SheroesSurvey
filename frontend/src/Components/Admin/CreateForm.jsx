import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { Button, Icon, List } from 'semantic-ui-react';
import Section from './Section';
import classNames from 'classnames';
import './style.css';
import Banner from './Banner';
import { useDispatch, useSelector } from 'react-redux';
import { formFetch, formUpdate } from '../../Store/ActionCreators/form';
import { sectionCreate } from '../../Store/ActionCreators/section';

function CreateForm(props) {
	const [details, setDetails] = useState('');
	const [structure, setStructure] = useState([]);
	const dispatch = useDispatch();

	useEffect(() => {
		const { id } = props?.match?.params;
		dispatch(formFetch(id)).then(res => {
			setStructure(res?.section_sequence);
			setDetails(res);
		});
	}, [dispatch]);

	const [curr, setCurr] = useState(0);

	const addSection = () => {
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
		});
	};

	const removeSection = index => {
		setStructure([...structure.slice(0, index), ...structure.slice(index + 1)]);
		setCurr(curr - 1);
	};

	const updateForm = data => {
		const { id } = props?.match?.params;
		dispatch(formUpdate({id,data}));
	};

	return (
		<Container className="mt-3" fluid>
			<Row className="d-flex justify-content-center">
				<Col lg={8}>
					<Row>
						<Col className="text-center">
							<h1>Create a new Form</h1>
						</Col>
					</Row>
					<Row>
						<Banner {...details} update={updateForm} />
					</Row>

					<Row className="mt-4">
						<Col>
							<div className="sticky-top text-center" style={{ zIndex: 0 }}>
								<br />
								<Button onClick={addSection} size="mini">
									<Icon name="plus" />
									Add Section
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
						{structure?.length > 0 && (
							<Col xs={10}>
								{
									<Section
										key={structure[curr]}
										id={structure[curr]}
										index={curr + 1}
										remove={() => removeSection(curr)}
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

export default CreateForm;
