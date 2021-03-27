import {
  createAction,
  createAsyncThunk,
  createReducer,
} from '@reduxjs/toolkit';
import { 
  IUser
} from '../../interfaces'
import {createUser, loginUser} from '../../utils/user-helper'

const initialState: IUser = {
  isLoginForm: true,
  isAuth: false,
  name: 'Guest',
  email: '',
};

export const changeLoginForm = createAction('user/changeLoginForm')
export const registration = createAsyncThunk('user/registration', createUser);
export const login = createAsyncThunk('user/login', loginUser);
export const logout = createAction('user/logout');

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeLoginForm, (state) => {
      const { isLoginForm } = state;

      state.isLoginForm = !isLoginForm;
    })

    .addCase(registration.fulfilled, (state, action) => {
      state.isLoginForm = true
    })

    .addCase(login.fulfilled, (state, action) => {
      state.isAuth = true;
      state.email = action.payload.email;
      state.name = action.payload.name;
    })

    .addCase(logout, (state) => {
      state = {
        isLoginForm: true,
        isAuth: false,
        name: 'Guest',
        email: '',
      }
    });
});
