import * as actions from './actions';
import * as actionsTypes from './actionsTypes';
import reducer from './reducer';
import * as selectors from './selectors';

export {default as TrainingHome} from './components/TrainingHome';
export {default as AddTraining} from './components/AddTraining';
export {default as TrainingView} from './components/TrainingView';
export {default as UpdateTraining} from './components/UpdateTraining';
export {default as UpdateTrainingStretching} from './components/UpdateTrainingStretching';
export {default as UpdateTrainingExercise} from './components/UpdateTrainingExercise';
export {default as UpdateTrainingPlayer} from './components/UpdateTrainingPlayer';

export default {actions, actionsTypes, reducer, selectors};