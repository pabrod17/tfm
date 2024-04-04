import * as actions from './actions';
import * as actionsTypes from './actionsTypes';
import reducer from './reducer';
import * as selectors from './selectors';

export {default as AddPlay} from './components/AddPlay';
export {default as PlaysHome} from './components/PlaysHome';
export {default as UpdatePlay} from './components/UpdatePlay';
export {default as PlayView} from './components/PlayView';
export {default as PlaysHomeByType} from './components/PlaysHomeByType';

export {default as BoardHome} from './components/BoardHome';

export default {actions, actionsTypes, reducer, selectors};