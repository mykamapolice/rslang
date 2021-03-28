import React from 'react';
import {
  Button,
} from 'react-bootstrap';

const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
const baseUrl = 'https://rs-lang-rs-team-41.herokuapp.com/';
const fetching: any = async (url: string) => {
  const response = await fetch(url);
  const answer = await response.json();
  return answer;
};
const audio = new Audio();
function WordList(): JSX.Element {
  const [words, setWords] = React.useState([]);
  const radioButtonHandler = (e: any | ''): void => {
    const id = e ? e.target.id : 0;
    fetching(`${baseUrl}words?page=2&group=${id}`).then((data: []) => {
      setWords(data);
    });
  };
  React.useEffect(() => {
    if (!words.length) {
      radioButtonHandler('');
    }
  }, []);
  const audioHandler = (src: string): void => {
    audio.src = src;
    audio.play();
  };

  const cardBuilder = levels.map((lvl: string, i: number) => (
    <label className="btn btn-outline-primary" htmlFor={`${i}`}>
      {lvl}
      <input type="radio" className="btn-check" name="btnradio" id={`${i}`} onClick={radioButtonHandler} autoComplete="off" />
    </label>
  ));

  const mappedWords = words.map((el: any): JSX.Element => {
    console.log();
    return (
      <div className="card mx-3 mb-3" style={{ width: '25rem' }}>
        <img className="card-img-top" src={`${baseUrl}${el.image}`} alt="хуй" />
        <h4 className="card-title">{el.word}</h4>
        <h5>{el.transcription}</h5>
        <h6>{el.wordTranslate}</h6>
        <div className="card-body">
          <p className="card-text">
            {el.textMeaning}
          </p>
        </div>
        <Button >В сложные</Button>
        <Button >Удалить</Button>
        <Button onClick={() => audioHandler(`${baseUrl}${el.audio}`)}>Auditon</Button>
      </div>
    );
  });
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
          <li className="page-item">
            <a className="page-link" href="1">1</a>
          </li>
          <li className="page-item">
            <a className="page-link" href="2">2</a>
          </li>
          <li className="page-item">
            <a className="page-link" href="3">3</a>
          </li>
          <li className="page-item">
            <a className="page-link" href="4">Next</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default WordList;
