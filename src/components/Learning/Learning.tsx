import React from 'react';
import {
  Button,
} from 'react-bootstrap';
import { X, VolumeUp, LightningFill } from 'react-bootstrap-icons';
import { IWord } from '../../interfaces';
import Pagination from './Pagination/Pagination';
import WordCards from './WordCards/WordCards';
import Lvl from './Lvl/Lvl'
import { baseUrl } from '../../utils/constants'
import { useDispatch, useSelector } from 'react-redux';
import { setLvl, setPage, fetchingGeneral, clearWords, getWords, createWord , updateWord} from '../../redux/reducers/vocabulary'

const levels: string[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

const audio: HTMLAudioElement = new Audio();

function WordList(): JSX.Element {
  const dispatch = useDispatch();
  const state: any = useSelector(state => state);
  const {
    vocabulary: { page, lvl, words },
    user: { userId, token }
  } = state;
  const radioButtonHandler = (): void => {
    dispatch(clearWords());
    dispatch(fetchingGeneral({ lvl, page }));
  };

  React.useEffect(() => {
    radioButtonHandler();
  }, [page, lvl]);

  const addWordToUser = async (wordId:string) => {
    const obj = {
      userId,
      wordId,
      token,
      word: { "difficulty": "learn", "optional": {"isExist": true} }
    }
    await dispatch(createWord(obj));
   
  }

  const audioHandler = (src: string[], i: number): void => {
    if (i == src.length) return
    audio.src = `${baseUrl}${src[i]}`;
    audio.play();
    audio.addEventListener('ended', () => {
      audioHandler(src, i + 1)
    }, { once: true });
  };

  const deleter = (wordId: string) => {
    dispatch(updateWord({userId, token, wordId, difficulty:'deleted' }));
  }

  return (
    <div className="Vocabulary">
      <div className="container-fluid">
        <div className="d-sm-flex p-2 flex-wrap justify-content-center">
          <Lvl levels={levels} lvl={lvl} setLvl={(n: number) => dispatch(setLvl(n))} />
          <Pagination page={page} setPage={(n: number) => dispatch(setPage(n))} />
        </div>

      </div>
      <div className="container-fluid">
        <div className="d-sm-flex p-2 flex-wrap justify-content-center">
          {words
            ?
            <WordCards words={words} deleter={deleter} audioHandler={audioHandler} baseUrl={baseUrl} addWordToUser={addWordToUser} />
            :
            <div className="spinner-border text-info" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default WordList;
