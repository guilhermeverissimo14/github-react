import './profile.css'
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

interface UserProfile {
    login: string;
    name: string;
    avatar_url: string;
    html_url: string;
    public_repos: number;
    twitter_username?: string;
    blog?: string;
    bio: string;
    followers: string;
    following: string;
    company: string;
    location: string;
    email: string;
}

interface Repository {
    name: string;
    stargazers_count: number;
    html_url: string;
    description: string;
}


export default function Profile() {

    const { username } = useParams<{ username: string }>();
    const [user, setUser] = useState<UserProfile | null>(null);
    const [repos, setRepos] = useState<Repository[]>([]);

    useEffect(() => {
        // Função para buscar dados do usuário na API do GitHub
        const fetchUserData = async () => {
            try {
                const userResponse = await fetch(`https://api.github.com/users/${username}`);
                const userData = await userResponse.json();
                setUser(userData);
            } catch (error) {
                console.error('Erro ao buscar dados do usuário', error);
            }
        };

        // Função para buscar repositórios do usuário na API do GitHub e ordenar por estrelas
        const fetchUserRepos = async () => {
            try {
                const reposResponse = await fetch(`https://api.github.com/users/${username}/repos`);
                const reposData = await reposResponse.json();
                const sortedRepos = reposData.sort((a: Repository, b: Repository) => b.stargazers_count - a.stargazers_count);
                setRepos(sortedRepos);
            } catch (error) {
                console.error('Erro ao buscar repositórios do usuário', error);
            }
        };

        fetchUserData();
        fetchUserRepos();
    }, [username]);



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
                {user && (
                    <div className="card-profile">
                        <div className='header-card'>
                            <img
                               src={user.avatar_url}
                                alt="Avatar"
                            />
                            <div className="title-card-profile">
                                <div className='text-title'>
                                    <h1>{user.name}</h1>
                                </div>
                                <div className='tex-subtitle'>
                                    <h5>{user.login}</h5>
                                </div>
                            </div>
                        </div>
                        <div className='content-card'>
                            <p >
                                {user.bio}
                            </p>
                            <div className="profile-labels">
                                <i className="material-icons search-icon">search</i>
                                <span>{user.followers} seguidores </span>
                            </div>

                            <div className="profile-labels">
                                <i className="material-icons search-icon">search</i>
                                <span>{user.following} seguindo </span>
                            </div>

                            <div className="profile-labels">
                                <i className="material-icons search-icon">search</i>
                                <span>{user.company}</span>
                            </div>

                            <div className="profile-labels">
                                <i className="material-icons search-icon">search</i>
                                <span>{user.location}</span>
                            </div>

                            <div className="profile-labels">
                                <i className="material-icons search-icon">search</i>
                                <span>{user.email}</span>
                            </div>

                            <div className="profile-labels">
                                <i className="material-icons search-icon">search</i>
                                <span>{user.company}</span>
                            </div>
                            <p>
                                <a href={user.html_url} target="_blank" rel="noopener noreferrer">
                                    Perfil no GitHub
                                </a>
                            </p>
                            {user.blog && (
                                <p>
                                    <a href={user.blog} target="_blank" rel="noopener noreferrer">
                                        Site pessoal
                                    </a>
                                </p>
                            )}
                            {user.twitter_username && (
                                <p>
                                    <a href={`https://twitter.com/${user.twitter_username}`} target="_blank" rel="noopener noreferrer">
                                        Twitter
                                    </a>
                                </p>
                            )}
                        </div>
                    </div>
                )}
                <div className='card-repository'>
                    {repos.map((repo) => (
                        <div className="card-content-repository">

                            <Link className='link' to={repo.html_url} target="_blank" rel="noopener noreferrer">
                                {repo.name}
                            </Link>
                            <p>{repo.description}</p>
                            {repo.stargazers_count} estrelas
                        </div>
                    ))}
                </div>
            </main >
        </>
    )
}