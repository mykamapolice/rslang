import React, { useEffect, useState } from 'react'
import SavannahGame from './SavannahGame'

interface IMiniGame {
    name: string
}

export default function MiniGame({ match, location }: any) {
//TODO needs to think about it
    console.log(match)
    const { id } = match.params

    const selectGameHandler = (id: string) => {
        switch (id) {
            case 'savannah':
                return <SavannahGame/>
        }
    }



    return (
        <div>{"GAME"}</div>
    )

}
