import React from 'react';
import { Form } from 'react-bootstrap';
import styles from './GameSettings.module.css';

const GameSettings = (): JSX.Element => (
        <div key="custom-checkbox" className="mb-3">
          <Form.Label><h3>Настройки игры</h3></Form.Label>
          <div className={styles.gameSettingItemsContainer}>
            <div style={{ margin: '1rem' }}>
              <Form.Check
                type="switch"
                id="custom-switch"
                label="Отображать перевод слов и транскрипцию"
              />
            </div>
            <div style={{ margin: '1rem' }}>
              <Form.Check
                type="switch"
                label="Отображать кнопки для добавления в словарь"
                id="custom-switch1"
              />
            </div>
          </div>
        </div>
);

export default GameSettings;
