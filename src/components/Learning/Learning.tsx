import React from 'react';
import {
  Button
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { clearWords, createWord, fetchingAggregated, fetchingGeneral, setLvl, setPage, updateWord } from '../../redux/reducers/vocabulary';
import { baseUrl } from '../../utils/constants';
import Lvl from './Lvl/Lvl';
import Pagination from './Pagination/Pagination';
import WordCards from './WordCards/WordCards';
import Vocabulary from '../Vocabulary/Vocabulary'

const images: string[] = [
  `${process.env.PUBLIC_URL}/images/1.jpg`,
  `${process.env.PUBLIC_URL}/images/2.jpg`,
  `${process.env.PUBLIC_URL}/images/3.jpg`,
  `${process.env.PUBLIC_URL}/images/4.jpg`,
  `${process.env.PUBLIC_URL}/images/5.jpg`,
  `${process.env.PUBLIC_URL}/images/6.jpg`,
]
const levels: string[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

const audio: HTMLAudioElement = new Audio();

function WordList(): JSX.Element {
  const dispatch = useDispatch();
  const state: any = useSelector(state => state);
  const {
    vocabulary: { page, lvl, words },
    user: { userId, token, isAuth }
  } = state;
  const radioButtonHandler = (): void => {
    dispatch(clearWords());
    isAuth ? dispatch(fetchingAggregated({ lvl, page, userId, token })) : dispatch(fetchingGeneral({ lvl, page }));
  };

  React.useEffect(() => {
    radioButtonHandler();
  }, [page, lvl, isAuth]);

  const addWordToUser = async (wordId: string, type: any) => {
    const obj = {
      userId,
      wordId,
      token,
      word: { "optional": { ...type, "isExist": true } }
    }
    await dispatch(createWord(obj));
    // radioButtonHandler()
  }

  const updateUserWord = async (wordId: string, type: any) => {
    const obj = {
      userId,
      wordId,
      token,
      type
    }
    await dispatch(updateWord(obj));
    // radioButtonHandler()
  }

  const audioHandler = (src: string[], i: number): void => {
    if (i == src.length) return
    audio.src = `${baseUrl}${src[i]}`;
    audio.play();
    audio.addEventListener('ended', () => {
      audioHandler(src, i + 1)
    }, { once: true });
  };


  return (
    <div className="Vocabulary" style={
      {
        minHeight: 'calc(100vh - 50px)',
        backgroundImage: `url(${images[lvl]})`,
        // backgroundRepeat: 'no-repeat',
        backgroundSize: 'auto'
      }}>
      <div className="container-fluid">
        <div className="row mt-2 ">
          <div className="col">
            <Button title="саванна" variant="primary">Саванна</Button>
            <Button title="удиовызов" variant="secondary">Аудиовызов</Button>
            <Button title="Спринт" variant="success">Спринт</Button>
            <Button title="Своя Игра" variant="danger">Своя Игра</Button>
          </div>
          <div className="col-6">
            <div className="d-sm-flex flex-wrap justify-content-center">
              <Lvl levels={levels} lvl={lvl} setLvl={(n: number) => dispatch(setLvl(n))} />
              <Pagination page={page} setPage={(n: number) => dispatch(setPage(n))} />
            </div>
          </div>
          <div className="col">
            {isAuth && (<NavLink to="/vocabulary">
              <Button className='buttonMarginer' title="Cловарь" variant="info">
                Словарь
                </Button></NavLink>)
            }
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="d-sm-flex p-2 flex-wrap justify-content-center">
          {words
            ?
            <WordCards isAuth={isAuth} words={words} updateUserWord={updateUserWord} audioHandler={audioHandler} baseUrl={baseUrl} addWordToUser={addWordToUser} />
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
