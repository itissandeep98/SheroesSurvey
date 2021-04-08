import {
	FormControl,
	FormControlLabel,
	Radio,
	RadioGroup,
} from '@material-ui/core';

import { useState } from 'react';
function MultipleChoiceInput(props) {
	const [value, setValue] = useState(props.value);
	const handleChange = e => {
		setValue(e.target.value);
		props.modifyQuestion(e.target.value);
	};
	const options = [
		{
			key: 1,
			text: 'option 1',
		},
		{
			key: 2,
			text: 'option 2',
		},
		{
			key: 3,
			text: 'option 3',
		},
		{
			key: 4,
			text: 'option 4',
		},
	];
	return (
		<FormControl>
			<RadioGroup value={value} onChange={handleChange}>
				{options.map((option, i) => (
					<FormControlLabel
						key={i}
						value={option.text}
						control={<Radio />}
						label={option.text}
					/>
				))}
			</RadioGroup>
		</FormControl>
	);
}

export default MultipleChoiceInput;
