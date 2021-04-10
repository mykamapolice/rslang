export interface IUser {
  isLoginForm: boolean;
  isAuth: boolean;
  name: string;
  userId: string | null;
  message: string | null;
  token: string | null;
  // refreshToken : string | null;
  photoUrl: string;
}

export interface IGeneralVocabulary {
  vMode: boolean;
  page: number;
  lvl: number;
  words: IWord[] | null;
  userList: IWord[] | null;
  value: 0 | 1 | 2;
  notActivePages: number[]|[]
}

export interface IWord {
  word: string;
  id: string;
  _id: string;
  group: number;
  page: number;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  transcription: string;
  textExample: string;
  textMeaning: string;
  textExampleTranslate: string;
  textMeaningTranslate: string;
  wordTranslate: string;
  userWord: any;
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

interface IResult {
  date: number;
  bestSeries: number;
  attempts: number;
  rightAnswers: number;
  learnedWords: number;
}
export interface IGameResult {
  game: string;
  result: IResult;
}

export interface IStatistics {
  learnedWords: number;
  optional: {
    games: {
      [keys: string]: IResult[];
    };
  };
}

export interface IRootState {
  user: IUser;
  statistics: IStatistics;
  vocabulary: IGeneralVocabulary;
}
