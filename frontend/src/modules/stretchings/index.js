import * as actions from './actions';
import * as actionsTypes from './actionsTypes';
import reducer from './reducer';
import * as selectors from './selectors';

export {default as StretchingsHome} from './components/StretchingsHome';
export {default as StretchingView} from './components/StretchingView';
export {default as AddStretching} from './components/AddStretching';
export {default as UpdateStretching} from './components/UpdateStretching';
export {default as StretchingsHomeByPlayer} from './components/StretchingsHomeByPlayer';
export {default as StretchingsHomeByGame} from './components/StretchingsHomeByGame';
export {default as StretchingsHomeByTraining} from './components/StretchingsHomeByTraining';
export {default as StretchingsHomeByType} from './components/StretchingsHomeByType';

export default {actions, actionsTypes, reducer, selectors};