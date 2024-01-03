import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';

import Header from './Header';
import Body from './Body';
import Footer from './Footer';
import users from '../../users';
import './Hero.css';
import canastaRed from './canastaRed.jpg';

const App = () => {

    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(users.actions.tryLoginFromServiceToken(
            () => dispatch(users.actions.logout())));
    
    });

    return (
        <div>
            <Router>
                <div>
                    <Header/>
                    <Body/>
                </div>
            </Router>
            {/* <Footer/> */}
        </div>
    );

}
    
export default App;