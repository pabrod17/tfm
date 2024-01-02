import React from 'react';
import {useNavigate} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';

const BackLink = () => {

    const history = useNavigate();

    if (history.length <= 2) {
        return null;
    } 
    
    return (

        <button type="button" className="btn btn-link" 
            onClick={() => history.goBack()}>

            <FormattedMessage id='project.global.buttons.back'/>

        </button>

    );

};

export default BackLink;
