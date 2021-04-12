import React from 'react';
import { ChevronLeft, ChevronRight } from 'react-bootstrap-icons';
import PaginationHOC from './PaginationHOC';

const Pagination = ({ paginationNumbs, page, buttonHandler }: any) => {
	console.log('pagination');

	return (
		<nav aria-label='Page navigation example'>
			<ul
				className='pagination'
				style={{ marginTop: '0', marginBottom: '0', justifyContent: 'center' }}
			>
				<li className={`page-item ${page === 0 ? 'disabled' : ''}`}>
					<button
						onClick={() => buttonHandler(false)}
						className='page-link'
						aria-disabled={page === 0 ? 'true' : 'false'}
					>
						<ChevronLeft />
					</button>
				</li>
				{paginationNumbs}
				<li className={`page-item ${page === 29 ? 'disabled' : ''}`}>
					<button
						onClick={() => buttonHandler(true)}
						className='page-link'
						aria-disabled={page === 29 ? 'true' : 'false'}
					>
						<ChevronRight />
					</button>
				</li>
			</ul>
		</nav>
	);
};

export default PaginationHOC(Pagination);
