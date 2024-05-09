import React, { useCallback, useEffect, useState } from 'react'
import './ListVideo.scss'
import { Link } from 'react-router-dom'
import more from '../../assets/more.svg'
import { API_KEY, convert } from '../../utils/data'
import axios from 'axios'
import moment from 'moment'
import { FaSpinner } from "react-icons/fa";
const Feed = (props) => {
    const { category, loading, setLoading } = props
    const [data, setData] = useState(null)
    const [channelData, setChannelData] = useState([])
    const fetchData = useCallback(async () => {
        setLoading(true)
        const videoList_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2C%20contentDetails%2C%20statistics&chart=mostPopular&maxResults=100&regionCode=vn&videoCategoryId=${category}&key=${API_KEY}`
        axios.get(videoList_url)
            .then(async data => {
                if (data && data.data) {
                    setData(data.data);
                    const videos = data.data.items;
                    for (const video of videos) {
                        const channelData_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${video.snippet.channelId}&key=${API_KEY}`;
                        await axios.get(channelData_url).then(res => { setLoading(false); setChannelData(prev => [...prev, res.data]); }).catch(err => console.log(err))
                    }
                }
            })
            .catch(e => console.log(e));
    }, [category])
    useEffect(() => {
        fetchData();
    }, [fetchData])
    if (loading) {
        return <div className="loading_page">Loading... <FaSpinner className='loading' /></div>
    }
    return (
        <div className="list-video">
            {
                data && data.items && data.items.length > 0 && data.items.map((item, index) => {
                    return (
                        <div className='card' key={index}>
                            <Link to={`/Youtube_Clone/video/${item.snippet.channelId}/${item.snippet.categoryId}/${item.id}`} ><img src={item.snippet.thumbnails.medium.url} alt="" /></Link>
                            <div className="bottom">
                                <Link to={`/Youtube_Clone/video/${item.snippet.channelId}/${item.snippet.categoryId}/${item.id}`} className='content'>
                                    <div className="creator">
                                        {
                                            channelData && channelData.length > 0 && <img src={channelData[index]?.items[0]?.snippet?.thumbnails?.default?.url} alt="" />
                                        }
                                    </div>
                                    <div className="info">
                                        <h2>{item.snippet.title}</h2>
                                        <h3>{item.snippet.channelTitle}</h3>
                                        <p>{convert(item.statistics.viewCount)} views &bull; {moment(item.snippet.publishedAt).fromNow()}</p>
                                    </div>
                                </Link>
                                <div className="more">
                                    <img src={more} alt="" />
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>

    )
}

export default Feed