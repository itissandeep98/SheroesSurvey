import { Form, Input, List } from 'semantic-ui-react';

function Options() {
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
		<Form.Field className="mt-3">
			<List >
				{options.map(option => (
					<List.Item>
						<List.Icon name="circle outline" size="small" verticalAlign="middle" className="text-danger" />
						<List.Content>
							<Input defaultValue={option.text} />
						</List.Content>
					</List.Item>
				))}
			</List>
		</Form.Field>
	);
}

export default Options;
