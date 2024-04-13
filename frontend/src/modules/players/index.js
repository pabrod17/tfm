import * as actions from './actions';
import * as actionsTypes from './actionsTypes';
import reducer from './reducer';
import * as selectors from './selectors';

export {default as PlayersHome} from './components/PlayersHome';
export {default as UpdatePlayer} from './components/UpdatePlayer';
export {default as AddPlayer} from './components/AddPlayer';
export {default as PlayerView} from './components/PlayerView';
export {default as FindPlayerByDni} from './components/FindPlayerByDni';
export {default as FindPlayerByDniResult} from './components/FindPlayerByDniResult';
export {default as FindPlayersByCompletedName} from './components/FindPlayersByCompletedName';
export {default as FindPlayersByTraining} from './components/FindPlayersByTraining';
export {default as FindPlayersByGame} from './components/FindPlayersByGame';
export {default as UpdatePlayerTeam} from './components/UpdatePlayerTeam';

export default {actions, actionsTypes, reducer, selectors};
