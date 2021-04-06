import React, { Component } from "react";
import 'react-slideshow-image/dist/styles.css'
// @ts-ignore
import { Slide } from "react-slideshow-image";
import { ArrowRight, VolumeUp } from 'react-bootstrap-icons';
import styles from './AudioncallGameBox.module.css'

const AudiocallGameBox = () => {

    const slideRef: any = React.createRef();

  function next() {
    slideRef.current.goNext();
  }

    const properties = {
      duration: 5000,
      autoplay: false,
      transitionDuration: 500,
      arrows: false,
      infinite: true,
      easing: "ease",
      // indicators: (i: any) => <div className="indicator">{i + 1}</div>
    };

    return (
      <div className={styles.gamebox}>
        <h2>Аудиовызов</h2>
        <h3>Номер вопроса x/10</h3>
        <h3>Количество праильных ответов: 3</h3>
        <div className="slide-container">
          <Slide ref={slideRef} {...properties}>
            <div className="each-fade">
              <div className={styles.gameboxContent}>
                <button><VolumeUp size={96} /></button>
                <div style={{paddingTop: "5%", display: "flex", justifyContent: "space-evenly"}}>
                  <button><p>вариант 1</p></button>
                  <button><p>вариант 2</p></button>
                  <button><p>вариант 3</p></button>
                  <button><p>вариант 4</p></button>
                </div>
              </div>
            </div>
          </Slide>
          <button onClick={next} type="button" style={{marginTop: "10%"}}>
            < ArrowRight size={96}/>
          </button>
        </div>
      </div>
    )
}

export default AudiocallGameBox
