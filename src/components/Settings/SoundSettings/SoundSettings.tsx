import React, { useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { useAudio } from 'react-use';
import useSound from 'use-sound';
import styles from './SoundSettings.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
	setMusicVolume,
	setSoundVolume,
	setMusicToggle,
	setSoundToggle,
} from '../../../redux/reducers/settings';

const SoundSettings = (): JSX.Element => {
	// const [play] = useSound(`${process.env.PUBLIC_URL}/sound.mp3`);
	// useEffect(() => {
	//   play();
	// }, []);
  const dispatch = useDispatch()
	const { musicVolume, soundVolume, isMusicON, isSoundON } = useSelector(
		(state: any) => state.settings
	);

	const audioBackground = new Audio(`${process.env.PUBLIC_URL}/sound.mp3`);

	const toggleMusic = () => {
		// if(audioBackground.paused) {
		//   audioBackground.play()
		// } else {
		//   audioBackground.pause()
		// }
	};
	const musicPause = () => {
		//  audioBackground.pause()
	};

	const soundHandler = (e: any) => {
   
		switch (e.target.id) {
			case 'music':
				dispatch(setMusicVolume(+e.target.value));
				break;
			case 'sound':
				dispatch(setSoundVolume(+e.target.value));
				break;
		}
	};

	return (
		<div
			key='custom-checkbox'
			className={`${styles.soundSettingsContainer} mb-3`}
		>
			<div>
				<Form.Group >
					<Form.Label>
						<h3>Настройки музыки</h3>
					</Form.Label>
					<div className={styles.soundSettingItemsContainer}>
						<div style={{ margin: '1rem' }}>
							<Form.Check
								type='switch'
								id='custom-switch-music'
								label='Музыка выкл/вкл'
								checked = {isMusicON}
								onChange={() => dispatch(setMusicToggle())}
							/>
						</div>

						<div style={{ margin: '1rem' }}>
							<Form.Control
                
								type='range'
								id='music'
								value={musicVolume}
								onChange={soundHandler}
			
							/>
						</div>
					</div>
				</Form.Group>
			</div>

			<div>
				<Form.Group>
					<Form.Label>
						<h3>Настройки звука</h3>
					</Form.Label>
					<div className={styles.soundSettingItemsContainer}>
						<div style={{ margin: '1rem' }}>
							<Form.Check
                checked = {isSoundON}
								type='switch'
								id='custom-switch-sound'
								label='Звуки выкл/вкл'
								onChange={() => dispatch(setSoundToggle())}
							/>
						</div>

						<Form.Control
							type='range'
							id='sound'
							value={soundVolume}
							onChange={(e)=>soundHandler(e)}
						/>
					</div>
				</Form.Group>
			</div>
		</div>
	);
};

export default SoundSettings;
