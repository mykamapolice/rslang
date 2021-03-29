export interface IUser {
  isLoginForm: boolean;
  isAuth: boolean;
  name: string;
  userId: string | null;
  message: string | null;
}

export interface IUserRegistration {
  password: string;
  email: string;
  name: string;
}

export interface IUserAuthData {
  email: string;
  password: string;
}

export interface IUserLoginResponse {
  message: string;
  token: string;
  userId: string;
}
