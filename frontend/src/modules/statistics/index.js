import * as actions from './actions';
import * as actionsTypes from './actionsTypes';
import reducer from './reducer';
import * as selectors from './selectors';

export {default as AddGameStatistics} from './components/AddGameStatistics';
export {default as FindGameStatistics} from './components/FindGameStatistics';
export {default as UpdateGameStatistics} from './components/UpdateGameStatistics';
export {default as AddPlayerGameStatistics} from './components/AddPlayerGameStatistics';
export {default as FindPlayerGameStatistics} from './components/FindPlayerGameStatistics';
export {default as UpdatePlayerGameStatistics} from './components/UpdatePlayerGameStatistics';
export {default as StatisticsHome} from './components/StatisticsHome';
export {default as UpdateStatisticsGame} from './components/UpdateStatisticsGame';
export {default as UpdateStatisticsPlayers} from './components/UpdateStatisticsPlayers';
export {default as UpdateStatisticsGamePlayer} from './components/UpdateStatisticsGamePlayer';

export default {actions, actionsTypes, reducer, selectors};