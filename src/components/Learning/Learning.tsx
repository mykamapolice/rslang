import React from 'react';
import {
  Button,
} from 'react-bootstrap';
import { X, VolumeUp, LightningFill } from 'react-bootstrap-icons';
import {IWord} from '../../interfaces';
import Pagination from './Pagination/Pagination';
import WordCards from './WordCards/WordCards';
import Lvl from './Lvl/Lvl'
import { useDispatch, useSelector } from 'react-redux';
import {setLvl,setPage,fetchingGeneral} from '../../redux/reducers/vocabulary'

const baseUrl: string = 'https://rs-lang-rs-team-41.herokuapp.com/';
const fetching = async (url: string) => {
  const response = await fetch(url);
  const answer = await response.json();
  return answer;
};

const levels: string[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

const audio: HTMLAudioElement = new Audio();

function WordList(): JSX.Element {
  const dispatch = useDispatch();
  const state:any = useSelector(state => state);
  const {vocabulary:{page, lvl, words} } = state;
  const radioButtonHandler = (): void => {
    dispatch(fetchingGeneral(`${baseUrl}words?page=${page}&group=${lvl}`));
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
    // setWords(words.filter((el: any) => el.word !== word));
  }

  return (
    <div className="Vocabulary">
          <div className="container-fluid">
          <div className="d-sm-flex p-2 flex-wrap justify-content-center">
            <Lvl levels={levels} lvl = {lvl} setLvl={(n:number)=>dispatch(setLvl(n))} />
            <Pagination page={page} setPage={(n:number)=>dispatch(setPage(n))} />
          </div>
  
        </div>
      <div className="container-fluid">
        <div className="d-sm-flex p-2 flex-wrap justify-content-center">
          {words ? <WordCards words={words} deleter={deleter} audioHandler={audioHandler} baseUrl = {baseUrl}/> : ''}
        </div>
      </div>
    </div>
  );
}

export default WordList;
