import React from 'react';

function Lvl({lvl,setLvl,levels}:any) {

  const lvlMapper = levels.map((elLvl: string, i: number, arr: string[]) => (
    <label key={arr.length - i} className={`btn btn-outline-primary ${levels.findIndex((el:string) => el === elLvl) === lvl ? 'active' : ''}`} htmlFor={`${i}`}>
      <input style={{ position: 'absolute', opacity: 0 }} type="radio" className="btn-check" name="btnradio" id={`${i}`} onClick={(e: any) => setLvl(+e.target.id)} autoComplete="off" />
      {elLvl}
    </label>
))
  return (
            <div className = "mr-2">
            {lvlMapper}
            </div>
  );
}


export default Lvl;
