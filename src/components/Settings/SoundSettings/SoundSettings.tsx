import React, { useEffect } from 'react';
import { Form } from 'react-bootstrap';
import {useAudio} from 'react-use';
import useSound from 'use-sound';
import styles from './SoundSettings.module.css';

const SoundSettings = (): JSX.Element => {
  // const [play] = useSound(`${process.env.PUBLIC_URL}/sound.mp3`);
  // useEffect(() => {
  //   play();
  // }, []);

  const audioBackground = new Audio(`${process.env.PUBLIC_URL}/sound.mp3`)

  const toggleMusic = () => {

    if(audioBackground.paused) {
      audioBackground.play()
    } else {
      audioBackground.pause()
    }
  }
   const musicPause = () => {
     audioBackground.pause()
   }

  return (
    <div
      key="custom-checkbox"
      className={`${styles.soundSettingsContainer} mb-3`}
    >
      <div>
        <Form.Group
          controlId="music-volume"
          onChange={() => toggleMusic()}
        >
          <Form.Label><h3>Настройки музыки</h3></Form.Label>
          <div className={styles.soundSettingItemsContainer}>
            <div style={{ margin: '1rem' }}>
              <Form.Check
                type="switch"
                id="custom-switch-music"
                label="Музыка выкл/вкл"
                // checked={settings.musicOn}
                // onChange={() => play()}
              />
            </div>

            <div style={{ margin: '1rem' }}>
              <Form.Control
                type="range"
                // defaultValue={settings.musicVolume}
              />
            </div>

          </div>
        </Form.Group>
      </div>

      <div>
        <Form.Group
          controlId="sound-volume"
          onChange={() => musicPause()}
          // onChange={(e: React.FormEvent<HTMLInputElement>) => console.log(e.target)}
        >
         <Form.Label>
            <h3>Настройки звука</h3>
          </Form.Label>
          <div className={styles.soundSettingItemsContainer}>
            <div style={{ margin: '1rem' }}>
              <Form.Check
                type="switch"
                id="custom-switch-sound"
                label="Звуки выкл/вкл"
              // checked={settings.soundOn}
              // onChange={}
              />
            </div>

            <Form.Control
              type="range"
            // defaultValue={settings.soundVolume}
            />
          </div>
        </Form.Group>
      </div>
    </div>
  );
};

export default SoundSettings;
