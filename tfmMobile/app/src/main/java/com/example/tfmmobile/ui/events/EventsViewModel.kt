package com.example.tfmmobile.ui.events

import android.content.Context
import android.content.Intent
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.tfmmobile.domain.model.GameModel
import com.example.tfmmobile.domain.model.SeasonModel
import com.example.tfmmobile.domain.model.TrainingModel
import com.example.tfmmobile.domain.model.usecase.GameUseCase
import com.example.tfmmobile.domain.model.usecase.PlayerUseCase
import com.example.tfmmobile.domain.model.usecase.TrainingUseCase
import com.example.tfmmobile.ui.club.SeasonState
import com.example.tfmmobile.ui.club.SeasonsState
import com.example.tfmmobile.ui.home.MainActivity
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import javax.inject.Inject

@HiltViewModel
class EventsViewModel @Inject constructor(
    private val gameUseCase: GameUseCase,
    private val trainingUseCase: TrainingUseCase
) : ViewModel() {

    private var _stateGames = MutableStateFlow<GamesState>(GamesState.Loading)
    val stateGames: StateFlow<GamesState> = _stateGames
    private var _games = MutableStateFlow<List<GameModel>>(emptyList())
    val games: StateFlow<List<GameModel>> = _games

    private var _stateTrainings = MutableStateFlow<TrainingsState>(TrainingsState.Loading)
    val stateTrainings: StateFlow<TrainingsState> = _stateTrainings
    private var _trainings = MutableStateFlow<List<TrainingModel>>(emptyList())
    val trainings: StateFlow<List<TrainingModel>> = _trainings

    private var _stateGame = MutableStateFlow<GameState>(GameState.Loading)
    val stateGame: StateFlow<GameState> = _stateGame

    private var _stateTraining = MutableStateFlow<TrainingState>(TrainingState.Loading)
    val stateTraining: StateFlow<TrainingState> = _stateTraining

    fun getGames(): List<GameModel> {
        viewModelScope.launch {
//            hilo principal
            _stateGames.value = GamesState.Loading
            val result = withContext(Dispatchers.IO) { gameUseCase() } //hilo secundario
            if (result != null) {
                _stateGames.value = GamesState.Success(result)
                _games.value = result
//                _team.value = result

            } else {
                _stateGames.value =
                    GamesState.Error("Ha ocurrido un error. Inténtelo más tarde.")
            }
//            hilo principal
        }

        return _games.value
    }

    fun getTrainings(): List<TrainingModel> {
        viewModelScope.launch {
//            hilo principal
            _stateTrainings.value = TrainingsState.Loading
            val result = withContext(Dispatchers.IO) { trainingUseCase() } //hilo secundario
            if (result != null) {
                _stateTrainings.value = TrainingsState.Success(result)
                _trainings.value = result
//                _team.value = result

            } else {
                _stateTrainings.value =
                    TrainingsState.Error("Ha ocurrido un error. Inténtelo más tarde.")
            }
//            hilo principal
        }

        return _trainings.value
    }

    fun addGame(
        teamId: Long,
        seasonId: Long,
        gameDate: String,
        rival: String,
        description: String,
        context: Context
    ) {
        viewModelScope.launch {
//            hilo principal
            _stateGame.value = GameState.Loading

            println("dentro de viewMODEL::: " + teamId)
            println("dentro de viewMODEL::: " + teamId)
            println("dentro de viewMODEL::: " + teamId)
            println("dentro de viewMODEL::: " + teamId)
            println("dentro de viewMODEL::: " + teamId)


            println("dentro de viewMODEL season::: " + seasonId)
            println("dentro de viewMODEL season::: " + seasonId)
            println("dentro de viewMODEL season::: " + seasonId)
            println("dentro de viewMODEL season::: " + seasonId)

            val result = withContext(Dispatchers.IO) {
                gameUseCase(teamId, seasonId, gameDate, rival, description)
            } //hilo secundario
            if (result != null) {
                _stateGame.value = GameState.Success(
                    result.id, result.gameDate,
                    result.rival, result.description
                )
                println("HOLAAAAAAA ANDANDOOOOOOOOOOO")
                getGames()
                println("HOLAAAAAAA ANDANDOOOOOOOOOOO 222222222222")
            } else {
                _stateGame.value = GameState.Error("Ha ocurrido un error. Inténtelo más tarde.")
            }
//            hilo principal
        }
    }

    fun addTraining(
        teamId: Long,
        seasonId: Long,
        trainingDate: String,
        durationMinutes: String,
        description: String,
        objective: String,
        context: Context
    ) {
        viewModelScope.launch {
//            hilo principal
            _stateTraining.value = TrainingState.Loading

            val result = withContext(Dispatchers.IO) {
                trainingUseCase(teamId, seasonId, trainingDate, durationMinutes, description, objective)
            } //hilo secundario
            if (result != null) {
                _stateTraining.value = TrainingState.Success(
                    result.id, result.trainingDate,
                    result.durationMinutes, result.description, result.objective
                )
                println("HOLAAAAAAA ANDANDOOOOOOOOOOO")
                getTrainings()
                println("HOLAAAAAAA ANDANDOOOOOOOOOOO 222222222222")
            } else {
                _stateTraining.value = TrainingState.Error("Ha ocurrido un error. Inténtelo más tarde.")
            }
//            hilo principal
        }
    }

}