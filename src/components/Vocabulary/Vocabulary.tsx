import React from 'react';
import { baseUrl } from '../../utils/constants'
import {
  Button, ToggleButtonGroup, ToggleButton,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getWords, updateWord,clearUserList } from '../../redux/reducers/vocabulary'
import Lvl from '../Learning/Lvl/Lvl'
import Pagination from '../Learning/Pagination/Pagination';

const audio = new Audio();
const wordType = ['learn','hard','deleted'];
const wordTypeProps = {
  learn: { 'isLearn': false, 'isHard': true, 'isDeleted': false },
  hard: { 'isLearn': false, 'isHard': true, 'isDeleted': false },
  delete: { 'isLearn': true, 'isHard': false, 'isDeleted': false }
}

const wordMapperCheck = (value:number, {isLearn,isHard,isDeleted}:any) => {
switch (value) {
  case 0:
    if (isLearn||isHard) return true
    break;
  case 1:
    if (isHard) return true
    break;
  case 2:
    if (isDeleted) return true
    break;
  default:
    break;
}
}

const levels: string[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

function Vocabulary(): JSX.Element {
 const [value, setValue] = React.useState(0);
  const [page,setPage] = React.useState(0);
  const [lvl,setLvl] = React.useState(0);
  const state:any = useSelector((state) => state);
  const dispatch  = useDispatch()
  const {user:{isAuth,userId,token},vocabulary:{userList}} = state;
  React.useEffect(() => {
    if(isAuth){
    const obj = {
      userId,
      token
      // word: { "difficulty": "learn", "optional": { "isExist": true } }
    }
    dispatch(getWords({userId,token}));
  }
  return () => {
    dispatch(clearUserList())
  }
  },[]);
  const audioHandler = (src: string): void => {
    audio.src = src;
    audio.play();
  };
  console.log()
  return (
        <div className="Vocabulary">
        <div className="container-fluid">
        <div className="row mt-2 ">
        <div className="col">
        <Button title="саванна" variant="outline-info">Саванна</Button>
        <Button title="удиовызов" variant="outline-info">Аудиовызов</Button>
        <Button title="Спринт" variant="outline-info">Спринт</Button>
        <Button title="Своя Игра" variant="outline-info">Своя Игра</Button>
        </div>
        </div>
          </div>
         <div className="col-6">
           <div className="d-sm-flex flex-wrap justify-content-center">
          <Lvl levels={levels} lvl={lvl} setLvl={(n: number) => dispatch(setLvl(n))} />
          <Pagination page={page} setPage={(n: number) => dispatch(setPage(n))} />
          </div>
          </div>
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
                        userList.filter((el:any) => wordMapperCheck(value, el.userWord.optional)).map((el:any,i:number,arr:any[]) => {                   
                        return (
                            <div key={arr.length - i} className="card mx-3 mb-3 pb-3" style={{ width: '12rem',background: `${el.userWord.optional.isHard===true && '#999090'}`}}>
                              <img className="card-img-top" src={`${baseUrl}${el.image}`} alt="х"/>
                              <h4 className="card-title">{el.word}</h4>
                              <h5>{el.transcription}</h5>
                              <h6>{el.wordTranslate}</h6>
                              <div className="card-body fs-4">
                                  <p className="card-text fs-4" dangerouslySetInnerHTML = {{__html:el.textMeaning}}/>
                                  </div>
                                    <div className='Col'>
                              {(value===1||value===2)&&<Button onClick={() => dispatch(updateWord({userId, token, wordId:el._id, type:wordTypeProps.delete}))}>Восстановить</Button>}
                              <Button onClick={() => audioHandler(`${baseUrl}${el.audio}`)}>Auditon</Button>
                              <div className='Col'>
                            </div>
                                </div>
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



  {/* {(!el.userWord.optional.isHard&&(value===1||value===2)) && <Button onClick={() => dispatch(updateWord({userId, token, wordId:el._id, type:wordTypeProps.learn}))}>в изучаемые</Button>}
                             {(value===0||value===2) && <Button onClick={() => dispatch(updateWord({userId, token, wordId:el._id, type:wordTypeProps.hard}))}>в сложные</Button>} */}