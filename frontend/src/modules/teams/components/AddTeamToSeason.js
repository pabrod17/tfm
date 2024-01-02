import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import {useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {FormattedDate} from 'react-intl';

import * as selectors from '../selectors';
import * as selectorsSeasons from '../../seasons/selectors';
import {Errors} from '../../common';
import * as actions from '../actions';
import * as actionsSeasons from '../../seasons/actions';
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from 'reactstrap';

//dispatch(actions.addTeamToSeason(seasonId, teamId, () => history('/')));

//dos botones desplegables TEAMS and Seasons. Y un boton AddTeamToSeason



const AddTeamToSeason = () => {
    const dispatch = useDispatch();
    const history = useNavigate();
    const [dropdownTeams, setDropdownTeams] = useState(false);
    const [dropdownSeasons, setDropdownSeasons] = useState(false);
    const [seasonId, setSeasonId] = useState(null);
    const [teamId, setTeamId] = useState(null);
    const [backendErrors, setBackendErrors] = useState(null);
    let form;

    // const openCloseDropdownTeams = () => {
    //     setDropdownTeams(!dropdownTeams);
    // }

    // const openCloseDropdownSeasons = () => {
    //     setDropdownSeasons(!dropdownSeasons);
    // }

    // const handleAddTeamToSeason = (seasonId, teamId, dispatch, history) => {
    //     dispatch(actions.addTeamToSeason(seasonId, teamId, () => history('/teams/all/result')));
    //     window.location.reload('true');
    //   }

    const teams = useSelector(selectors.getAllTeams);
    const seasons = useSelector(selectorsSeasons.getAllSeasons);

    const teamsList = teams.teams;
    const seasonsList = seasons.seasons;

    if(!teamsList || !seasonsList) {
        dispatch(actions.findAllTeams());
        dispatch(actionsSeasons.findAllSeasons());
        return "Loading...";
    }


    const handleSubmit = event => {

        event.preventDefault();
    
        if (form.checkValidity()) {
                dispatch(actions.addTeamToSeason(seasonId,teamId,
                    () => reloadWindow(),
                    errors => setBackendErrors(errors),
                    ));
        } else {
            setBackendErrors(null);
            form.classList.add('was-validated');
            }
        }
        const reloadWindow = () =>{
            history('/teams/all/result');
            window.location.reload('true');
        }





    return(


            <div>
                <Errors errors={backendErrors} onClose={() => setBackendErrors(null)}/>
                <div className="card bg-light text-white border-dark bg-dark centrado-update-add text-center">
                    <h5 className="card-header">
                    <FormattedMessage id="project.teams.fields.addTeamToSeason"/>
                    </h5>
                    <div className="card-body">
                        <form ref={node => form = node} 
                            className="needs-validation" noValidate onSubmit={e => handleSubmit(e)}>
                            <div class="dropdown">
                            <button class="btn-player draw-border"><FormattedMessage id="project.teams.fields.team"/></button>
                                        <div class="dropdown-content">
                                        {teamsList.map(team => 
                                                    <a type="button" onClick={() => setTeamId(team.id)}> 
                                                        {team.id} : {"  "}{team.teamName}
                                                    </a>)}
                                        </div>
                            </div>
                            <div class="dropdown">
                            <button class="btn-player draw-border"><FormattedMessage id="project.seasons.fields.season"/></button>
                                        <div class="dropdown-content">
                                        {seasonsList.map(season => 
                                                    <a type="button" onClick={() => setSeasonId(season.id)}> 
                                                        {season.id} : {"  "}{season.calendario}
                                                    </a>)}
                                        </div>
                            </div>
                            <div className="form-group row">
                                <div className="offset-md-4 col-md-1">
                                    <button type="submit" className="btn btn-primary">
                                        <FormattedMessage id="project.global.buttons.save"/>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>



        // <div>
        //     <div>
                
                
                
        //         <Dropdown className="dropDown-teams" isOpen={dropdownTeams} toggle={openCloseDropdownTeams} size="lg">
        //             <DropdownToggle caret className="btn--primary ">
        //             <FormattedMessage id="project.teams.fields.teams"/>
        //             </DropdownToggle>

        //             <DropdownMenu className="ancho-dropdown--teams">
        //                 <DropdownItem header> <FormattedMessage id="project.teams.fields.teams"/>:</DropdownItem>
        //                 <DropdownItem divider></DropdownItem>
        //                 {teamsList.map(team => <
        //                     DropdownItem onClick={() => setTeamId(team.id)}> 
        //                         {team.id} : {"  "}{team.teamName}
        //                     </DropdownItem>)}
        //             </DropdownMenu>

        //         </Dropdown>


        //     </div>




        //     <div>
        //         <Dropdown className="dropDown-seasons" isOpen={dropdownSeasons} toggle={openCloseDropdownSeasons} size="lg">
        //             <DropdownToggle caret className="btn--secundary ">
        //             <FormattedMessage id="project.seasons.fields.seasons"/>
        //             </DropdownToggle>
        //             <DropdownMenu className="ancho-dropdown">
        //                 <DropdownItem header> <FormattedMessage id="project.seasons.fields.seasons"/>:</DropdownItem>
        //                 <DropdownItem divider></DropdownItem>
        //                 {seasonsList.map(season => 
        //                     <DropdownItem onClick={() => setSeasonId(season.id)} > {season.id} :{"  "}<span> 
        //                                                                 <FormattedDate
        //                                                                     value={ season.startDate }
        //                                                                     year="numeric"
        //                                                                     // format='year-only'
        //                                                                 />
        //                                                                 / 
        //                                                                 <FormattedDate
        //                                                                     value={ season.endDate }
        //                                                                     year="numeric"
        //                                                                     // format='year-only'
        //                                                                 /> 
        //                                                         </span>
        //                     </DropdownItem>)}
        //             </DropdownMenu>
        //         </Dropdown>
        //     </div>
        //     <div>
        //         <button className="btn--secundary--seasons" type="button" 
        //             onClick={() => handleAddTeamToSeason(seasonId, teamId, dispatch, history)}>
        //                         <FormattedMessage id="project.global.buttons.save"/>
        //         </button>
        //     </div>
        // </div>
    );
}

export default AddTeamToSeason;