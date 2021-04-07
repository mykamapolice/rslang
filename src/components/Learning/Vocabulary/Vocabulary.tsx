import React from 'react';
import { baseUrl } from '../../../utils/constants'
import {
  Button, ToggleButtonGroup, ToggleButton,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getWords, updateWord, clearUserList } from '../../../redux/reducers/vocabulary'
import WordCards from '../WordCards/WordCards'

const audio = new Audio();
const wordType = ['learn', 'hard', 'deleted'];
const wordTypeProps = {
  learn: { 'isLearn': true, 'isHard': false, 'isDeleted': false },
  hard: { 'isLearn': false, 'isHard': true, 'isDeleted': false },
  delete: { 'isLearn': true, 'isHard': false, 'isDeleted': false }
}

const wordMapperCheck = (value: number, { isLearn, isHard, isDeleted }: any) => {
  switch (value) {
    case 0:
      if (isLearn || isHard) return true
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


function Vocabulary({ 
  vMode, page, setPage, value, isAuth, token, userId, setValue, updateUserWord, audioHandler, baseUrl 
  }: any): JSX.Element {
  const state: any = useSelector((state) => state);
  const dispatch = useDispatch()
  const { userList } = state.vocabulary
  React.useEffect(() => {
    if (isAuth) {
      const obj = {
        userId,
        token
      }
      dispatch(getWords({ userId, token }));
    }
  }, []);

  const filteredWords = userList ? userList.filter((el: any) => wordMapperCheck(value, el.userWord.optional)) : [];
  return (
    <div className="Vocabulary">
      <ToggleButtonGroup
        size="lg"
        type="radio"
        name="options"
        defaultValue={value}
      >
        <ToggleButton variant="primary" value={0} onClick={(e: any) => dispatch(setValue(+e.target.value))}>
          Изучаемые слова
                </ToggleButton>
        <ToggleButton variant="primary" value={1} onClick={(e: any) => dispatch(setValue(+e.target.value))}>
          Сложные слова
                </ToggleButton>
        <ToggleButton variant="primary" value={2} onClick={(e: any) => dispatch(setValue(+e.target.value))}>
          Удалённые слова
                </ToggleButton>
      </ToggleButtonGroup>
      <div className="container-fluid">
        <div className="d-sm-flex p-2 flex-wrap justify-content-center">
         <WordCards vMode={vMode} value={value} isAuth={isAuth} words={filteredWords} updateUserWord={updateUserWord} audioHandler={audioHandler} baseUrl={baseUrl} />
        </div>
      </div>
    </div>
  );
}

export default Vocabulary;
