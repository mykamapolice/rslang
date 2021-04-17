import React from 'react'
import './VideoContainer.css'
import ReactPlayer from 'react-player'

function VideoContainer() {
    return (
            <div className='wrapper'>
                <ReactPlayer
                    className='player'
                    controls
                    url={'https://www.youtube.com/watch?v=oZzW1Evz_tQ'}
                    width='100%'
                    height='100%'
                />
            </div>
    )
}

export default VideoContainer
