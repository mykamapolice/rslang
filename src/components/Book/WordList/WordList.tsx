import React from 'react';
import WordCards from '../WordCards/WordCards'


function WordList({ isAuth, words, updateUserWord, audioHandler, baseUrl, addWordToUser }: any): JSX.Element {
  return (
    <>
      {words
        ?
        <WordCards isAuth={isAuth} words={words} updateUserWord={updateUserWord} audioHandler={audioHandler} baseUrl={baseUrl} addWordToUser={addWordToUser} />
        :
        <div className="spinner-border text-info" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      }</>
  );
}

export default WordList;
