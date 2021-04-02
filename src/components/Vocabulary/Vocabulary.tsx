import React from 'react';
import { baseUrl } from '../../utils/constants'
import {
  Button, ToggleButtonGroup, ToggleButton,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getWords, updateWord } from '../../redux/reducers/vocabulary'

const audio = new Audio();

const wordType:string[] = ['learn','hard','deleted'];

function Vocabulary(): JSX.Element {
 const [value, setValue] = React.useState(0);
  const state:any = useSelector((state) => state);
  const dispatch  = useDispatch()
  const {user:{isAuth,userId,token},vocabulary:{userList}} = state;

  
  React.useEffect(() => {
    if(isAuth){
    const obj = {
      userId,
      token,
      word: { "difficulty": "learn", "optional": { "isExist": true } }
    }
    dispatch(getWords(obj));
  }
  },[isAuth]);

  

  const audioHandler = (src: string): void => {
    audio.src = src;
    audio.play();
  };

  return (
        <div className="Vocabulary">
            <ToggleButtonGroup
              size="lg"
              type="radio"
              name="options"
              defaultValue={value}
            >
                <ToggleButton variant="primary" value={0} onClick = {(e:any)=>setValue(+e.target.value)}>
                    Изучаемые слова
                </ToggleButton>
                <ToggleButton variant="primary" value={1} onClick = {(e:any)=>setValue(+e.target.value)}>
                    Сложные слова
                </ToggleButton>
                <ToggleButton variant="primary" value={2} onClick = {(e:any)=>setValue(+e.target.value)}>
                    Удалённые слова
                </ToggleButton>
            </ToggleButtonGroup>
            <div className="container-fluid">
                <div className="d-sm-flex p-2 flex-wrap justify-content-center">
                    {
                      userList ?
                        userList.filter((el:any)=>el.userWord.difficulty === wordType[value]).map((el:any) => {     
                          console.log(el)               
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
                              {wordType.filter((wordTypeEl:string)=>wordTypeEl !== wordType[value]).map((wordType:any) => 
                              <Button onClick={() => dispatch(updateWord({userId, token, wordId:el._id, difficulty:wordType}))}>{`${wordType}`}</Button>)}
                              <Button onClick={() => audioHandler(`${baseUrl}${el.audio}`)}>Auditon</Button>
                            </div>
                        );
                      })
                      : ''
                    }
                </div>
            </div>
        </div>
  );
}

export default Vocabulary;
