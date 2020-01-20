import { writable } from 'svelte/store';

const initialState = {
	hasImage: false,
	hasPoll: false
};

export const hasImage = writable(initialState.hasImage);

export const hasPoll = writable(initialState.hasPoll);

export const resetUiState = () => {
	hasImage.set(initialState.hasImage);
	hasPoll.set(initialState.hasPoll);
};
