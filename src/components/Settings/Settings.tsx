import React from 'react';
import { Form } from 'react-bootstrap';
import GameSettings from './GameSettings/GameSettings';
import SoundSettings from './SoundSettings/SoundSettings';
import styles from './Settings.module.css';

function Settings(): JSX.Element {
  return (
        <div className={styles.settingContainer}>
            <Form>
                <GameSettings />
                <SoundSettings />
            </Form>
        </div>
  );
}

export default Settings;
