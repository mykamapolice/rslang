import React from 'react';
import Buttons from './Buttons/Buttons';
import { PatchCheckFill, PatchMinusFill } from 'react-bootstrap-icons';
import { useSelector } from 'react-redux';

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
	const { isViewTranslate } = useSelector((state: any) => state.settings);
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
							{isViewTranslate && el.wordTranslate}
						</div>
						<div style={{ fontSize: '14px' }}>
							{isViewTranslate && el.textMeaningTranslate}
						</div>
						<div
							style={{ fontSize: '14px' }}
							dangerouslySetInnerHTML={{ __html: el.textExample }}
						/>
						{isViewTranslate && (
							<div
								style={{ fontSize: '14px' }}
								dangerouslySetInnerHTML={{
									__html: el.textExampleTranslate,
								}}
							/>
						)}
					</div>
					<div className='d-flex justify-content-center'>
						<div title='Угадано'>
							<PatchCheckFill color='#06d6a0' size={30} />
							<span className='text-info mx-3'>{`${
								el.userWord?.optional?.wins ? el.userWord?.optional?.wins : 0
							} `}</span>
						</div>
						<div title='Не угадано'>
							<PatchMinusFill color='#ef476f' size={30} />
							<span className='text-info mx-3'>{`${
								el.userWord?.optional?.loses ? el.userWord?.optional?.loses : 0
							}`}</span>
						</div>
					</div>

					<Buttons {...buttonProps} />
				</div>
			</div>
		</div>
	);
}

export default BaseInfo;
