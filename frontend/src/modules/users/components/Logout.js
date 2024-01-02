import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';

import users from '../../users';

const Logout = () => {

    const dispatch = useDispatch();
    const history = useNavigate();

    useEffect(() => {
        dispatch(users.actions.logout());
        history('/');
    });

    return null;

}

export default Logout;