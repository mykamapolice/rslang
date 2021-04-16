import { createSlice } from '@reduxjs/toolkit';

interface ISettingsState {
	isViewTranslate: boolean;
	isViewButtons: boolean;
	isMusicON: boolean;
	isSoundON: boolean;
	musicVolume: number;
	soundVolume: number;
}

const initialState: ISettingsState = {
	isViewTranslate: true,
	isViewButtons: true,
	isMusicON: true,
	isSoundON: true,
	musicVolume: 50,
	soundVolume: 50,
};

const settingsSlice = createSlice({
	name: 'settings',
	initialState,
	reducers: {
		setIsTranslate: (state, action) => {
			state.isViewTranslate = action.payload;
		},
		setIsButtons: (state, action) => {
			state.isViewButtons = action.payload;
		},
		setMusicVolume: (state, action) => {
			state.musicVolume = action.payload;
		},
		setSoundVolume: (state, action) => {
			state.soundVolume = action.payload;
		},
		setMusicToggle: state => {
			const { isMusicON } = state;
			state.musicVolume = isMusicON ? 0 : 50;
			state.isMusicON = !isMusicON;
		},
		setSoundToggle: state => {
      debugger
			const { isSoundON } = state;
			state.soundVolume = isSoundON ? 0 : 50;
			state.isSoundON = !isSoundON;
		},
	},
});

export const {
	setIsTranslate,
	setIsButtons,
	setMusicVolume,
	setSoundVolume,
	setMusicToggle,
	setSoundToggle,
} = settingsSlice.actions;
export default settingsSlice.reducer;
