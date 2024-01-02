import React from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';
import users from '../../users';
import logo1 from './logo1.png';

const Header = () => {

    const userName = useSelector(users.selectors.getUserName);

    return (

        <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
            <a className="logo" href="/"><img src={logo1} alt="description"></img></a>


            <Link className=" nav-link centrado" to="/">TeamHub</Link>
            {/* <Link className=" nav-link " to="/">Teams</Link>
            <Link className=" nav-link " to="/">Seasons</Link> */}
            {/* <div className="wrapper">
                <ul>
                    <li><Link className=" nav-link" to="/">Teams</Link>
                            <ul>
                                <li><Link className=" nav-link link-color" to="/">AddTeam</Link></li>
                                <li><Link className=" nav-link link-color" to="/">UpdateTeam</Link></li>
                                <li><Link className=" nav-link link-color" to="/">RemoveTeam</Link></li>
                                <li><Link className=" nav-link link-color" to="/">Find</Link>
                                    <ul>
                                        <li><Link className=" nav-link link-color" to="/">ByName</Link></li>
                                        <li><Link className=" nav-link link-color" to="/teams/all/result">AllTeams</Link></li>
                                    </ul>
                                </li>
                            </ul>
                    </li>
                    <li><Link className=" nav-link" to="/">Seasons</Link>
                            <ul>
                                <li><Link className=" nav-link link-color" to="/">AddSeason</Link></li>
                                <li><Link className=" nav-link link-color" to="/">UpdateSeason</Link></li>
                                <li><Link className=" nav-link link-color" to="/">RemoveSeason</Link></li>
                                <li><Link className=" nav-link link-color" to="/">Find</Link>
                                    <ul>
                                        <li><Link className=" nav-link link-color" to="/">ByDates</Link></li>
                                        <li><Link className=" nav-link link-color" to="/">AllSeasons</Link></li>
                                    </ul>
                                </li>
                            </ul>
                    </li>
                </ul>
            </div> */}


            <button className="navbar-toggler" type="button" 
                data-toggle="collapse" data-target="#navbarSupportedContent" 
                aria-controls="navbarSupportedContent" aria-expanded="false" 
                aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">

                <ul className="navbar-nav mr-auto">
                </ul>
                
                <ul className="navbar-nav mr-auto">

                </ul>
                {userName ? 

                <ul className="navbar-nav">
                
                    <li className="nav-item dropdown">

                        <a className="dropdown-toggle nav-link" href="/"
                            data-toggle="dropdown">
                            <span className="fas fa-user"></span>&nbsp;
                            {userName}
                        </a>
                        <div className="dropdown-menu dropdown-menu-right">
                            <Link className="dropdown-item" to="/users/update-profile">
                                <FormattedMessage id="project.users.UpdateProfile.title"/>
                            </Link>
                            <Link className="dropdown-item" to="/users/change-password">
                                <FormattedMessage id="project.users.ChangePassword.title"/>
                            </Link>
                            <div className="dropdown-divider"></div>
                            <Link className="dropdown-item" to="/users/logout">
                                <FormattedMessage id="project.app.Header.logout"/>
                            </Link>
                        </div>

                    </li>

                </ul>
                
                :

                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link link-color" to="/users/login">
                            <FormattedMessage id="project.users.Login.title"/>
                        </Link>
                    </li>
                </ul>
                
                }

            </div>
        </nav>

    );

};

export default Header;
