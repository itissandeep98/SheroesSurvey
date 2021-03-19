import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { Button, Icon, List } from 'semantic-ui-react';
import Section from './Section';
import classNames from 'classnames';
import './style.css';
import Banner from './Banner';
import { useDispatch, useSelector } from 'react-redux';
import { formFetch } from '../../Store/ActionCreators/form';
import { sectionCreate } from '../../Store/ActionCreators/section';

function CreateForm(props) {
	const [details, setDetails] = useState('');
	const [structure, setStructure] = useState([]);
	const dispatch = useDispatch();
	const form = useSelector(state => state.form);
	useEffect(() => {
		const { id } = props?.match?.params;
		dispatch(formFetch(id)).then(res => {
			setStructure(form?.data?.section_sequence);
			setDetails(form?.data);
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
			console.log(structure);
			if (structure) {
				setStructure([...structure, res.id]);
			} else {
				setStructure([res]);
			}
			setCurr(structure.length);
		});

		setStructure([...structure, [{ type: 'text' }]]);
		setCurr(structure.length);
	};

	const removeSection = index => {
		setStructure([...structure.slice(0, index), ...structure.slice(index + 1)]);
		setCurr(curr - 1);
	};

	const addQuestion = index => {
		const temp = [...structure];
		temp[index] = [...temp[index], { type: 'text' }];
		setStructure(temp);
	};

	const removeQuestion = (section, index) => {
		const temp = [...structure];

		if (temp[section].length === 1) {
			removeSection(section);
		} else {
			temp[section] = [
				...temp[section].slice(0, index),
				...temp[section].slice(index + 1),
			];
			setStructure(temp);
		}
	};

	const reOrderQuestion = (section, list) => {
		console.log(list);
		const temp = [...structure];
		temp[section] = list;
		setStructure(temp);
	};

	const modifyQuestion = (section, index, target, value) => {
		// console.log(target,value);
		const temp = structure[section];
		temp[index] = { ...temp[index], [target]: value };
		setStructure([
			...structure.slice(0, section),
			temp,
			...structure.slice(section + 1),
		]);
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
						<Banner />
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
								<Section
									id={structure[curr]}
									index={curr + 1}
									remove={() => removeSection(curr)}
									addQuestion={() => addQuestion(curr)}
									removeQuestion={q => removeQuestion(curr, q)}
									modifyQuestion={(q, target, value) =>
										modifyQuestion(curr, q, target, value)
									}
									reOrderQuestion={list => reOrderQuestion(curr, list)}
								/>
							</Col>
						)}
					</Row>
				</Col>
			</Row>
		</Container>
	);
}

export default CreateForm;
