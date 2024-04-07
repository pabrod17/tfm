import {init} from './appFetch';
import * as userService from './userService';
import * as teamService from './teamService';
import * as seasonService from './seasonService';
import * as playerService from './playerService';
import * as lesionService from './lesionService';
import * as noteService from './noteService';
import * as playService from './playService';
import * as trainingService from './trainingService';
import * as gameService from './gameService';
import * as statisticsService from './statisticsService';
import * as stretchingService from './stretchingService';
import * as exerciseService from './exerciseService';
import * as eventService from './eventService';

export {default as NetworkError} from "./NetworkError";

export default {init, userService, teamService, seasonService, playerService, lesionService, noteService, playService, trainingService, gameService, statisticsService, stretchingService, exerciseService, eventService};
