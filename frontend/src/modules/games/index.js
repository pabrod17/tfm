import * as actions from './actions';
import * as actionsTypes from './actionsTypes';
import reducer from './reducer';
import * as selectors from './selectors';

export {default as GamesHome} from './components/GamesHome';
export {default as AddGame} from './components/AddGame';
export {default as GameView} from './components/GameView';
export {default as UpdateGame} from './components/UpdateGame';
export {default as UpdateGameStretching} from './components/UpdateGameStretching';
export {default as UpdateGameExercise} from './components/UpdateGameExercise';
export default {actions, actionsTypes, reducer, selectors};