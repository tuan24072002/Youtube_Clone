import React from 'react'
import './Video.scss'
import PlayVideo from '../../components/PlayVideo/PlayVideo'
import Recommend from '../../components/Recommend/Recommend'
import Sidebar from '../../components/Sidebar/Sidebar'
const Video = (props) => {
    const { sidebar, category, setCategory } = props
    return (
        <>
            <Sidebar sidebar={sidebar} category={category} setCategory={setCategory} />
            <div className={`video-container ${!sidebar ? 'large-container' : 'small-container'}`}>
                <PlayVideo sidebar={sidebar} />
                <Recommend />
            </div>
        </>
    )
}

export default Video