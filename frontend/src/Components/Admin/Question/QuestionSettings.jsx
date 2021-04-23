import moment from 'moment';
import { useState } from 'react';
import { Dropdown, Icon } from 'semantic-ui-react';
import QuestionMore from './QuestionMore';
import { useDispatch } from 'react-redux';
import { questionUpdate } from '../../../Store/ActionCreators/question';

function QuestionSettings(props) {
	const { ques, id, remove, mandatory } = props;
	const [modal, setModal] = useState(false);
	const [selected, setSelected] = useState(mandatory);
	const dispatch = useDispatch();

	const markImportant = () => {
		const data = {
			mandatory_toggle: !selected,
		};
		setSelected(!selected);
		dispatch(questionUpdate({ id, data }));
	};
	return (
		<>
			<QuestionMore
				modal={modal}
				toggle={() => setModal(!modal)}
				qtype={ques.qtype}
				id={id}
			/>

			<div className="d-flex justify-content-end">
				<small className=" text-muted ">
					Created {moment(ques?.created_on).fromNow()}
				</small>
				<Dropdown
					item
					direction="left"
					icon={<Icon name="ellipsis vertical" />}
					simple>
					<Dropdown.Menu>
						<Dropdown.Item onClick={remove}>
							<Icon name="trash" />
							Delete
						</Dropdown.Item>
						<Dropdown.Item onClick={markImportant}>
							<Icon name="asterisk" />
							{selected ? 'Mark  as Not Important' : 'Mark Important'}
						</Dropdown.Item>
						{ques.qtype === 'SP' && (
							<Dropdown.Item onClick={() => setModal(!modal)}>
								<Icon name="cogs" />
								More Options
							</Dropdown.Item>
						)}
					</Dropdown.Menu>
				</Dropdown>
			</div>
		</>
	);
}

export default QuestionSettings;
