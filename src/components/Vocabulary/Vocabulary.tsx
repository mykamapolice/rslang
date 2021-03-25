import React from 'react';
import {
  Button, Col, Row, ToggleButtonGroup, ToggleButton, Card, CardColumns, Nav, Navbar,
} from 'react-bootstrap';

const baseUrl = 'https://rs-lang-rs-team-41.herokuapp.com/';
const fetching:any = async (url:string) => {
  const response = await fetch(url);
  const answer = await response.json();
  return answer;
};
const audio = new Audio();
function Vocabulary(): JSX.Element {
  const [words, setWords] = React.useState([]);
  React.useEffect(() => {
    if (!words.length) {
      fetching(`${baseUrl}words`).then((data:[]) => {
        setWords(data);
        console.log(data);
      });
    }
  });
  const audioHandler = (src:string):void => {
    audio.src = src;
    audio.play();
  };
  const mappedWords = words.map((el:any):JSX.Element => {
    console.log(el);
    return (
        <div className="card mx-3 mb-3" style={{ width: '25rem' }}>
          <img className="card-img-top" src={`${baseUrl}${el.image}`} alt="хуй"/>
          <h4 className="card-title">{el.word}</h4>
          <h5>{el.transcription}</h5>
          <h6>{el.wordTranslate}</h6>
          <div className="card-body">
          <p className="card-text">
            {el.textMeaning}
          </p>
          </div>
          <Button onClick={() => audioHandler(`${baseUrl}${el.audio}`)}>Auditon</Button>
        </div>
    );
  });
  return (
  <div className="Vocabulary">
    <ToggleButtonGroup size="lg" type="radio" name="options" defaultValue={1}>
      <ToggleButton variant="primary" value={1}>Изучаемые слова</ToggleButton>
      <ToggleButton variant="primary" value={2}>Сложные слова</ToggleButton>
      <ToggleButton variant="primary" value={3}>Удалённые слова</ToggleButton>
    </ToggleButtonGroup>
    <div className="container-fluid">
    <div className="d-sm-flex p-2 flex-wrap justify-content-center">
      {mappedWords}
    </div>
    </div>
  </div>
  );
}

export default Vocabulary;
