import { once } from 'node:events';
import React from 'react';
import {
  Button,
} from 'react-bootstrap';
import { X, VolumeUp, LightningFill } from 'react-bootstrap-icons';

const levels:string[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
const baseUrl:string = 'https://rs-lang-rs-team-41.herokuapp.com/';
const fetching = async (url: string) => {
  const response = await fetch(url);
  const answer = await response.json();
  return answer;
};

const audio:HTMLAudioElement = new Audio();
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

  const audioHandler = (src:string[], i:number): void => {
    if(i==src.length)return
      audio.src = `${baseUrl}${src[i]}`;
      audio.play();
      audio.addEventListener('ended',()=>{
      audioHandler(src,i+1)
      }, {once:true});
  };

  const deleter = (word:string) => {
    setWords (words.filter((el:any) => el.word !== word));
  }

  const cardBuilder = levels.map((lvl: string, i: number, arr:string[]) => (
    <>
      <input type="radio" className="btn-check" name="btnradio" id={`${i}`} onClick={(e:any) => setLvl(e.target.id)} autoComplete="off" />
      <label key = {arr.length-i} className="btn btn-outline-primary" htmlFor={`${i}`}>
      {lvl}
    </label>
    </>
  ));

  const mappedWords = words.map((el:any, i:number, arr:never[]): JSX.Element =>(
      <div key={arr.length-i} className="card mx-3 mb-3 pb-3" style={{ width: '10rem' }}>
        <img className="card-img-top" src={`${baseUrl}${el.image}`} alt="хуй" />
        <span className="card-title">{el.word}</span>
        <span>{el.transcription}</span>
        <span>{el.wordTranslate}</span>
        <div className="card-body fs-4">
          {/* <p className="card-text fs-4">
            {el.textMeaning}
          </p> */}
        </div>
        <div className='Col'>
        <Button title="добавить в сложные" variant="outline-info"><LightningFill color="yellow" size={20} /></Button>
        <Button title="удалить из списка" variant="outline-info" onClick={() => deleter(el.word)}><X color="red" size={20} /></Button>
        <Button title="проиграть аудио" variant="outline-info" onClick={() => audioHandler([el.audio,el.audioMeaning,el.audioExample],0)}><VolumeUp className='text-dark' size={20} /></Button>
        </div>
      </div>
    ));
    const paginationNumbs = [...Array(30)].map((_, i:number) => {
      return (
        <li key = {30 - i} className="page-item">
        <button className="page-link" id={`${i}`} onClick={(e:any)=>setPage(+e.target.id)}>{i+1}</button>
      </li>
      )
    })
  return (
    <div className="Vocabulary">
      <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
        {cardBuilder}
      </div>
      <div className="container-fluid">
        <div className="d-sm-flex p-2 flex-wrap justify-content-center">
          {mappedWords}
        </div>
      </div>
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          <li className="page-item disabled">
            <a className="page-link" href="0" aria-disabled="true">Previous</a>
          </li>
            {paginationNumbs}
          <li className="page-item">
            <a className="page-link" href="4">Next</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default WordList;
