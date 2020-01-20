// NOTE: jest-dom adds handy assertions to Jest and it is recommended, but not required.
//import '@testing-library/jest-dom/extend-expect';

import { render, fireEvent } from '@testing-library/svelte';

import ContentForm from '../src/ContentForm.svelte';
import { resetUiState } from './stores/uiState.js';

beforeEach(() => {
	resetUiState();
});

// The test below this one is more valuable because it tests an interaction not a state mutation.
// test('Shows poll when UI state allows it', () => {
// 	store.set({ ...state, uiState: { ...state.uiState, hasPoll: true } });

// 	const { getByText } = render(ContentForm, {});

// 	expect(getByText('Add an item to this poll')).toBeInTheDocument();
// });

// Note: This is as an async test as we are using `fireEvent`
test('Poll is shown when add poll is clicked', async () => {
	const { queryByText, getByText } = render(ContentForm, {});

	expect(queryByText('Add an item to this poll')).not.toBeInTheDocument();

	// Using await when firing events is unique to the svelte testing library because
	// we have to wait for the next `tick` so that Svelte flushes all pending state changes.
	await fireEvent.click(getByText('Add Poll'));

	expect(getByText('Add an item to this poll')).toBeInTheDocument();
});
