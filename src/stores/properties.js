import { writable } from 'svelte/store';

const initialState = {
	friendlyName: 'Default Friendly Name',
	headline: 'Default Headline',
	bodyCopy: 'Default body copy',
	imagePreviewUrl: '',
	pollItems: [],
	newPollItem: ''
};

export const friendlyName = writable(initialState.friendlyName);

export const headline = writable(initialState.headline);

export const bodyCopy = writable(initialState.bodyCopy);

export const imagePreviewUrl = writable(initialState.imagePreviewUrl);

export const pollItems = writable(initialState.pollItems);

export const newPollItem = writable(initialState.newPollItem);

export const resetProperties = () => {
	friendlyName.set(initialState.friendlyName);
	headline.set(initialState.headline);
	bodyCopy.set(initialState.bodyCopy);
	imagePreviewUrl.set(initialState.imagePreviewUrl);
	pollItems.set(initialState.pollItems);
	newPollItem.set(initialState.newPollItem);
};
