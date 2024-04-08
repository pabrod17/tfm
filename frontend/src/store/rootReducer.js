import {combineReducers} from 'redux';

import app from '../modules/app';
import users from '../modules/users';
import teams from '../modules/teams';
import seasons from '../modules/seasons';
import players from '../modules/players';
import lesion from '../modules/lesion';
import notes from '../modules/notes';
import plays from '../modules/plays';
import trainings from '../modules/trainings';
import games from '../modules/games';
import statistics from '../modules/statistics';
import stretchings from '../modules/stretchings';
import exercises from '../modules/exercises';
import events from '../modules/events';

const rootReducer = combineReducers({
    app: app.reducer,
    users: users.reducer,
    teams: teams.reducer,
    seasons: seasons.reducer,
    players: players.reducer,
    lesion: lesion.reducer,
    notes: notes.reducer,
    plays: plays.reducer,
    trainings: trainings.reducer,
    games: games.reducer,
    statistics: statistics.reducer,
    stretchings: stretchings.reducer,
    exercises: exercises.reducer,
    events: events.reducer
});

export default rootReducer;
