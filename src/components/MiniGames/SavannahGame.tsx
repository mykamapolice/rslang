import React, { useState } from 'react'

const levels: string[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']
const baseUrl: string = 'https://rs-lang-rs-team-41.herokuapp.com/'
const fetching = async (url: string) => {
    return await fetch(url).then(res => res.json())
}


export default function SavannahGame() {

    const [lvl, setLvl] = useState(0)
    const [words, setWords] = useState([])

    const radioButtonHandler = (): void => {
        fetching(`${baseUrl}words?page=${0}&group=${lvl}`).then((data: []) => {
            console.log(data)
            setWords(data)
        })
    }

    React.useEffect(() => {
        radioButtonHandler()
    }, [lvl])


    const cardBuilder = levels.map((lvl: string, i: number, arr: string[]) => (
        <>
            <input type="radio" className="btn-check" name="btnradio" id={`${i}`}
                   onClick={(e: any) => setLvl(e.target.id)} autoComplete="off"/>
            <label key={arr.length - i} className="btn btn-outline-primary" htmlFor={`${i}`}>
                {lvl}
            </label>
        </>
    ))

    const randomTranslations = words.map(({ wordTranslate }) => wordTranslate);

    return (<>
        <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
            {cardBuilder}
        </div>
        <div className="savanna-game col-lg-12">
            {randomTranslations.map((rt,i)=><div>{i+1}. {rt}</div>)}
        </div>
    </>)
}
