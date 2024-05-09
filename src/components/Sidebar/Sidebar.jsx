import React, { useState } from 'react'
import './Sidebar.scss'
import home from '../../assets/home.png'
import shorts from '../../assets/shorts.png'
import game from '../../assets/game_icon.png'
import sport from '../../assets/sports.png'
import entertainment from '../../assets/entertainment.png'
import tech from '../../assets/tech.png'
import music from '../../assets/music.png'
import blogs from '../../assets/blogs.png'
import news from '../../assets/news.png'
import tuan from '../../assets/tuan.png'
import sontung from '../../assets/sontung.png'
import beast from '../../assets/mrbeast.png'
import hoidanit from '../../assets/hoidanit.png'
import lama from '../../assets/lama.png'
import GreatStack from '../../assets/GreatStack.png'
import { useNavigate } from 'react-router-dom'

const Sidebar = (props) => {
    const navigate = useNavigate()
    const { sidebar, category, setCategory } = props
    const [showMore, setShowMore] = useState(false)
    const handleChooseCategory = (categoryId) => {
        navigate('/Youtube_Clone')
        setCategory(categoryId)
    }
    return (
        <div className={`sidebar ${!sidebar && 'small-sidebar'}`}>
            <div className="sortcut-links">
                <div className={`side-link ${category === 0 && 'active'}`} onClick={() => handleChooseCategory(0)}>
                    <img src={home} alt="" />
                    <p>Home</p>
                </div>
                {/* <div className={`side-link ${category === 42 && 'active'}`} onClick={() => setCategory(42)}>
                    <img src={shorts} alt="" />
                    <p>Shorts</p>
                </div> */}
                <div className={`side-link ${category === 10 && 'active'}`} onClick={() => handleChooseCategory(10)}>
                    <img src={music} alt="" />
                    <p>Music</p>
                </div>
                <div className={`side-link ${category === 20 && 'active'}`} onClick={() => handleChooseCategory(20)}>
                    <img src={game} alt="" />
                    <p>Gaming</p>
                </div>
                {
                    showMore &&
                    <>
                        <div className={`side-link ${category === 17 && 'active'}`} onClick={() => handleChooseCategory(17)}>
                            <img src={sport} alt="" />
                            <p>Sports</p>
                        </div>
                        <div className={`side-link ${category === 24 && 'active'}`} onClick={() => handleChooseCategory(24)}>
                            <img src={entertainment} alt="" />
                            <p>Entertainment</p>
                        </div>
                        <div className={`side-link ${category === 28 && 'active'}`} onClick={() => handleChooseCategory(28)}>
                            <img src={tech} alt="" />
                            <p>Technology</p>
                        </div>
                        <div className={`side-link ${category === 22 && 'active'}`} onClick={() => handleChooseCategory(22)}>
                            <img src={blogs} alt="" />
                            <p>Blogs</p>
                        </div>
                        <div className={`side-link ${category === 25 && 'active'}`} onClick={() => handleChooseCategory(25)}>
                            <img src={news} alt="" />
                            <p>News</p>
                        </div>
                    </>
                }
                <div className="show-more" onClick={() => setShowMore(!showMore)}>
                    <p>{showMore ? 'Hide' : 'Show'} more ...</p>
                </div>
                <hr />
            </div>
            <div className="subcribed-list">
                <h3>Subcribed</h3>
                <div className="side-link">
                    <img src={tuan} alt="" />
                    <p>Tuấn Official</p>
                </div>
                <div className="side-link">
                    <img src={sontung} alt="" />
                    <p>Sơn Tùng M-TP</p>
                </div>
                <div className="side-link">
                    <img src={beast} alt="" />
                    <p>MrBeast</p>
                    <p></p>
                </div>
                <div className="side-link">
                    <img src={hoidanit} alt="" />
                    <p>Hỏi Dân IT</p>
                </div>
                <div className="side-link">
                    <img src={lama} alt="" />
                    <p>Lama Dev</p>
                </div>
                <div className="side-link">
                    <img src={GreatStack} alt="" />
                    <p>GreatStack</p>
                </div>
            </div>
        </div>
    )
}

export default Sidebar