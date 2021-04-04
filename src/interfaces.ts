export interface IUser {
  isLoginForm: boolean;
  isAuth: boolean;
  name: string;
  userId: string | null;
  message: string | null;
  token : string | null;
  refreshToken : string | null;
}

export interface IGeneralVocabulary{
  page:number;
  lvl:number;
  words:IWord[] | null;
  userList:IWord[] | null;
}

export interface IWord {
  word:string;
  id: string;
  _id:string;
  group: number;
  page : number;
  image:string;
  audio:string;
  audioMeaning:string;
  audioExample:string;
  transcription:string;
  textExample:string;
  textMeaning:string;
  textExampleTranslate:string;
  textMeaningTranslate:string;
  wordTranslate:string;
  userWord:any;
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
