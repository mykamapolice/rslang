import React from 'react';
import { Button } from 'react-bootstrap';
import { X, VolumeUp, LightningFill } from 'react-bootstrap-icons';

function Buttons({
	el,
	isAuth,
	vMode,
	buttonHandler,
	value,
	audioHandler,
}: any): JSX.Element {
	return (
		<div
			className='Col d-flex justify-content-around'
			style={{
				position: 'absolute',
				bottom: '5px',
				left: '0',
				right: '0',
			}}
		>
			{isAuth && !vMode && (
				<>
					<Button
						title='добавить в сложные'
						disabled={
							el.hasOwnProperty('userWord') && el.userWord.optional.isHard
								? true
								: false
						}
						variant='outline-info'
						onClick={() => {
							buttonHandler(el, 'hard');
						}}
					>
						<LightningFill color='yellow' size={20} />
					</Button>
					<Button
						title='удалить'
						id='delete'
						variant='outline-info'
						onClick={() => buttonHandler(el, 'delete')}
					>
						<X color='red' size={20} />
					</Button>
				</>
			)}
			{vMode && (value === 1 || value === 2) && (
				<Button
					variant='outline-info'
					onClick={() => buttonHandler(el, 'learn')}
				>
					Восстановить
				</Button>
			)}
			<Button
				title='проиграть аудио'
				variant='outline-info'
				onClick={() =>
					audioHandler([el.audio, el.audioMeaning, el.audioExample], 0)
				}
			>
				<VolumeUp className='text-dark' size={20} />
			</Button>
		</div>
	);
}

export default Buttons;
