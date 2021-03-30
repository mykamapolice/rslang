import React from 'react';
import {
  Button,
} from 'react-bootstrap';
import { X, VolumeUp, LightningFill } from 'react-bootstrap-icons';
import Pagination from './Pagination/Pagination'

const levels: string[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
const baseUrl: string = 'https://rs-lang-rs-team-41.herokuapp.com/';
const fetching = async (url: string) => {
  const response = await fetch(url);
  const answer = await response.json();
  return answer;
};

interface IWord {
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

const audio: HTMLAudioElement = new Audio();
function WordList(): JSX.Element {
  const [page, setPage] = React.useState(0);
  const [lvl, setLvl] = React.useState(0);
  const [words, setWords] = React.useState([]);
  const radioButtonHandler = (): void => {
    fetching(`${baseUrl}words?page=${page}&group=${lvl}`).then((data: []) => {
      setWords(data);
    });
  };

  React.useEffect(() => {
    radioButtonHandler();
  }, [page, lvl]);

  const audioHandler = (src: string[], i: number): void => {
    if (i == src.length) return
    audio.src = `${baseUrl}${src[i]}`;
    audio.play();
    audio.addEventListener('ended', () => {
      audioHandler(src, i + 1)
    }, { once: true });
  };

  const deleter = (word: string) => {
    setWords(words.filter((el: any) => el.word !== word));
  }

  const lvlMapper = ()=> {return levels.map((elLvl: string, i: number, arr: string[]) => (
    <label key={arr.length - i} className={`btn btn-outline-primary ${levels.findIndex(el => el === elLvl) === lvl ? 'active' : ''}`} htmlFor={`${i}`}>
      <input style={{ position: 'absolute', opacity: 0 }} type="radio" className="btn-check" name="btnradio" id={`${i}`} onClick={(e: any) => setLvl(+e.target.id)} autoComplete="off" />
      {elLvl}
    </label>
))}

  const cardBuilder = levels.map((elLvl: string, i: number, arr: string[]) => (
    <>
      <label key={arr.length - i} className={`btn btn-outline-primary ${levels.findIndex(el => el === elLvl) === lvl ? 'active' : ''}`} htmlFor={`${i}`}>
        <input style={{ position: 'absolute', opacity: 0 }} type="radio" className="btn-check" name="btnradio" id={`${i}`} onClick={(e: any) => setLvl(+e.target.id)} autoComplete="off" />
        {elLvl}
      </label>
    </>
  ));
  const mappedWords = words.map((el:IWord, i: number, arr: never[]): JSX.Element => (
    <div key={arr.length - i} className="card mx-3 mb-3 pb-3" style={{ width: '12rem' }}>
      <img className="card-img-top" src={`${baseUrl}${el.image}`} alt="хуй" />
      <span className="card-title">{el.word}</span>
      <span>{el.transcription}</span>
      <span>{el.wordTranslate}</span>
      <div className="card-body fs-4">
        <p className="card-text fs-4" dangerouslySetInnerHTML = {{__html:el.textMeaning}}/>
        </div>
      <div className='Col'>
        <Button title="добавить в сложные" variant="outline-info"><LightningFill color="yellow" size={20} /></Button>
        <Button title="удалить из списка" variant="outline-info" onClick={() => deleter(el.word)}><X color="red" size={20} /></Button>
        <Button title="проиграть аудио" variant="outline-info" onClick={() => audioHandler([el.audio, el.audioMeaning, el.audioExample], 0)}><VolumeUp className='text-dark' size={20} /></Button>
      </div>
    </div>
  ));

  return (
    <div className="Vocabulary">
          <div className="container-fluid">
          <div className="d-sm-flex p-2 flex-wrap justify-content-center">
            <div className = "mr-2">
            {lvlMapper()}
            </div>
             <Pagination page={page} setPage={setPage} />
          </div>
   
        </div>
      <div className="container-fluid">
        <div className="d-sm-flex p-2 flex-wrap justify-content-center">
          {mappedWords}
        </div>
      </div>
    </div>
  );
}

export default WordList;
