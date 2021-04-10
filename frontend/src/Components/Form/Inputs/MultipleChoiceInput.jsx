import {
	FormControl,
	FormControlLabel,
	Radio,
	RadioGroup,
} from '@material-ui/core';

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { optionFetch } from '../../../Store/ActionCreators/option';
function MultipleChoiceInput(props) {
	const { quesId } = props;
	const [value, setValue] = useState(props.value);
	const [options, setOptions] = useState([]);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(optionFetch(quesId)).then(res => {
			setOptions(res);
		});
	}, [dispatch]);
	const handleChange = e => {
		setValue(e.target.value);
		props.modifyResponse(e.target.value);
	};

	return (
		<FormControl>
			<RadioGroup value={value} onChange={handleChange}>
				{options.map((option, i) => (
					<FormControlLabel
						key={i}
						value={option.content}
						control={<Radio />}
						label={option.content}
					/>
				))}
			</RadioGroup>
		</FormControl>
	);
}

export default MultipleChoiceInput;
