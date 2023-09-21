import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './home.css'

export default function Home() {
    const navigate = useNavigate();
    const [username, setusername] = useState("")

    function search() {
        navigate(`/profile/${username}`)
    }

    return (
        <main className="main-home">
            <div className="title">
                <h1 className="title-search">Search</h1>
                <h1 className="title-devs">d_evs</h1>
            </div>
            <div className="container">
                <div className='input-container'>
                    <i className="material-icons search-icon">search</i>
                    <input 
                    type="text" 
                    placeholder='Search'
                     className='content-input'
                     onChange={(e) => setusername(e.target.value)}
                      />
                </div>
                <div className='content-search'>
                    <button onClick={search}>Search</button>
                </div>
            </div>
        </main>
    )
}