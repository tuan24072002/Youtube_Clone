import React, { useCallback, useEffect, useState } from 'react'
import './PlayVideo.scss'
import like from '../../assets/like.png'
import dislike from '../../assets/dislike.png'
import share from '../../assets/share.png'
import save from '../../assets/save.png'
import { API_KEY, convert } from '../../utils/data'
import axios from 'axios'
import numeral from 'numeral'
import moment from 'moment'
import { useParams } from 'react-router-dom'
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

const PlayVideo = (props) => {
    const { setLoading } = props
    const { videoId, channelId } = useParams();
    const [apiData, setApiData] = useState([])
    const [channelData, setChannelData] = useState(null)
    const [commentData, setCommentData] = useState(null)
    const [showComment, setShowComment] = useState(false)
    const fetchVideoData = useCallback(async () => {
        setLoading(true)
        const videoDetail_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2C%20contentDetails%2C%20statistics&id=${videoId}&maxResults=100&regionCode=vn&key=${API_KEY}`
        await axios.get(videoDetail_url).then(res => { setLoading(false); setApiData(res.data); }).catch(err => console.log(err))
    }, [videoId])
    const fetchChannelData = useCallback(async () => {
        setLoading(true)
        const channelData_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${channelId}&key=${API_KEY}`;
        await axios.get(channelData_url).then(res => { setLoading(false); setChannelData(res.data); }).catch(err => console.log(err));
    }, [channelId])
    const fetchCommentData = useCallback(async () => {
        setLoading(true)
        const commentData_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2C%20replies&videoId=${videoId}&key=${API_KEY}`
        await axios.get(commentData_url).then(res => { setLoading(false); setCommentData(res.data); }).catch(err => console.log(err));
    }, [videoId])
    useEffect(() => {
        fetchVideoData()
        fetchChannelData()
        fetchCommentData()
    }, [fetchVideoData, fetchChannelData, fetchCommentData])
    return (
        apiData?.items?.length > 0 && apiData?.items.map((item, index) => {
            return (
                <div className='play-video' key={`play_video_${index}`}>
                    {/* <video src={video} controls autoPlay muted></video> */}
                    <iframe src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                    <h3 className='title'>{item.snippet?.title}</h3>
                    <div className="play-video-info">
                        <div className="publisher">
                            {
                                channelData?.items?.length > 0 && channelData?.items.map((data, idex) => {
                                    return (
                                        <img src={data?.snippet?.thumbnails?.default?.url} alt="" key={`img_creator_${idex}`} />
                                    )
                                })
                            }
                            <div className="creator">
                                <p>
                                    {item.snippet.channelTitle}
                                </p>
                                <span className='subscriber'>{
                                    channelData?.items?.length > 0 && channelData?.items.map((data, idex) => {
                                        return (
                                            <span key={`subcriber_${idex}`} className='subscriber-number'>{convert(data.statistics.subscriberCount)}</span>
                                        )
                                    })
                                } subscriber</span>
                            </div>
                            <button>Subscribe</button>
                        </div>
                        <div className="action">
                            <span><img src={like} alt="" /> {convert(item.statistics.likeCount)}</span>
                            <span><img src={dislike} alt="" /></span>
                            <span><img src={share} alt="" /> Share</span>
                            <span><img src={save} alt="" /> Save</span>
                        </div>
                    </div>

                    <div className="video-description">
                        <div className="item">
                            <p className='info'>{numeral(item.statistics.viewCount).format('0,0')} Views &bull; {moment(item.snippet.publishedAt).fromNow()}
                                <span className='hastag'>
                                    {
                                        item.snippet?.tags && item.snippet?.tags?.length > 0 && item.snippet?.tags.map((value, index) => {
                                            return (
                                                <span key={`hastag_${index}`}>#{value}</span>
                                            )
                                        })
                                    }
                                </span>
                            </p>
                            <p className="info">
                                {item.snippet.localized.description.split('\n').map((line, index) => {
                                    return (
                                        line.startsWith('#') ?
                                            <span key={`description_${index}`} className='hastag'>
                                                {line}
                                                <br />
                                            </span> : line.startsWith('https') ?
                                                <a key={`description_${index}`}>
                                                    {line}
                                                    <br />
                                                </a> :
                                                <span key={`description_${index}`}>
                                                    {line}
                                                    <br />
                                                </span>
                                    )
                                })}
                            </p>
                        </div>
                        <div className="comment_container">
                            <h3 className='title' onClick={() => setShowComment(prev => !prev)}>
                                <span>{numeral(item.statistics.commentCount).format('0,0')} comments</span>
                                <i>
                                    {
                                        showComment ? <IoMdArrowDropup /> : <IoMdArrowDropdown />
                                    }
                                </i>
                            </h3>
                            {
                                commentData && commentData.items && commentData.items.length > 0 && commentData.items.map((cmt, cmtId) => {
                                    return (
                                        showComment && <div className="comment" key={`comment_${cmtId}`}>
                                            <img src={cmt.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="" />
                                            <div className="info">
                                                <h3>{cmt.snippet.topLevelComment.snippet.authorDisplayName} <span>{moment(cmt.snippet.topLevelComment.snippet.publishedAt).fromNow()}</span></h3>
                                                <p>{cmt.snippet.topLevelComment.snippet.textDisplay}</p>
                                                <div className="comment-action">
                                                    <img src={like} alt="" />
                                                    <span>{convert(cmt.snippet.topLevelComment.snippet.likeCount)}</span>
                                                    <img src={dislike} alt="" />
                                                    <span className='reply'>Trả lời</span>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            )
        })
    )
}

export default PlayVideo