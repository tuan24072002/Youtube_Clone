import React from 'react'
import './Video.scss'
import PlayVideo from '../../components/PlayVideo/PlayVideo'
import Recommend from '../../components/Recommend/Recommend'
import Sidebar from '../../components/Sidebar/Sidebar'
import { FaSpinner } from "react-icons/fa";
const Video = (props) => {
    const { sidebar, category, setCategory, loading, setLoading } = props
    if (loading) {
        return <div className="loading_page">Loading... <FaSpinner className='loading' /></div>
    }
    return (
        <>
            <Sidebar sidebar={sidebar} category={category} setCategory={setCategory} />
            <div className={`video-container ${!sidebar ? 'large-container' : 'small-container'}`}>
                <PlayVideo setLoading={setLoading} />
                <Recommend setLoading={setLoading} />
            </div>
        </>
    )
}

export default Video