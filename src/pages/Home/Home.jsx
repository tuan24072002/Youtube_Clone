import React from 'react'
import './Home.scss'
import Sidebar from '../../components/Sidebar/Sidebar'
import ListVideo from '../../components/ListVideo/ListVideo'


const Home = (props) => {
    const { sidebar, category, setCategory } = props
    return (
        <>
            <Sidebar sidebar={sidebar} category={category} setCategory={setCategory} />
            <div className={`container ${!sidebar && 'large-container'}`}>
                <ListVideo category={category} />
            </div>
        </>
    )
}

export default Home