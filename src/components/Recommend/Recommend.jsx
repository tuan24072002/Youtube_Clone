import React, { useCallback, useEffect, useState } from 'react'
import './Recommend.scss'
import axios from 'axios'
import { API_KEY, convert } from '../../utils/data'
import moment from 'moment'
import { Link, useParams } from 'react-router-dom'

const Recommend = (props) => {
    const { categoryId } = useParams();
    const [data, setData] = useState(null)
    const fetchRecommendData = useCallback(async () => {
        const videoList_url = `https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=10&regionCode=VN&videoCategoryId=${categoryId}&key=${API_KEY}`
        axios.get(videoList_url)
            .then(data => {
                if (data && data.data) {
                    setData(data.data);
                }
            })
            .catch(e => console.log(e));
    }, [categoryId])
    useEffect(() => {
        fetchRecommendData();
    }, [fetchRecommendData])
    return (
        <div className='recommend'>
            {
                data && data.items && data.items.length > 0 && data.items.map((item, index) => {
                    return (
                        <Link to={`/Youtube_Clone/video/${item.snippet.channelId}/${item.snippet.categoryId}/${item.id}`} className="side-video-list" key={`recommend_${index}`}>
                            <img src={item?.snippet?.thumbnails?.default?.url} alt="" />
                            <div className="video-info">
                                <h4>{item.snippet.title}</h4>
                                <p>
                                    {item?.snippet?.channelTitle}
                                </p>
                                <p>{convert(item?.statistics?.viewCount)} views &bull; {moment(item?.snippet?.publishedAt).fromNow()}</p>
                            </div>
                        </Link>
                    )
                })
            }
        </div>
    )
}

export default Recommend