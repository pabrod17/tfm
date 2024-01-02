import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';

import {Errors} from '../../common';
import * as actions from '../actions';
import * as selectors from '../selectors';
import {useParams} from 'react-router-dom';

const UpdateGame = () => {
    const game = useSelector(selectors.getOneGame);
    const {id} = useParams();

    const dispatch = useDispatch();
    const history = useNavigate();
    const [gameDate , setGameDate ] = useState(game.gameDate);
    const [rival , setRival ] = useState(game.rival);
    const [backendErrors, setBackendErrors] = useState(null);
    let form;

    const handleSubmit = event => {

        event.preventDefault();
    
        if (form.checkValidity()) {
            
            dispatch(actions.updateGame(game.id, gameDate, rival.trim(),
            () => reloadWindow(),
            errors => setBackendErrors(errors),
            ));
        } else {
            setBackendErrors(null);
            form.classList.add('was-validated');
            }
        }
        const reloadWindow = () =>{
            history('/games/home');
            window.location.reload('true');
        }

        return(

            <div>
                <Errors errors={backendErrors} onClose={() => setBackendErrors(null)}/>
                <div className="card bg-light border-dark centrado-update-add">
                    <h5 className="card-header">
                    <FormattedMessage id="project.games.fields.updateGame"/>
                    </h5>
                    <div className="card-body">
                        <form ref={node => form = node} 
                            className="needs-validation" noValidate onSubmit={e => handleSubmit(e)}>
                            <div className="form-group row">
                            <label htmlFor="gameDate" className="col-md-4 col-form-label">
                            <FormattedMessage id="project.games.fields.date"/>
                            </label>
                            <div className="col-md-8">
                                <input type="date" id="gameDate" className="form-control"
                                    value={gameDate}
                                    onChange={e => setGameDate(e.target.value)}
                                    autoFocus
                                    required/>
                                <div className="invalid-feedback">
                                    <FormattedMessage id='project.global.validator.required'/>
                                </div>
                            </div>
                        </div>
                            <div className="form-group row">
                                <label htmlFor="rival" className="col-md-12 col-form-label">
                                <FormattedMessage id="project.games.fields.rival"/>
                                </label>
                                <div className="col-md-12">
                                    <textarea  type="text" id="rival" className="form-control"
                                        value={rival}
                                        onChange={e => setRival(e.target.value)}
                                        autoFocus
                                        required/>
                                    <div className="invalid-feedback">
                                        <FormattedMessage id='project.global.validator.required'/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="offset-md-8 col-md-1">
                                    <button type="submit" className="btn btn-primary">
                                        <FormattedMessage id="project.global.buttons.save"/>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
}

export default UpdateGame;