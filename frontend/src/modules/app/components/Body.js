import React from 'react';
import {useSelector} from 'react-redux';
import {Route, Routes} from 'react-router-dom';

import AppGlobalComponents from './AppGlobalComponents';
import Home from './Home';
import {Login, SignUp, UpdateProfile, ChangePassword, Logout, UsersByCoachHomeCreate, UsersByAdminHome, UsersByAdminHomeCreate} from '../../users';
import users from '../../users';
import {FindTeamsResult, FindTeams, RemoveTeam, AddTeam, UpdateTeam, TeamView, TeamsHome, UpdateTeamPlay, UpdateTeamPlayer, UpdateTeamSeason, UpdateTeamTraining} from '../../teams';
import video from './video-2.mp4';
import fondoCanasta from './fondoCanasta.jpg';
import FindTeamByName from '../../teams/components/FindTeamByName';
import FindTeamByNameResult from '../../teams/components/FindTeamByNameResult';
import FindSeasons from '../../seasons/components/FindSeasons';
import AddSeason from '../../seasons/components/AddSeason';
import FindSeasonsResult from '../../seasons/components/FindSeasonsResult';
import SeasonView from '../../seasons/components/SeasonView';
import UpdateSeason from '../../seasons/components/UpdateSeason';
import FindSeasonsBetweenTwoDates from '../../seasons/components/FindSeasonsBetweenTwoDates';
import FindSeasonsBetweenTwoDatesResult from '../../seasons/components/FindSeasonsBetweenTwoDatesResult';
import AddTeamToSeason from '../../teams/components/AddTeamToSeason';
import PlayersHome from '../../players/components/PlayersHome';
import UpdatePlayer from '../../players/components/UpdatePlayer';
import AddPlayer from '../../players/components/AddPlayer';
import PlayerView from '../../players/components/PlayerView';
import FindPlayerByDni from '../../players/components/FindPlayerByDni';
import FindPlayerByDniResult from '../../players/components/FindPlayerByDniResult';
import FindPlayersByCompletedName from '../../players/components/FindPlayersByCompletedName';
import FindPlayersByCompletedNameResult from '../../players/components/FindPlayersByCompletedNameResult';
import LesionHome from '../../lesion/components/LesionHome';
import AddLesion from '../../lesion/components/AddLesion';
import UpdateLesion from '../../lesion/components/UpdateLesion';
import LesionView from '../../lesion/components/LesionView';
import LesionHomeByPlayer from '../../lesion/components/LesionHomeByPlayer';
import AddNote from '../../notes/components/AddNote';
import NotesHome from '../../notes/components/NotesHome';
import UpdateNote from '../../notes/components/UpdateNote';
import NoteView from '../../notes/components/NoteView';
import PlaysHome from '../../plays/components/PlaysHome';
import AddPlay from '../../plays/components/AddPlay';
import UpdatePlay from '../../plays/components/UpdatePlay';
import PlayView from '../../plays/components/PlayView';
import TrainingHome from '../../trainings/components/TrainingHome';
import AddTraining from '../../trainings/components/AddTraining';
import TrainingView from '../../trainings/components/TrainingView';
import UpdateTraining from '../../trainings/components/UpdateTraining';
import FindPlayersByTraining from '../../players/components/FindPlayersByTraining';
import GamesHome from '../../games/components/GamesHome';
import AddGame from '../../games/components/AddGame';
import GameView from '../../games/components/GameView';
import UpdateGame from '../../games/components/UpdateGame';
import FindPlayersByGame from '../../players/components/FindPlayersByGame';
import AddGameStatistics from '../../statistics/components/AddGameStatistics';
import FindGameStatistics from '../../statistics/components/FindGameStatistics';
import UpdateGameStatistics from '../../statistics/components/UpdateGameStatistics';
import AddPlayerGameStatistics from '../../statistics/components/AddPlayerGameStatistics';
import FindPlayerGameStatistics from '../../statistics/components/FindPlayerGameStatistics';
import UpdatePlayerGameStatistics from '../../statistics/components/UpdatePlayerGameStatistics';
import StretchingsHome from '../../stretchings/components/StretchingsHome';
import StretchingView from '../../stretchings/components/StretchingView';
import AddStretching from '../../stretchings/components/AddStretching';
import UpdateStretching from '../../stretchings/components/UpdateStretching';
import StretchingsHomeByPlayer from '../../stretchings/components/StretchingsHomeByPlayer';
import StretchingsHomeByGame from '../../stretchings/components/StretchingsHomeByGame';
import StretchingsHomeByTraining from '../../stretchings/components/StretchingsHomeByTraining';
import ExercisesHome from '../../exercises/components/ExercisesHome';
import AddExercise from '../../exercises/components/AddExercise';
import UpdateExercise from '../../exercises/components/UpdateExercise';
import ExerciseView from '../../exercises/components/ExerciseView';
import ExercisesHomeByTraining from '../../exercises/components/ExercisesHomeByTraining';
import ExercisesHomeByGame from '../../exercises/components/ExercisesHomeByGame';
import LesionHomeByType from '../../lesion/components/LesionHomeByType';
import ExercisesHomeByType from '../../exercises/components/ExercisesHomeByType';
import StretchingsHomeByType from '../../stretchings/components/StretchingsHomeByType';
import Topbar from './TopBar';
import UpdateTrainingExercise from '../../trainings/components/UpdateTrainingExercise';
import UpdateTrainingStretching from '../../trainings/components/UpdateTrainingStretching';
import UpdateGameExercise from '../../games/components/UpdateGameExercise';
import UpdateGameStretching from '../../games/components/UpdateGameStretching';
import SeasonsHome from '../../seasons/components/SeasonsHome';
import { UpdateSeasonTeam, UpdateSeasonTraining } from '../../seasons';
import UpdateSeasonGame from '../../seasons/components/UpdateSeasonGame.js';
import { UpdateGamePlayer } from '../../games';
import StatisticsHome from '../../statistics/components/StatisticsHome';
import UpdateStatisticsGame from '../../statistics/components/UpdateStatisticsGame';
import UpdateStatisticsPlayers from '../../statistics/components/UpdateStatisticsPlayers';
import { UpdateStatisticsGamePlayer } from '../../statistics';
import { BoardHome, PlayAnimatorHome, PlaysHomeByType } from '../../plays';
import { CalendarHome } from '../../events';
import UpdateTeamGame from '../../teams/components/UpdateTeamGame';
import { UpdateTrainingPlayer } from '../../trainings';
import UpdatePlayerTeam from '../../players/components/UpdatePlayerTeam';
import { UpdatePlayerGame, UpdatePlayerLesion, UpdatePlayerNote, UpdatePlayerStretching, UpdatePlayerTraining } from '../../players';
import UsersByCoachHome from '../../users/components/UsersByCoachHome';

