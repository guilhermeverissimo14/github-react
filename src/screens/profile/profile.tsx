import './profile.css'
export default function Profile() {
    return (
        <>
            <header>
                <div className="title">
                    <h1 className="title-search">Search</h1>
                    <h1 className="title-devs">d_evs</h1>
                </div>
                <div className='input-search'>
                    <i className="material-icons search-icon">search</i>
                    <input type="text" placeholder='Search' />
                </div>
            </header>
            <main className='main-profile'>
                <div className="card-profile">
                    <div className='header-card'>
                        <img
                            mat-card-avatar
                            alt="Avatar"
                        />
                        <div className="title-card-profile">
                            <div className='text-title'>
                                <h1>Gabriel Ávila Rangel</h1>
                            </div>
                            <div className='tex-subtitle'>
                                <h5>gabrielrangel95</h5>
                            </div>
                        </div>
                    </div>
                    <div className='content-card'>
                        <p >
                            React Native, React and Node.js Developer - SevenApps Founder - BestBarbers Cofounder
                        </p>
                        <div className="profile-labels">
                            <i className="material-icons search-icon">search</i>
                            <span> seguidores </span>
                        </div>

                        <div className="profile-labels">
                            <i className="material-icons search-icon">search</i>
                            <span> seguindo </span>
                        </div>

                        <div className="profile-labels">
                            <i className="material-icons search-icon">search</i>
                            <span>SevenApps</span>
                        </div>
                    </div>
                </div>
                <div className='card-repository'>
                    <div className="card-content-repository">
                        <a target="_blank">
                            roadmap-backend-2023
                        </a>
                        <p>Technologies that you must know to be a back-end developer (Node.js) in 2023</p>
                    </div>
                </div>
            </main >
        </>
    )
}