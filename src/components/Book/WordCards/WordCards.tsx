import React from 'react';
import {
  Button,
} from 'react-bootstrap';
import { X, VolumeUp, LightningFill } from 'react-bootstrap-icons';
import { IWord } from '../../../interfaces';
interface IWordTypeKeys {
  [key: string]: boolean;
}
interface IWordType {
  [key: string]: IWordTypeKeys;
}
const wordTypeProps: IWordType = {
  'learn': { 'isLearn': true, 'isHard': false, 'isDeleted': false },
  'hard': { 'isLearn': false, 'isHard': true, 'isDeleted': false },
  'delete': { 'isLearn': false, 'isHard': false, 'isDeleted': true }
}

function WordCard({ vMode, value, userId, token, words, audioHandler, baseUrl, addWordToUser, updateUserWord, isAuth }: any): JSX.Element {
  const buttonHandler = (el: IWord, action: string) => {
    el.hasOwnProperty('userWord')
      ?
      updateUserWord(el.id || el._id, { ...wordTypeProps[action] })
      :
      addWordToUser(el.id || el._id, { ...wordTypeProps[action] });
  }
  const mappedWords = words.filter(((el: IWord) => {
    if (el.hasOwnProperty('userWord')) {
      if (el.userWord.hasOwnProperty('optional')) {
        if (el.userWord.optional.hasOwnProperty('isDeleted')) {
          if (!el.userWord.optional.isDeleted) {
            return el;
          }
          else if (vMode && value === 2) {
            return el;
          }
        }
        else return el;
      }
      else return el;
    }
    else return el;
  })).map((el: IWord, i: number, arr: never[]): JSX.Element => {
    return <div key={el.id || el._id} className="card mx-3 mb-3 pb-3 animated" style={{backgroundColor: 'transparent', border: 'none' }}>
      <div className='cart3d'>
        <div className='front' style={{
          backgroundColor: (el.hasOwnProperty('userWord')
            && ((el.userWord.optional.isLearn && 'rgba(253, 255, 182,0.9)')
              || (el.userWord.optional.isHard && 'rgba(255, 214, 165, 0.9)')
              || (el.userWord.optional.isDeleted && 'rgba(255, 173, 173,0.9)')))
            || 'rgba(253, 255, 182,0.9)'
        }}>
          <img className="card-img-top img-fluid" style={{ height: '200px', objectFit: 'cover' }} src={`${baseUrl}${el.image}`} alt="х" />
          <div className="card-title" style={{ color: '#355070', fontSize: '20px', marginBottom: '0' }}>{el.word}</div>
          <div style={{ fontSize: '14px' }}>{el.transcription}</div>
          <div style={{ fontSize: '14px' }} dangerouslySetInnerHTML={{ __html: el.textMeaning }} />
        </div>
        <div className='back' style={{
          backgroundColor: (el.hasOwnProperty('userWord')
            && ((el.userWord.optional.isLearn && 'rgba(253, 255, 182,0.9)')
              || (el.userWord.optional.isHard && 'rgba(255, 214, 165, 0.9)')
              || (el.userWord.optional.isDeleted && 'rgba(255, 173, 173,0.9)')))
            || 'rgba(253, 255, 182,0.9)'
        }}>
          <div className="card-body fs-4">
            <div className="card-title" style={{ color: '#355070', fontSize: '20px', marginBottom: '0' }}>{el.wordTranslate}</div>
            <div style={{ fontSize: '14px' }}>{el.textMeaningTranslate}</div>
            <div style={{ fontSize: '14px' }} dangerouslySetInnerHTML={{ __html: el.textExample }} />
            <div style={{ fontSize: '14px' }} dangerouslySetInnerHTML={{ __html: el.textExampleTranslate }} />
          </div>
          <div className='Col d-flex justify-content-around' style={{ position: 'absolute', bottom: '5px', left: '0', right: '0' }}>
            {(isAuth && !vMode) && (<>
              <Button title="добавить в сложные" disabled={el.hasOwnProperty('userWord')
                && el.userWord.optional.isHard ? true : false} variant="outline-info"
                onClick={() => { buttonHandler(el, 'hard') }}>
                <LightningFill color="yellow" size={20} />
              </Button>
              <Button title="удалить" id='delete' variant="outline-info" onClick={() => buttonHandler(el, 'delete')}>
                <X color="red" size={20} />
              </Button>
            </>
            )
            }
            {(vMode && (value === 1 || value === 2))
              &&
              <Button variant="outline-info" onClick={() => buttonHandler(el, 'learn')}>
                Восстановить
              </Button>}
            <Button title="проиграть аудио" variant="outline-info"
              onClick={() => audioHandler([el.audio, el.audioMeaning, el.audioExample], 0)}>
              <VolumeUp className='text-dark' size={20} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  });

  return (
    <div className="container-fluid">
      <div className="d-sm-flex p-2 flex-wrap justify-content-center">
        {mappedWords}
      </div>
    </div>
  );
}

export default WordCard;
