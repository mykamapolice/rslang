import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IUser } from '../../interfaces';
import { createUser, loginUser, getNewToken } from '../../utils/user-helper';

const initialState: IUser = {
	isLoginForm: true,
	isAuth: false,
	name: 'Guest',
	userId: null,
	message: null,
	token: null,
	refreshToken: null,
	photoUrl: '',
	tokenDate: null
};

const photoUrl: any = localStorage.getItem('photoUrl');
const userId = localStorage.getItem('id');
const name: any = localStorage.getItem('name');
const token: any = localStorage.getItem('token');
const refreshToken:any = localStorage.getItem('refreshToken');
const tokenDate:any = localStorage.getItem('tokenDate')

if (userId !== null) {
	initialState.isAuth = true;
	initialState.name = JSON.parse(name);
	initialState.userId = JSON.parse(userId);
	initialState.photoUrl = JSON.parse(photoUrl);
	initialState.token = JSON.parse(token);
	initialState.refreshToken = JSON.parse(refreshToken);
	initialState.tokenDate = JSON.parse(tokenDate)
}

export const registration = createAsyncThunk('user/registration', createUser);
export const login = createAsyncThunk('user/login', loginUser);
export const tokenRefresh = createAsyncThunk('user/token-refresh', getNewToken);


const userSlice = createSlice({
	name: 'user',

	initialState,

	reducers: {


		changeLoginForm: state => {
			const { isLoginForm } = state;

			state.isLoginForm = !isLoginForm;
		},

		logout: state => {
			const newState = {
				isLoginForm: true,
				isAuth: false,
				name: 'Guest',
				userId: null,
				message: null,
				token: null,
				refreshToken: null,
				photoUrl: '',
				tokenDate: null
			};

			return (state = { ...newState });
		},
	},

	extraReducers: builder => {
		builder

			.addCase(registration.fulfilled, (state, action) => {
				state.isLoginForm = true;				
			})

			.addCase(tokenRefresh.fulfilled, (state, action)=>{
				console.log(action);
				if (action.payload) {
					const {
						token,
						refreshToken,
					} = action.payload;
					state.token = token;
					state.refreshToken = refreshToken;
				}
			})
			.addCase(login.fulfilled, (state, action) => {
				if (action.payload.message === 'Authenticated') {
					const {
						name,
						userId,
						message,
						photoUrl,
						token,
						refreshToken,
					} = action.payload;

					state.isAuth = true;
					state.name = name;
					state.userId = userId;
					state.message = message;
					state.token = token;
					state.refreshToken = refreshToken;
					state.photoUrl = photoUrl;
					state.tokenDate = Math.ceil(Date.now()/1000/60/60);
				} else {
					state.message = action.payload;
				}
			});
	},
});

export const { changeLoginForm, logout } = userSlice.actions;
export default userSlice.reducer;
