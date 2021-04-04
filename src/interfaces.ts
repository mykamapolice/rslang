export interface IUser {
  isLoginForm: boolean;
  isAuth: boolean;
  name: string;
  userId: string | null;
  message: string | null;
  photoUrl: string;
}

export interface IGeneralVocabulary{
  page:number;
  lvl:number;
  words:IWord[] | null;
}

export interface IWord {
  word:string;
  id: string;
  group: number;
  page : number;
  image:string;
  audio:string;
  audioMeaning:string;
  audioExample:string;
  transcription:string;
  textMeaning:string;
  textExampleTranslate:string;
  textMeaningTranslate:string;
  wordTranslate:string;
}

export interface IUserRegistration {
  password: string;
  email: string;
  name: string;
  photoUrl: string;
}

export interface IUserAuthData {
  email: string;
  password: string;
}

export interface IUserLoginResponse {
  message: string;
  token: string;
  userId: string;
  photoUrl?: string;
}
