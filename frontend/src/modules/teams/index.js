import * as actions from './actions';
import * as actionsTypes from './actionsTypes';
import reducer from './reducer';
import * as selectors from './selectors';

export {default as FindTeams} from './components/FindTeams';
export {default as FindTeamsResult} from './components/FindTeamsResult';
export {default as FindTeamByName} from './components/FindTeamByName';
export {default as FindTeamByNameResult} from './components/FindTeamByNameResult';
export{default as AddTeam} from './components/AddTeam';
export{default as UpdateTeam} from './components/UpdateTeam';
export{default as TeamView} from './components/TeamView';
export{default as AddTeamToSeason} from './components/AddTeamToSeason';

export {default as TeamsHome} from './components/TeamsHome';
export {default as UpdateTeamPlay} from './components/UpdateTeamPlay';
export {default as UpdateTeamPlayer} from './components/UpdateTeamPlayer';
export {default as UpdateTeamSeason} from './components/UpdateTeamSeason';
export {default as UpdateTeamTraining} from './components/UpdateTeamTraining';

export default {actions, actionsTypes, reducer, selectors};
