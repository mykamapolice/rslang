import React from 'react';
import Buttons from './Buttons/Buttons';

function BaseInfo({
	el,
	cardColor,
	baseUrl,
	isAuth,
	vMode,
	buttonHandler,
	value,
	audioHandler,
}: any): JSX.Element {
	const buttonProps = { el, isAuth, vMode, buttonHandler, value, audioHandler };

	return (
		<div
			className='card mx-3 mb-3 pb-3 animated'
			style={{ backgroundColor: 'transparent', border: 'none' }}
		>
			<div className='cart3d'>
				<div className='front' style={cardColor}>
					<img
						className='card-img-top img-fluid'
						style={{ height: '200px', objectFit: 'cover' }}
						src={`${baseUrl}${el.image}`}
						alt='х'
					/>
					<div
						className='card-title'
						style={{
							color: '#355070',
							fontSize: '20px',
							marginBottom: '0',
						}}
					>
						{el.word}
					</div>
					<div style={{ fontSize: '14px' }}>{el.transcription}</div>
					<div
						style={{ fontSize: '14px' }}
						dangerouslySetInnerHTML={{ __html: el.textMeaning }}
					/>
				</div>
				<div className='back' style={cardColor}>
					<div className='card-body fs-4'>
						<div
							className='card-title'
							style={{
								color: '#355070',
								fontSize: '20px',
								marginBottom: '0',
							}}
						>
							{el.wordTranslate}
						</div>
						<div style={{ fontSize: '14px' }}>{el.textMeaningTranslate}</div>
						<div
							style={{ fontSize: '14px' }}
							dangerouslySetInnerHTML={{ __html: el.textExample }}
						/>
						<div
							style={{ fontSize: '14px' }}
							dangerouslySetInnerHTML={{
								__html: el.textExampleTranslate,
							}}
						/>
					</div>
					<Buttons {...buttonProps} />
				</div>
			</div>
		</div>
	);
}

export default BaseInfo;
