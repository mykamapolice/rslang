import React, { useEffect } from 'react';
import { Form } from 'react-bootstrap';
import useSound from 'use-sound';
import styles from './SoundSettings.module.css';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const alarm = require('../../../assets/sounds/sound.mp3');

const SoundSettings = (): JSX.Element => {
  const [play] = useSound(alarm);
  useEffect(() => {
    play();
  }, []);

  return (
    <div
      key="custom-checkbox"
      className={`${styles.soundSettingsContainer} mb-3`}
    >
      <div>

        <Form.Group
          controlId="music-volume"
          onChange={() => play()}
        >
          <Form.Label><h3>Настройки музыки</h3></Form.Label>

          <div className={styles.soundSettingItemsContainer}>
            <div style={{ margin: '1rem' }}>
              <Form.Check
                type="switch"
                id="custom-switch-music"
                label="Музыка выкл/вкл"
                // checked={settings.musicOn}
                onChange={() => play()}
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
          onChange={(e: React.FormEvent<HTMLInputElement>) => console.log(e.target)}
        >
          <Form.Label><h3>Настройки звука</h3></Form.Label>

          <div className={styles.soundSettingItemsContainer}>
            <div style={{ margin: '1rem' }}>
              <Form.Check
                type="switch"
                id="custom-switch-sound"
                label="Звуки выкл/вкл"
                // checked={settings.soundOn}
                // onChange={turnOnOffSoundHandler}
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
