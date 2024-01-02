import * as actions from './actions';
import * as actionsTypes from './actionsTypes';
import reducer from './reducer';
import * as selectors from './selectors';

export {default as ExercisesHome} from './components/ExercisesHome';
export {default as AddExercise} from './components/AddExercise';
export {default as UpdateExercise} from './components/UpdateExercise';
export {default as ExerciseView} from './components/ExerciseView';
export {default as ExercisesHomeByTraining} from './components/ExercisesHomeByTraining';
export {default as ExercisesHomeByGame} from './components/ExercisesHomeByGame';
export {default as ExercisesHomeByType} from './components/ExercisesHomeByType';

export default {actions, actionsTypes, reducer, selectors};