import React, { useMemo, useCallback, useEffect } from 'react'
import { IWord } from '../../../interfaces'

interface PaginationProps {
  lvl: number;
  page: number;
  userList: IWord[] | null;
  setPage: (n: number) => void;
  paginationNumbs?: any[];
  buttonHandler?: (expression: boolean) => void;
}
const PaginationHOC = (Component: React.ComponentType<PaginationProps>) => {
  return ({ userList, lvl, page, setPage }: PaginationProps) => {
    const emptyPage = (group: number, page: number) => {
      if (userList) {
        const filteredWords = userList.filter(
          (el: IWord) =>
            group === el.group &&
            page === el.page &&
            el.userWord.optional.isDeleted,
        )
        return filteredWords.length >= 20
      }
    }

    const notActiveList = useMemo(() => {
      console.log('useMemo')
      const notActive = [...Array(30)]
        .map((_, i: number) => (emptyPage(lvl, i) ? i : null))
        .filter((el: number | null) => typeof el === 'number')
      return notActive
    }, [userList])

    const setActivePage = useCallback(
      (page: number, isPlus?: boolean) => {
        if (page < 0) page = 29
        if (page > 29) page = 0
        const findEqualPage = notActiveList.findIndex(
          (el: number | null) => el === page,
        )
        if (findEqualPage !== -1) {
          const newPage = isPlus ? page + 1 : page - 1
          setActivePage(newPage, isPlus)
        } else setPage(page)
      },
      [notActiveList],
    )

    useEffect(() => {
      const pageCheck = notActiveList.findIndex(
        (el: number | null) => el === page,
      )
      if (pageCheck !== -1) setActivePage(page + 1, true)
    }, [userList])

    const buttonHandler = useCallback(
      (expression: boolean): void => {
        switch (expression) {
          case true:
            if (page !== 29) setActivePage(page + 1, expression)
            break
          case false:
            if (page !== 0) setActivePage(page - 1, expression)
            break
        }
      },
      [page],
    )

    const paginationNumbs = useMemo(
      () =>
        [...Array(30)].map((_, i: number, arr: null[]) => {
          const emptyPageCheck = notActiveList.findIndex(
            (el: number | null) => i === el,
          )
          const diggCheck =
            i === page - 1 ||
            i === page ||
            i === page + 1 ||
            (page === 0 && i === page + 2) ||
            (page === arr.length - 1 && i === page - 2)

          return (
            <li
              key={arr.length - i}
              style={{ display: `${diggCheck ? 'inline' : 'none'}` }}
              className={`page-item  
      ${page === i ? 'active' : ''}
      ${emptyPageCheck !== -1 ? 'disabled' : ''}`}
            >
              <button
                className="page-link"
                id={`${i}`}
                onClick={(e: any) => setActivePage(+e.target.id)}
              >
                {i + 1}
              </button>
            </li>
          )
        }),
      [userList, lvl, page, notActiveList],
    )

    return (
      <>
        <Component
          {...{ paginationNumbs, page, buttonHandler, lvl, userList, setPage }}
        />
      </>
    )
  }
}

export default PaginationHOC
