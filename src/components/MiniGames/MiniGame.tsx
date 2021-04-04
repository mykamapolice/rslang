import React, { useEffect, useState } from 'react'
import SavannahGame from './SavannahGame'
import SwojaIgra from './SwojaIgra/SwojaIgra'

interface IMiniGame {
    name: string
}


export default function MiniGame({ match, location }: any) {
//TODO needs to think about it
    console.log(match)
    const { id } = match.params
    console.log(id)

    const selectGameHandler = (id: string) => {
        switch (id) {
            case 'savannah':
                return <SavannahGame/>
            case 'mygame':
                return <SwojaIgra />
        }
    }



    return (
        <div>{"GAME"}</div>
    )

}
