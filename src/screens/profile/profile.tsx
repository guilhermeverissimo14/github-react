import './profile.css'
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { differenceInDays } from "date-fns";
import { useNavigate } from 'react-router-dom';

import twiter from "./../../assets/Twitter.png";
import star from "./../../assets/Star.png";
import link from "./../../assets/link.png";
import email from "./../../assets/email.png";
import location from "./../../assets/location.png";
import company from "./../../assets/company.png";
import group from "./../../assets/Group.png";
import heart from "./../../assets/heart.png";


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
    updated_at: Date;
}

interface Date {
    updated_at: string;
}


export default function Profile() {

    const { username } = useParams<{ username: string }>();
    const [user, setUser] = useState<UserProfile | null>(null);
    const [repos, setRepos] = useState<Repository[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Função para buscar dados do usuário na API do GitHub
        const fetchUserData = async () => {
            try {
                const userResponse = await fetch(`https://api.github.com/users/${username}`);
                if (userResponse.status === 404) {
                    // Usuário não encontrado, definir user como null
                    alert("Usuario não encontrado!")
                    setUser(null);
                } else {
                    const userData = await userResponse.json();
                    setUser(userData);
                }
            } catch (error) {
                console.error('Erro ao buscar dados do usuário', error);
            }
        };

        // Função para buscar repositórios do usuário na API do GitHub e ordenar por estrelas.
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


    function back(){
        navigate('/')
    }

    return (
        <>
            <header>
                <div className="title">
                    <h1 className="title-search">Search</h1>
                    <h1 className="title-devs">d_evs</h1>
                </div>
                <div className='btn-back'>
                    <button onClick={back}>Voltar</button>
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
                            <img style={{width:24, height:24, margin:0}} src={group} alt="" />
                                <span>{user.followers} seguidores </span>
                            </div>

                            <div className="profile-labels">
                            <img style={{width:24, height:24, margin:0}} src={heart} alt="" />
                                <span>{user.following} seguindo </span>
                            </div>

                            {user.company && (
                                <div className="profile-labels">
                                   <img style={{width:24, height:24, margin:0}} src={company} alt="" />
                                    <span>{user.company}</span>
                                </div>
                            )}

                            {user.location && (
                                <div className="profile-labels">
                                   <img style={{width:24, height:24, margin:0}} src={location} alt="" />
                                    <span>{user.location}</span>
                                </div>
                            )}

                            {user.email && (
                                <div className="profile-labels">
                                    <img style={{width:24, height:24, margin:0}} src={email} alt="" />
                                    <span>{user.email}</span>
                                </div>
                            )}

                            {user.blog && (
                                <div className="profile-labels">
                                   <img style={{width:24, height:24, margin:0}} src={link} alt="" />
                                    <a href={user.blog} target="_blank" rel="noopener noreferrer">
                                        Site pessoal
                                    </a>
                                </div>
                            )}
                            {user.twitter_username && (
                                <div className="profile-labels">
                                    <img style={{width:24, height:24, margin:0}} src={twiter} alt="" />
                                    <a href={`https://twitter.com/${user.twitter_username}`} target="_blank" rel="noopener noreferrer">
                                        Twitter
                                    </a>
                                </div>
                            )}
                        </div>
                        <div className='btn-contact'>
                            <a href={user.html_url} target="_blank" rel="noopener noreferrer">
                                contato
                            </a>
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
                            <div className='star'>
                            <img style={{width:24, height:24, margin:0}} src={star} alt="" />
                                <span>
                                    {repo.stargazers_count}
                                </span>

                                {repo.updated_at && (
                                    <li className='update'>Atualizado há {differenceInDays(new Date(), new Date(repo.updated_at))} dias atrás</li>
                                )}
                            </div>

                            <div className='line'></div>
                        </div>

                    ))}

                </div>
            </main >
        </>
    )
}