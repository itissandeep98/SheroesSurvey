import {
	FormControl,
	FormControlLabel,
	Radio,
	RadioGroup,
} from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Placeholder } from 'semantic-ui-react';
import { optionFetch } from '../../Store/ActionCreators/option';

function Options(props) {
	const { quesId } = props;
	const [options, setOptions] = useState([]);
	const [loading, setLoading] = useState(true);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(optionFetch(quesId)).then(res => {
			setOptions(res);
			setLoading(false);
		});
	}, [dispatch]);

	return (
		<>
			{loading ? (
				<Placeholder>
					<Placeholder.Paragraph>
						<Placeholder.Line />
						<Placeholder.Line />
					</Placeholder.Paragraph>
				</Placeholder>
			) : (
				<FormControl>
					<RadioGroup value={options[0]?.content}>
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
			)}
		</>
	);
}

export default Options;