const Body = ({ isDark, setIsDark}) => {

    const loggedIn = useSelector(users.selectors.isLoggedIn);
    const userLogged = useSelector(users.selectors.getUser);

    return (


        <div>
            {/* <video src={video} autoPlay loop muted /> */}
            
            <AppGlobalComponents/>
            <Routes>
                <Route exact path="/" element={<Home/>}></Route>
                {loggedIn && (userLogged.role ==="ADMIN" || userLogged.role ==="COACH") && <Route exact path="/teams/update" element={<UpdateTeam/>}></Route>}
                {loggedIn && (userLogged.role ==="ADMIN" || userLogged.role ==="COACH") && <Route exact path="/teams/addTeamToSeason" element={<AddTeamToSeason/>}></Route>}
                {loggedIn && (userLogged.role ==="ADMIN" || userLogged.role ==="COACH") && <Route exact path="/teams/view/:id" element={<TeamView/>}></Route>}
                {loggedIn && (userLogged.role ==="ADMIN" || userLogged.role ==="COACH") && <Route exact path="/teams/all" element={<FindTeams/>}></Route>}
                {loggedIn && (userLogged.role ==="ADMIN" || userLogged.role ==="COACH") && <Route exact path="/teams/all/result" element={<FindTeamsResult/>}></Route>}
                {loggedIn && (userLogged.role ==="ADMIN" || userLogged.role ==="COACH") && <Route exact path="/teams/all/name" element={<FindTeamByName/>}></Route>}
                {loggedIn && (userLogged.role ==="ADMIN" || userLogged.role ==="COACH") && <Route exact path="/teams/all/name/result/:teamName" element={<FindTeamByNameResult/>}></Route>}
                
                {loggedIn && (userLogged.role ==="ADMIN" || userLogged.role ==="COACH") && <Route exact path="/teams/home" element={<TeamsHome/>}></Route>}
                {loggedIn && (userLogged.role ==="ADMIN" || userLogged.role ==="COACH") && <Route exact path="/teams/addTeam" element={<AddTeam/>}></Route>}
                {loggedIn && (userLogged.role ==="ADMIN" || userLogged.role ==="COACH") && <Route exact path="/teams/update/:id" element={<UpdateTeam/>}></Route>}
                {loggedIn && (userLogged.role ==="ADMIN" || userLogged.role ==="COACH") && <Route exact path="/teams/update/:id/play/:tabValue" element={<UpdateTeamPlay/>}></Route>}
                {loggedIn && (userLogged.role ==="ADMIN" || userLogged.role ==="COACH") && <Route exact path="/teams/update/:id/player/:tabValue" element={<UpdateTeamPlayer/>}></Route>}
                {loggedIn && (userLogged.role ==="ADMIN" || userLogged.role ==="COACH") && <Route exact path="/teams/update/:id/season/:tabValue" element={<UpdateTeamSeason/>}></Route>}
                {loggedIn && (userLogged.role ==="ADMIN" || userLogged.role ==="COACH") && <Route exact path="/teams/update/:id/training/:tabValue" element={<UpdateTeamTraining/>}></Route>}
                {loggedIn && (userLogged.role ==="ADMIN" || userLogged.role ==="COACH") && <Route exact path="/teams/update/:id/game/:tabValue" element={<UpdateTeamGame/>}></Route>}

                {loggedIn && (userLogged.role ==="ADMIN" || userLogged.role ==="COACH") && <Route exact path="/players/home" element={<PlayersHome/>}></Route>}
                {loggedIn && (userLogged.role ==="ADMIN" || userLogged.role ==="COACH") && <Route exact path="/players/addPlayer" element={<AddPlayer/>}></Route>}
                {loggedIn && (userLogged.role ==="ADMIN" || userLogged.role ==="COACH") && <Route exact path="/players/update/:id" element={<UpdatePlayer/>}></Route>}
                {loggedIn && (userLogged.role ==="ADMIN" || userLogged.role ==="COACH") && <Route exact path="/players/update/:id/team/:tabValue" element={<UpdatePlayerTeam/>}></Route>}
                {loggedIn && (userLogged.role ==="ADMIN" || userLogged.role ==="COACH") && <Route exact path="/players/update/:id/game/:tabValue" element={<UpdatePlayerGame/>}></Route>}
                {loggedIn && (userLogged.role ==="ADMIN" || userLogged.role ==="COACH") && <Route exact path="/players/update/:id/training/:tabValue" element={<UpdatePlayerTraining/>}></Route>}
                {loggedIn && (userLogged.role ==="ADMIN" || userLogged.role ==="COACH") && <Route exact path="/players/update/:id/lesion/:tabValue" element={<UpdatePlayerLesion/>}></Route>}
                {loggedIn && (userLogged.role ==="ADMIN" || userLogged.role ==="COACH") && <Route exact path="/players/update/:id/stretching/:tabValue" element={<UpdatePlayerStretching/>}></Route>}
                {loggedIn && (userLogged.role ==="ADMIN" || userLogged.role ==="COACH") && <Route exact path="/players/update/:id/note/:tabValue" element={<UpdatePlayerNote/>}></Route>}
                    {/* Donde iria la tabla pongo dos input(titulo, descripcion) y boton save. Debajo la lista de notas */}


                {/* {loggedIn && <Route exact path="/teams/addTeam" element={<AddTeam/>}></Route>}
                {loggedIn && <Route exact path="/teams/update/:id" element={<UpdateTeam/>}></Route>}

                {loggedIn && <Route exact path="/teams/update/:id/season/:tabValue" element={<UpdateTeamSeason/>}></Route>}
                {loggedIn && <Route exact path="/teams/update/:id/training/:tabValue" element={<UpdateTeamTraining/>}></Route>}
                {loggedIn && <Route exact path="/teams/update/:id/game/:tabValue" element={<UpdateTeamGame/>}></Route>}
                {loggedIn && <Route exact path="/teams/update/:id/player/:tabValue" element={<UpdateTeamPlayer/>}></Route>}
                {loggedIn && <Route exact path="/teams/update/:id/play/:tabValue" element={<UpdateTeamPlay/>}></Route>} */}


                {loggedIn && (userLogged.role ==="ADMIN" || userLogged.role ==="COACH") && <Route exact path="/seasons/all" element={<FindSeasons/>}></Route>}
                {loggedIn && (userLogged.role ==="ADMIN" || userLogged.role ==="COACH") && <Route exact path="/seasons/new" element={<AddSeason/>}></Route>}
                {loggedIn && (userLogged.role ==="ADMIN" || userLogged.role ==="COACH") && <Route exact path="/seasons/update" element={<UpdateSeason/>}></Route>}
                {loggedIn && (userLogged.role ==="ADMIN" || userLogged.role ==="COACH") && <Route exact path="/seasons/all/result" element={<FindSeasonsResult/>}></Route>}
                {loggedIn && (userLogged.role ==="ADMIN" || userLogged.role ==="COACH") && <Route exact path="/seasons/betweenDates" element={<FindSeasonsBetweenTwoDates/>}></Route>}
                {loggedIn && (userLogged.role ==="ADMIN" || userLogged.role ==="COACH") && <Route exact path="/seasons/betweenDates/result/:startDate/:endDate" element={<FindSeasonsBetweenTwoDatesResult/>}></Route>}
                {loggedIn && (userLogged.role ==="ADMIN" || userLogged.role ==="COACH") && <Route exact path="/seasons/view/:id" element={<SeasonView/>}></Route>}
                
                {loggedIn && (userLogged.role ==="ADMIN" || userLogged.role ==="COACH") && <Route exact path="/seasons/home" element={<SeasonsHome/>}></Route>}
                {loggedIn && (userLogged.role ==="ADMIN" || userLogged.role ==="COACH") && <Route exact path="/seasons/addSeason" element={<AddSeason/>}></Route>}
                {loggedIn && (userLogged.role ==="ADMIN" || userLogged.role ==="COACH") && <Route exact path="/seasons/update/:id" element={<UpdateSeason/>}></Route>}
                {loggedIn && (userLogged.role ==="ADMIN" || userLogged.role ==="COACH") && <Route exact path="/seasons/update/:id/team/:tabValue" element={<UpdateSeasonTeam/>}></Route>}
                {loggedIn && (userLogged.role ==="ADMIN" || userLogged.role ==="COACH") && <Route exact path="/seasons/update/:id/training/:tabValue" element={<UpdateSeasonTraining/>}></Route>}
                {loggedIn && (userLogged.role ==="ADMIN" || userLogged.role ==="COACH") && <Route exact path="/seasons/update/:id/game/:tabValue" element={<UpdateSeasonGame/>}></Route>}

                {loggedIn && (userLogged.role ==="ADMIN" || userLogged.role ==="COACH") && <Route exact path="/players/home/training/:id:trainingId" element={<FindPlayersByTraining/>}></Route>}
                {loggedIn && (userLogged.role ==="ADMIN" || userLogged.role ==="COACH") && <Route exact path="/players/home/game/:id:gameId" element={<FindPlayersByGame/>}></Route>}
                {loggedIn && (userLogged.role ==="ADMIN" || userLogged.role ==="COACH") && <Route exact path="/players/home/game/:id" element={<FindPlayersByGame/>}></Route>}
                {/* {loggedIn && <Route exact path="/players/home/:id" element={<PlayersHome/>}></Route>} */}
                {loggedIn && (userLogged.role ==="ADMIN" || userLogged.role ==="COACH") && <Route exact path="/players/addPlayer/:id" element={<AddPlayer/>}></Route>}
                {loggedIn && (userLogged.role ==="ADMIN" || userLogged.role ==="COACH") && <Route exact path="/players/update/:id" element={<UpdatePlayer/>}></Route>}
                {loggedIn && (userLogged.role ==="ADMIN" || userLogged.role ==="COACH") && <Route exact path="/players/dni/:id" element={<FindPlayerByDni/>}></Route>}
                {loggedIn && (userLogged.role ==="ADMIN" || userLogged.role ==="COACH") && <Route exact path="/players/completedName/:id" element={<FindPlayersByCompletedName/>}></Route>}
                {loggedIn && (userLogged.role ==="ADMIN" || userLogged.role ==="COACH") && <Route exact path="/players/dni/result/:dni:id" element={<FindPlayerByDniResult/>}></Route>}
                {loggedIn && (userLogged.role ==="ADMIN" || userLogged.role ==="COACH") && <Route exact path="/players/completedName/result/:id:playerName:primaryLastName:secondLastName" element={<FindPlayersByCompletedNameResult/>}></Route>}
                {loggedIn && (userLogged.role ==="ADMIN" || userLogged.role ==="COACH") && <Route exact path="/players/view/:id:playerId" element={<PlayerView/>}></Route>}
                {loggedIn && (userLogged.role ==="ADMIN" || userLogged.role ==="COACH") && <Route exact path="/players/view/:id" element={<PlayerView/>}></Route>}
                {loggedIn && (userLogged.role ==="ADMIN" || userLogged.role ==="COACH") && <Route exact path="/lesion/home" element={<LesionHome/>}></Route>}
                {loggedIn && (userLogged.role ==="ADMIN" || userLogged.role ==="COACH") && <Route exact path="/lesion/home/type/:lesionType/:tabValue" element={<LesionHomeByType/>}></Route>}
                {loggedIn && (userLogged.role ==="ADMIN" || userLogged.role ==="COACH") && <Route exact path="/lesion/home/player/:playerId" element={<LesionHomeByPlayer/>}></Route>}
                {loggedIn && (userLogged.role ==="ADMIN") && <Route exact path="/lesion/addLesion" element={<AddLesion/>}></Route>}
                {loggedIn && (userLogged.role ==="ADMIN" || userLogged.role ==="COACH") && <Route exact path="/lesion/update/:id" element={<UpdateLesion/>}></Route>}
                {loggedIn && (userLogged.role ==="ADMIN" || userLogged.role ==="COACH") && <Route exact path="/lesion/view/:id" element={<LesionView/>}></Route>}
                {loggedIn && (userLogged.role ==="ADMIN" || userLogged.role ==="COACH") && <Route exact path="/notes/addNote/:playerId" element={<AddNote/>}></Route>}
                {loggedIn && (userLogged.role ==="ADMIN" || userLogged.role ==="COACH") && <Route exact path="/notes/home/:id:playerId" element={<NotesHome/>}></Route>}
                {loggedIn && (userLogged.role ==="ADMIN" || userLogged.role ==="COACH") && <Route exact path="/notes/home/:id" element={<NotesHome/>}></Route>}
                {loggedIn && (userLogged.role ==="ADMIN" || userLogged.role ==="COACH") && <Route exact path="/notes/update/:id:noteId" element={<UpdateNote/>}></Route>}
                {loggedIn && (userLogged.role ==="ADMIN" || userLogged.role ==="COACH") && <Route exact path="/notes/update/:id" element={<UpdateNote/>}></Route>}
                {loggedIn && (userLogged.role ==="ADMIN" || userLogged.role ==="COACH") && <Route exact path="/notes/view/:noteId" element={<NoteView/>}></Route>}
                
                
                {loggedIn && (userLogged.role ==="ADMIN" || userLogged.role ==="COACH") && <Route exact path="/board/home" element={<BoardHome/>}></Route>}
                {loggedIn && (userLogged.role ==="ADMIN" || userLogged.role ==="COACH") && <Route exact path="/plays/animator/home" element={<PlayAnimatorHome/>}></Route>}
                {loggedIn && (userLogged.role ==="ADMIN" || userLogged.role ==="COACH" || userLogged.role ==="USER") && <Route exact path="/calendar/home" element={<CalendarHome/>}></Route>}

                
                {loggedIn && (userLogged.role ==="ADMIN" || userLogged.role ==="COACH") && <Route exact path="/plays/home" element={<PlaysHome/>}></Route>}
                {loggedIn && (userLogged.role ==="ADMIN" || userLogged.role ==="COACH") && <Route exact path="/plays/home/type/:playType/:tabValue" element={<PlaysHomeByType/>}></Route>}

                {loggedIn && (userLogged.role ==="ADMIN" || userLogged.role ==="COACH") && <Route exact path="/plays/addPlay" element={<AddPlay/>}></Route>}
                {loggedIn && (userLogged.role ==="ADMIN" || userLogged.role ==="COACH") && <Route exact path="/plays/update/:id" element={<UpdatePlay/>}></Route>}
                {loggedIn && (userLogged.role ==="ADMIN" || userLogged.role ==="COACH") && <Route exact path="/plays/view/:playId" element={<PlayView/>}></Route>}
                
                {loggedIn && (userLogged.role ==="ADMIN" || userLogged.role ==="COACH") && <Route exact path="/trainings/home" element={<TrainingHome/>}></Route>}
                {loggedIn && (userLogged.role ==="ADMIN" || userLogged.role ==="COACH") && <Route exact path="/trainings/addTraining" element={<AddTraining/>}></Route>}
                {loggedIn && (userLogged.role ==="ADMIN" || userLogged.role ==="COACH") && <Route exact path="/trainings/view/:id" element={<TrainingView/>}></Route>}
                {loggedIn && (userLogged.role ==="ADMIN" || userLogged.role ==="COACH") && <Route exact path="/trainings/update/:id" element={<UpdateTraining/>}></Route>}

                {loggedIn && (userLogged.role ==="ADMIN" || userLogged.role ==="COACH") && <Route exact path="/trainings/update/:id/exercise/:tabValue" element={<UpdateTrainingExercise/>}></Route>}
                {loggedIn && (userLogged.role ==="ADMIN" || userLogged.role ==="COACH") && <Route exact path="/trainings/update/:id/stretching/:tabValue" element={<UpdateTrainingStretching/>}></Route>}
                {loggedIn && (userLogged.role ==="ADMIN" || userLogged.role ==="COACH") && <Route exact path="/trainings/update/:id/players/:tabValue" element={<UpdateTrainingPlayer/>}></Route>}

                {loggedIn && (userLogged.role ==="ADMIN" || userLogged.role ==="COACH") && <Route exact path="/games/update/:id/exercise/:tabValue" element={<UpdateGameExercise/>}></Route>}
                {loggedIn && (userLogged.role ==="ADMIN" || userLogged.role ==="COACH") && <Route exact path="/games/update/:id/stretching/:tabValue" element={<UpdateGameStretching/>}></Route>}
                {loggedIn && (userLogged.role ==="ADMIN" || userLogged.role ==="COACH") && <Route exact path="/games/update/:id/statistics/:tabValue" element={<UpdateGameStatistics/>}></Route>}
                {loggedIn && (userLogged.role ==="ADMIN" || userLogged.role ==="COACH") && <Route exact path="/games/update/:id/player/:tabValue" element={<UpdateGamePlayer/>}></Route>}

                {loggedIn && (userLogged.role ==="ADMIN" || userLogged.role ==="COACH") && <Route exact path="/games/home" element={<GamesHome/>}></Route>}
                {loggedIn && (userLogged.role ==="ADMIN" || userLogged.role ==="COACH") && <Route exact path="/games/addGame" element={<AddGame/>}></Route>}
                {loggedIn && (userLogged.role ==="ADMIN" || userLogged.role ==="COACH") && <Route exact path="/games/view/:id" element={<GameView/>}></Route>}
                {loggedIn && (userLogged.role ==="ADMIN" || userLogged.role ==="COACH") && <Route exact path="/games/update/:id" element={<UpdateGame/>}></Route>}

                {loggedIn && (userLogged.role ==="ADMIN" || userLogged.role ==="COACH") && <Route exact path="/statistics/home" element={<StatisticsHome/>}></Route>}
                {loggedIn && (userLogged.role ==="ADMIN" || userLogged.role ==="COACH") && <Route exact path="/statistics/update/game/:gameId" element={<UpdateStatisticsGame/>}></Route>}
                {loggedIn && (userLogged.role ==="ADMIN" || userLogged.role ==="COACH") && <Route exact path="/statistics/update/game/:gameId/players/:tabValue" element={<UpdateStatisticsPlayers/>}></Route>}
                {loggedIn && (userLogged.role ==="ADMIN" || userLogged.role ==="COACH") && <Route exact path="/statistics/update/game/:gameId/players/:tabValue/player/:playerId" element={<UpdateStatisticsGamePlayer/>}></Route>}



                {loggedIn && (userLogged.role ==="ADMIN" || userLogged.role ==="COACH") && <Route exact path="/statistics/addGameStatistics/:gameId" element={<AddGameStatistics/>}></Route>}
                {loggedIn && (userLogged.role ==="ADMIN" || userLogged.role ==="COACH") && <Route exact path="/statistics/addPlayerGameStatistics/:playerId:gameId"  element={<AddPlayerGameStatistics/>}></Route>}
                {loggedIn && (userLogged.role ==="ADMIN" || userLogged.role ==="COACH") && <Route exact path="/statistics/addPlayerGameStatistics/:gameId"  element={<AddPlayerGameStatistics/>}></Route>}
                {loggedIn && (userLogged.role ==="ADMIN" || userLogged.role ==="COACH") && <Route exact path="/statistics/game/:gameId" element={<FindGameStatistics/>}></Route>}
                {loggedIn && (userLogged.role ==="ADMIN" || userLogged.role ==="COACH") && <Route exact path="/statistics/playerGame/:playerId:gameId" element={<FindPlayerGameStatistics/>}></Route>}
                {loggedIn && (userLogged.role ==="ADMIN" || userLogged.role ==="COACH") && <Route exact path="/statistics/game/update/:gameId" element={<UpdateGameStatistics/>}></Route>}
                {loggedIn && (userLogged.role ==="ADMIN" || userLogged.role ==="COACH") && <Route exact path="/statistics/playerGame/update/:playerId:gameId" element={<UpdatePlayerGameStatistics/>}></Route>}
                
                {loggedIn && (userLogged.role ==="ADMIN" || userLogged.role ==="COACH") && <Route exact path="/stretchings/home" element={<StretchingsHome/>}></Route>}
                {loggedIn && (userLogged.role ==="ADMIN" || userLogged.role ==="COACH") && <Route exact path="/stretchings/view/:id" element={<StretchingView/>}></Route>}
                {loggedIn && (userLogged.role ==="ADMIN") && <Route exact path="/stretchings/addStretching" element={<AddStretching/>}></Route>}
                {loggedIn && (userLogged.role ==="ADMIN" || userLogged.role ==="COACH") && <Route exact path="/stretchings/home/player/:playerId" element={<StretchingsHomeByPlayer/>}></Route>}
                {loggedIn && (userLogged.role ==="ADMIN" || userLogged.role ==="COACH") && <Route exact path="/stretchings/update/:id" element={<UpdateStretching/>}></Route>}
                {loggedIn && (userLogged.role ==="ADMIN" || userLogged.role ==="COACH") && <Route exact path="/stretchings/home/game/:gameId" element={<StretchingsHomeByGame/>}></Route>}
                {loggedIn && (userLogged.role ==="ADMIN" || userLogged.role ==="COACH") && <Route exact path="/stretchings/home/training/:trainingId" element={<StretchingsHomeByTraining/>}></Route>}
                {loggedIn && (userLogged.role ==="ADMIN" || userLogged.role ==="COACH") && <Route exact path="/stretchings/home/type/:stretchingType/:tabValue" element={<StretchingsHomeByType/>}></Route>}

                {loggedIn && (userLogged.role ==="COACH") && <Route exact path="/users/coach" element={<UsersByCoachHome/>}></Route>}
                {loggedIn && (userLogged.role ==="COACH") && <Route exact path="/users/coach/:tabValue" element={<UsersByCoachHomeCreate/>}></Route>}
                {loggedIn && (userLogged.role ==="ADMIN") && <Route exact path="/users/admin" element={<UsersByAdminHome/>}></Route>}
                {loggedIn && (userLogged.role ==="ADMIN") && <Route exact path="/users/admin/:tabValue" element={<UsersByAdminHomeCreate/>}></Route>}

                {loggedIn && (userLogged.role ==="ADMIN" || userLogged.role ==="COACH") && <Route exact path="/exercises/home" element={<ExercisesHome/>}></Route>}
                {loggedIn && (userLogged.role ==="ADMIN") && <Route exact path="/exercises/addExercise" element={<AddExercise/>}></Route>}
                {loggedIn && (userLogged.role ==="ADMIN" || userLogged.role ==="COACH") && <Route exact path="/exercises/update/:id" element={<UpdateExercise/>}></Route>}
                {loggedIn && (userLogged.role ==="ADMIN" || userLogged.role ==="COACH") && <Route exact path="/exercises/view/:id" element={<ExerciseView/>}></Route>}
                {loggedIn && (userLogged.role ==="ADMIN" || userLogged.role ==="COACH") && <Route exact path="/exercises/home/training/:trainingId" element={<ExercisesHomeByTraining/>}></Route>}
                {loggedIn && (userLogged.role ==="ADMIN" || userLogged.role ==="COACH") && <Route exact path="/exercises/home/game/:gameId" element={<ExercisesHomeByGame/>}></Route>}
                {loggedIn && (userLogged.role ==="ADMIN" || userLogged.role ==="COACH") && <Route exact path="/exercises/home/type/:exerciseType/:tabValue" element={<ExercisesHomeByType/>}></Route>}
                {loggedIn && (userLogged.role ==="ADMIN" || userLogged.role ==="COACH" || userLogged.role ==="USER") && <Route exact path="/users/update-profile" element={<UpdateProfile/>}></Route>}
                {loggedIn && (userLogged.role ==="ADMIN" || userLogged.role ==="COACH" || userLogged.role ==="USER") && <Route exact path="/users/change-password" element={<ChangePassword/>}></Route>}
                {loggedIn && (userLogged.role ==="ADMIN" || userLogged.role ==="COACH" || userLogged.role ==="USER") && <Route exact path="/users/logout" element={<Logout/>}></Route>}
                {!loggedIn && (userLogged.role ==="ADMIN" || userLogged.role ==="COACH" || userLogged.role ==="USER") && <Route exact path="/users/login" element={<Login/>}></Route>}
                {!loggedIn && (userLogged.role ==="ADMIN" || userLogged.role ==="COACH" || userLogged.role ==="USER") && <Route exact path="/users/signup" element={<SignUp/>}></Route>}
                <Route element={<Home/>}></Route>
            </Routes>
        </div>

    );

};

export default Body;
