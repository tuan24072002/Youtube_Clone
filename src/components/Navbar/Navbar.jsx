import React from 'react'
import './Navbar.scss'
import MenuIcon from '../../assets/menu.png'
import logo from '../../assets/YouTube-Logo.png'
import search from '../../assets/search.png'
import upload from '../../assets/upload.png'
import more from '../../assets/more.png'
import notification from '../../assets/notification.png'
import profile from '../../assets/tuan.png'
import { Link } from 'react-router-dom'
const Navbar = (props) => {
    const { setSidebar } = props
    return (
        <nav className='flex-div'>
            <div className="nav-left flex-div">
                <img className='menu-icon' src={MenuIcon} alt="" onClick={() => setSidebar(prev => !prev)} />
                <Link to={'/Youtube_Clone'}><img className='logo' src={logo} alt="" /></Link>
            </div>

            <div className="nav-middle flex-div">
                <div className="search-box flex-div">
                    <input type="text" placeholder='Search ...' />
                    <img src={search} alt="" />
                </div>
            </div>
            <div className="nav-right flex-div">
                <img src={upload} alt="" />
                <img src={more} alt="" />
                <img src={notification} alt="" />
                <img src={profile} alt="" className='user-icon' />
            </div>
        </nav>
    )
}

export default Navbar