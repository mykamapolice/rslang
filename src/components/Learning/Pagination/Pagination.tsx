import React from 'react';

function Pagination({ page, setPage }: any): JSX.Element {
  const paginationNumbs = [...Array(30)].map((_, i: number, arr: any[]) => {
    const diggCheck = i === page - 1 || i === page || i === page + 1 || (page === 0 && i === page + 2) || (page === arr.length - 1 && i === page - 2);
    return (
      <li key={arr.length - i} style={{ display: `${diggCheck ? 'inline' : 'none'}` }} className={`page-item ${page === i ? 'active' : ''}`}>
        <button className="page-link" id={`${i}`} onClick={(e: any) => setPage(+e.target.id)}>{i + 1}</button>
      </li>
    )
  });

  const buttonHandler = (expression:boolean):void => {
    switch (expression) {
      case true:
        if(page!==29)setPage(page+1);
        break;
      case false:
        if(page!==0)setPage(page-1);
        break;
    }
  }
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center">
        <li className={`page-item ${ page===0 ? 'disabled' : '' }`}>
          <button onClick = {()=>buttonHandler(false)} className="page-link" aria-disabled={ page===0 ? 'true' : 'false' }>Previous</button>
        </li>
        {paginationNumbs}
        <li className={`page-item ${ page===29 ? 'disabled' : '' }`}>
          <button onClick = {()=>buttonHandler(true)} className="page-link" aria-disabled={ page===29 ? 'true' : 'false' }>Next</button>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
