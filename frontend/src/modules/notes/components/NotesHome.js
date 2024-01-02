import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import * as actions from '../actions';
import {useDispatch} from 'react-redux';
import {FormattedMessage} from 'react-intl';

import * as selectors from '../selectors';
import {useParams} from 'react-router-dom';
import Notes from './Notes';
import {Errors} from '../../common';

const NotesHome = () => {
    const {playerId} = useParams();
    const {id} = useParams();
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [backendErrors, setBackendErrors] = useState(null);
    let form;
    const notes = useSelector(selectors.getNotes);
    const dispatch = useDispatch();
    const history = useNavigate();

    // const handleFindNotesByPlayerAndDates = (startDate, endDate, dispatch, history) => {
    //     dispatch(actions.findNotesByPlayerAndDates(playerId, startDate, endDate));
    // }

    const handleSubmit = event => {
        event.preventDefault();
        if (form.checkValidity()) {

            dispatch(actions.findNotesByPlayerAndDates(
                playerId, startDate, endDate,
                errors => setBackendErrors(errors),
            ));

        } else {
            setBackendErrors(null);
            form.classList.add('was-validated');
        }
    }

    return(
        <div>
            <div>
                {/* <div>

                    <div className="col-md-8">
                        <input id="date" type="date" value={startDate}/>
                        <input id="date" type="date" value={endDate}/>
                            <button className="btn addplayer" onClick={() => handleFindNotesByPlayerAndDates(startDate, endDate, dispatch, history)}>Add New Lesion</button>
                    </div>

                </div> */}

                <div>
                    <Errors errors={backendErrors} onClose={() => setBackendErrors(null)}/>
                    <div className="">
                        <div>
                            <form ref={node => form = node}
                                className="needs-validation" noValidate 
                                onSubmit={e => handleSubmit(e)}>
                                <div>
                                    <div className="col-md-6">
                                        <input type="date" id="startDate" className="form-control"
                                            value={startDate}
                                            onChange={e => setStartDate(e.target.value)}
                                            autoFocus
                                            required/>
                                        <div className="invalid-feedback">
                                            <FormattedMessage id='project.global.validator.required'/>
                                        </div>
                                        <input type="date" id="endDate" className="form-control"
                                            value={endDate}
                                            onChange={e => setEndDate(e.target.value)}
                                            autoFocus
                                            required/>
                                        <div className="invalid-feedback">
                                            <FormattedMessage id='project.global.validator.required'/>
                                        </div>
                                        <div className="">
                                            <button type="submit" className="btn btn-primary">
                                            <FormattedMessage id='project.global.buttons.find'/>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>





            </div>
            <div>
                <Notes notes={notes.notes} playerId={playerId} id={id}/>
            </div>
        </div>

    );
}

export default NotesHome;