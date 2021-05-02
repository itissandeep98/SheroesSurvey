/**
 * @module User/MultipleChoice
 */
import {
	FormControl,
	FormControlLabel,
	Radio,
	RadioGroup,
} from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { optionFetch } from '../../../Store/ActionCreators/option';
import { Image } from 'semantic-ui-react';

/**
 * shows the multiple options of MCQ.
 * @param {Integer} quesId - Unique ID of the Question.
 * @param {Boolean} required - Whether Question is mandatory or not
 *
 * @property {Function} handleChange - Modifies the response of user
 */
function MultipleChoiceInput(props) {
	const { quesId, required } = props;
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
		<FormControl required={required}>
			<RadioGroup value={value} onChange={handleChange}>
				{options.map((option, i) => (
					<>
						<FormControlLabel
							key={i}
							value={option.content}
							control={<Radio />}
							label={option.content}
						/>
						
						<Image src={option.image_path} size="small"/>
					</>
				))}
			</RadioGroup>
		</FormControl>
	);
}

export default MultipleChoiceInput;
