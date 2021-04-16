import React from 'react';
import { Form } from 'react-bootstrap';
import styles from './GameSettings.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { setIsTranslate, setIsButtons } from '../../../redux/reducers/settings';

const GameSettings = (): JSX.Element => {
	const { isViewTranslate, isViewButtons } = useSelector(
		(state: any) => state.settings
	);
    const dispatch = useDispatch();
    
	const switchHandler = (e: any) => {
		switch (e.target.id) {
			case 'buttons':
                dispatch(setIsButtons(!isViewButtons));
				break;
			case 'translate':
                dispatch(setIsTranslate(!isViewTranslate));
				break;
		}
	};

	return (
		<div key='custom-checkbox' className='mb-3'>
			<Form.Label>
				<h3>Настройки электронного учебника</h3>
			</Form.Label>

			<div className={styles.gameSettingItemsContainer}>
				<div style={{ margin: '1rem' }}>
					<Form.Check  
                        checked={isViewTranslate}
						onChange={switchHandler}
						type='switch'
						id='translate'
						label='Отображать перевод слов и транскрипцию'
					/>
				</div>

				<div style={{ margin: '1rem' }}>
					<Form.Check
                        checked={isViewButtons}
						onChange={switchHandler}
						type='switch'
						label='Отображать кнопки для добавления в словарь'
						id='buttons'
					/>
				</div>
			</div>
		</div>
	);
};

export default GameSettings;
