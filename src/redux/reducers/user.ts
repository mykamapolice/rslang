import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IUser } from '../../interfaces';
import { createUser, loginUser } from '../../utils/user-helper';

const initialState: IUser = {
  isLoginForm: true,
  isAuth: false,
  name: 'Guest',
  userId: null,
  message: null,
  photoUrl: '',
};

const photoUrl: any = localStorage.getItem('photoUrl');
const userId = localStorage.getItem('id');
const name: any = localStorage.getItem('name');

if (userId !== null) {
  initialState.isAuth = true;
  initialState.name = name;
  initialState.userId = userId;
  initialState.photoUrl = photoUrl;
}

export const registration = createAsyncThunk('user/registration', createUser);
export const login = createAsyncThunk('user/login', loginUser);

const userSlice = createSlice({
  name: 'user',

  initialState,

  reducers: {
    changeLoginForm: (state) => {
      const { isLoginForm } = state;

      state.isLoginForm = !isLoginForm;
    },

    logout: (state) => {
      const newState = {
        isLoginForm: true,
        isAuth: false,
        name: 'Guest',
        userId: null,
        message: null,
        photoUrl: '',
      };

      return (state = { ...newState });
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(registration.fulfilled, (state, action) => {
        state.isLoginForm = true;
      })

      .addCase(login.fulfilled, (state, action) => {
        if (action.payload.message === 'Authenticated') {
          const { name, userId, message, photoUrl } = action.payload;
          state.isAuth = true;
          state.name = name;
          state.userId = userId;
          state.message = message;
          state.photoUrl = photoUrl;
        } else {
          state.message = action.payload;
        }
      });
  },
});

export const { changeLoginForm, logout } = userSlice.actions;
export default userSlice.reducer;
