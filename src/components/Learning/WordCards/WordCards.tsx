import React from 'react';
import {
  Button,
} from 'react-bootstrap';
import { X, VolumeUp, LightningFill } from 'react-bootstrap-icons';
import {IWord} from '../../../interfaces';


function WordCard({words, deleter, audioHandler, baseUrl}:any): JSX.Element {

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
      <div className="container-fluid">
        <div className="d-sm-flex p-2 flex-wrap justify-content-center">
         {mappedWords}
        </div>
      </div>
  );
}

export default WordCard;
