// NOTE: jest-dom adds handy assertions to Jest and it is recommended, but not required.
//import '@testing-library/jest-dom/extend-expect';

import { render } from '@testing-library/svelte';

import Textbox from '../src/Textbox.svelte';

test('Textbox contains label attached to text input', () => {
	const {
		getByText,
		getByLabelText,
		getByDisplayValue,
		getByPlaceholderText
	} = render(Textbox, {
		id: 'TextboxId',
		label: 'Textbox label',
		placeholder: 'Textbox placeholder',
		value: 'Textbox value'
	});

	expect(getByText('Textbox label')).toBeInTheDocument();
	expect(getByLabelText('Textbox label')).toBeInTheDocument();
	expect(getByPlaceholderText('Textbox placeholder')).toBeInTheDocument();
	expect(getByDisplayValue('Textbox value')).toBeInTheDocument();
});
