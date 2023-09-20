import { useNavigate } from 'react-router-dom';
import './home.css'

export default function Home() {
    const navigate = useNavigate();

    function search() {
        navigate("/profile")
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
                    <input type="text" placeholder='Search' className='content-input' />
                </div>
                <div className='content-search'>
                    <button onClick={search}>Search</button>
                </div>
            </div>
        </main>
    )
}