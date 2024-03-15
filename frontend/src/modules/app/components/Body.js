import React from 'react';
import {useSelector} from 'react-redux';
import {Route, Routes} from 'react-router-dom';

import AppGlobalComponents from './AppGlobalComponents';
import Home from './Home';
import {Login, SignUp, UpdateProfile, ChangePassword, Logout} from '../../users';
import users from '../../users';
import {FindTeamsResult, FindTeams, RemoveTeam, AddTeam, UpdateTeam, TeamView} from '../../teams';
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


const Body = ({ isDark, setIsDark}) => {

    const loggedIn = useSelector(users.selectors.isLoggedIn);

    return (


        <div>
            {/* <video src={video} autoPlay loop muted /> */}
            
            <AppGlobalComponents/>
            <Routes>
                <Route exact path="/" element={<Home/>}></Route>
                {loggedIn && <Route exact path="/teams/new" element={<AddTeam/>}></Route>}
                {loggedIn && <Route exact path="/teams/update" element={<UpdateTeam/>}></Route>}
                {loggedIn && <Route exact path="/teams/addTeamToSeason" element={<AddTeamToSeason/>}></Route>}
                {loggedIn && <Route exact path="/teams/view/:id" element={<TeamView/>}></Route>}
                {loggedIn && <Route exact path="/teams/all" element={<FindTeams/>}></Route>}
                {loggedIn && <Route exact path="/teams/all/result" element={<FindTeamsResult/>}></Route>}
                {loggedIn && <Route exact path="/teams/all/name" element={<FindTeamByName/>}></Route>}
                {loggedIn && <Route exact path="/teams/all/name/result/:teamName" element={<FindTeamByNameResult/>}></Route>}
                {loggedIn && <Route exact path="/seasons/all" element={<FindSeasons/>}></Route>}
                {loggedIn && <Route exact path="/seasons/new" element={<AddSeason/>}></Route>}
                {loggedIn && <Route exact path="/seasons/update" element={<UpdateSeason/>}></Route>}
                {loggedIn && <Route exact path="/seasons/all/result" element={<FindSeasonsResult/>}></Route>}
                {loggedIn && <Route exact path="/seasons/betweenDates" element={<FindSeasonsBetweenTwoDates/>}></Route>}
                {loggedIn && <Route exact path="/seasons/betweenDates/result/:startDate/:endDate" element={<FindSeasonsBetweenTwoDatesResult/>}></Route>}
                {loggedIn && <Route exact path="/seasons/view/:id" element={<SeasonView/>}></Route>}
                {loggedIn && <Route exact path="/players/home/training/:id:trainingId" element={<FindPlayersByTraining/>}></Route>}
                {loggedIn && <Route exact path="/players/home/game/:id:gameId" element={<FindPlayersByGame/>}></Route>}
                {loggedIn && <Route exact path="/players/home/game/:id" element={<FindPlayersByGame/>}></Route>}
                {loggedIn && <Route exact path="/players/home/:id" element={<PlayersHome/>}></Route>}
                {loggedIn && <Route exact path="/players/addPlayer/:id" element={<AddPlayer/>}></Route>}
                {loggedIn && <Route exact path="/players/update/:id" element={<UpdatePlayer/>}></Route>}
                {loggedIn && <Route exact path="/players/dni/:id" element={<FindPlayerByDni/>}></Route>}
                {loggedIn && <Route exact path="/players/completedName/:id" element={<FindPlayersByCompletedName/>}></Route>}
                {loggedIn && <Route exact path="/players/dni/result/:dni:id" element={<FindPlayerByDniResult/>}></Route>}
                {loggedIn && <Route exact path="/players/completedName/result/:id:playerName:primaryLastName:secondLastName" element={<FindPlayersByCompletedNameResult/>}></Route>}
                {loggedIn && <Route exact path="/players/view/:id:playerId" element={<PlayerView/>}></Route>}
                {loggedIn && <Route exact path="/players/view/:id" element={<PlayerView/>}></Route>}
                {loggedIn && <Route exact path="/lesion/home" element={<LesionHome/>}></Route>}
                {loggedIn && <Route exact path="/lesion/home/type/:lesionType/:tabValue" element={<LesionHomeByType/>}></Route>}
                {loggedIn && <Route exact path="/lesion/home/player/:playerId" element={<LesionHomeByPlayer/>}></Route>}
                {loggedIn && <Route exact path="/lesion/addLesion" element={<AddLesion/>}></Route>}
                {loggedIn && <Route exact path="/lesion/update/:id" element={<UpdateLesion/>}></Route>}
                {loggedIn && <Route exact path="/lesion/view/:id" element={<LesionView/>}></Route>}
                {loggedIn && <Route exact path="/notes/addNote/:playerId" element={<AddNote/>}></Route>}
                {loggedIn && <Route exact path="/notes/home/:id:playerId" element={<NotesHome/>}></Route>}
                {loggedIn && <Route exact path="/notes/home/:id" element={<NotesHome/>}></Route>}
                {loggedIn && <Route exact path="/notes/update/:id:noteId" element={<UpdateNote/>}></Route>}
                {loggedIn && <Route exact path="/notes/update/:id" element={<UpdateNote/>}></Route>}
                {loggedIn && <Route exact path="/notes/view/:noteId" element={<NoteView/>}></Route>}
                {loggedIn && <Route exact path="/plays/home/:id" element={<PlaysHome/>}></Route>}
                {loggedIn && <Route exact path="/plays/update/:id" element={<UpdatePlay/>}></Route>}
                {loggedIn && <Route exact path="/plays/addPlay/:id" element={<AddPlay/>}></Route>}
                {loggedIn && <Route exact path="/plays/view/:playId" element={<PlayView/>}></Route>}
                {loggedIn && <Route exact path="/trainings/home" element={<TrainingHome/>}></Route>}
                {loggedIn && <Route exact path="/trainings/addTraining" element={<AddTraining/>}></Route>}
                {loggedIn && <Route exact path="/trainings/view/:id" element={<TrainingView/>}></Route>}
                {loggedIn && <Route exact path="/trainings/update/:id" element={<UpdateTraining/>}></Route>}

                {loggedIn && <Route exact path="/trainings/update/:id/exercise/:tabValue" element={<UpdateTrainingExercise/>}></Route>}
                {loggedIn && <Route exact path="/trainings/update/:id/stretching/:tabValue" element={<UpdateTraining/>}></Route>}


                {loggedIn && <Route exact path="/games/home" element={<GamesHome/>}></Route>}
                {loggedIn && <Route exact path="/games/addGame" element={<AddGame/>}></Route>}
                {loggedIn && <Route exact path="/games/view/:id" element={<GameView/>}></Route>}
                {loggedIn && <Route exact path="/games/update/:id" element={<UpdateGame/>}></Route>}
                {loggedIn && <Route exact path="/statistics/addGameStatistics/:gameId" element={<AddGameStatistics/>}></Route>}
                {loggedIn && <Route exact path="/statistics/addPlayerGameStatistics/:playerId:gameId"  element={<AddPlayerGameStatistics/>}></Route>}
                {loggedIn && <Route exact path="/statistics/addPlayerGameStatistics/:gameId"  element={<AddPlayerGameStatistics/>}></Route>}
                {loggedIn && <Route exact path="/statistics/game/:gameId" element={<FindGameStatistics/>}></Route>}
                {loggedIn && <Route exact path="/statistics/playerGame/:playerId:gameId" element={<FindPlayerGameStatistics/>}></Route>}
                {loggedIn && <Route exact path="/statistics/game/update/:gameId" element={<UpdateGameStatistics/>}></Route>}
                {loggedIn && <Route exact path="/statistics/playerGame/update/:playerId:gameId" element={<UpdatePlayerGameStatistics/>}></Route>}
                {loggedIn && <Route exact path="/stretchings/home" element={<StretchingsHome/>}></Route>}
                {loggedIn && <Route exact path="/stretchings/view/:id" element={<StretchingView/>}></Route>}
                {loggedIn && <Route exact path="/stretchings/addStretching" element={<AddStretching/>}></Route>}
                {loggedIn && <Route exact path="/stretchings/update/:id" element={<UpdateStretching/>}></Route>}
                {loggedIn && <Route exact path="/stretchings/home/player/:playerId" element={<StretchingsHomeByPlayer/>}></Route>}
                {loggedIn && <Route exact path="/stretchings/home/game/:gameId" element={<StretchingsHomeByGame/>}></Route>}
                {loggedIn && <Route exact path="/stretchings/home/training/:trainingId" element={<StretchingsHomeByTraining/>}></Route>}
                {loggedIn && <Route exact path="/stretchings/home/type/:stretchingType/:tabValue" element={<StretchingsHomeByType/>}></Route>}
                {loggedIn && <Route exact path="/exercises/home" element={<ExercisesHome/>}></Route>}
                {loggedIn && <Route exact path="/exercises/addExercise" element={<AddExercise/>}></Route>}
                {loggedIn && <Route exact path="/exercises/update/:id" element={<UpdateExercise/>}></Route>}
                {loggedIn && <Route exact path="/exercises/view/:id" element={<ExerciseView/>}></Route>}
                {loggedIn && <Route exact path="/exercises/home/training/:trainingId" element={<ExercisesHomeByTraining/>}></Route>}
                {loggedIn && <Route exact path="/exercises/home/game/:gameId" element={<ExercisesHomeByGame/>}></Route>}
                {loggedIn && <Route exact path="/exercises/home/type/:exerciseType/:tabValue" element={<ExercisesHomeByType/>}></Route>}
                {loggedIn && <Route exact path="/users/update-profile" element={<UpdateProfile/>}></Route>}
                {loggedIn && <Route exact path="/users/change-password" element={<ChangePassword/>}></Route>}
                {loggedIn && <Route exact path="/users/logout" element={<Logout/>}></Route>}
                {!loggedIn && <Route exact path="/users/login" element={<Login/>}></Route>}
                {!loggedIn && <Route exact path="/users/signup" element={<SignUp/>}></Route>}
                <Route element={<Home/>}></Route>
            </Routes>
        </div>

    );

};

export default Body;
