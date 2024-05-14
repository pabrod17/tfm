package com.example.tfmmobile.ui.club

import android.content.Context
import android.content.Intent
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.tfmmobile.data.provider.TeamProvider
import com.example.tfmmobile.domain.model.PlayerModel
import com.example.tfmmobile.domain.model.SeasonModel
import com.example.tfmmobile.domain.model.Team
import com.example.tfmmobile.domain.model.TeamModel
import com.example.tfmmobile.domain.model.usecase.GetTeamsUseCase
import com.example.tfmmobile.domain.model.usecase.PlayerUseCase
import com.example.tfmmobile.domain.model.usecase.SeasonUseCase
import com.example.tfmmobile.ui.detail.TeamDetailState
import com.example.tfmmobile.ui.home.MainActivity
import com.example.tfmmobile.ui.signup.SignUpState
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import java.net.URLEncoder
import javax.inject.Inject

@HiltViewModel
class ClubViewModel @Inject constructor(
    private val teamsUseCase: GetTeamsUseCase, private val playerUseCase: PlayerUseCase,
    private val seasonUseCase: SeasonUseCase
) : ViewModel() {

//class ClubViewModel @Inject constructor(private val getTeamsUseCase: GetTeamsUseCase): ViewModel() {

    private var _team = MutableStateFlow<List<TeamModel>>(emptyList())
    val team: StateFlow<List<TeamModel>> = _team

    private var _state = MutableStateFlow<TeamsState>(TeamsState.Loading)
    val state: StateFlow<TeamsState> = _state

    private var _stateSeasons = MutableStateFlow<SeasonsState>(SeasonsState.Loading)
    val stateSeasons: StateFlow<SeasonsState> = _stateSeasons
    private var _seasons = MutableStateFlow<List<SeasonModel>>(emptyList())
    val seasons: StateFlow<List<SeasonModel>> = _seasons
    private var _statePlayers = MutableStateFlow<PlayersState>(PlayersState.Loading)
    val statePlayers: StateFlow<PlayersState> = _statePlayers
    private var _players = MutableStateFlow<List<PlayerModel>>(emptyList())
    val players: StateFlow<List<PlayerModel>> = _players


    var description =
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"


    private var _stateTeam = MutableStateFlow<TeamState>(TeamState.Loading)
    val stateTeam: StateFlow<TeamState> = _stateTeam

    private var _statePlayer = MutableStateFlow<PlayerState>(PlayerState.Loading)
    val statePlayer: StateFlow<PlayerState> = _statePlayer

    private var _stateSeason = MutableStateFlow<SeasonState>(SeasonState.Loading)
    val stateSeason: StateFlow<SeasonState> = _stateSeason

    fun getTeams(): List<TeamModel> {
        viewModelScope.launch {
//            hilo principal
            _state.value = TeamsState.Loading
            val result = withContext(Dispatchers.IO) { teamsUseCase() } //hilo secundario
            if (result != null) {
                _state.value = TeamsState.Success(result)
                _team.value = result
//                _team.value = result

            } else {
                _state.value = TeamsState.Error("Ha ocurrido un error. Inténtelo más tarde.")
            }
//            hilo principal
        }

        return _team.value
    }

    fun getSeasons(): List<SeasonModel> {
        viewModelScope.launch {
//            hilo principal
            _stateSeasons.value = SeasonsState.Loading
            val result = withContext(Dispatchers.IO) { seasonUseCase() } //hilo secundario
            if (result != null) {
                _stateSeasons.value = SeasonsState.Success(result)
                _seasons.value = result
//                _team.value = result

            } else {
                _stateSeasons.value =
                    SeasonsState.Error("Ha ocurrido un error. Inténtelo más tarde.")
            }
//            hilo principal
        }

        return _seasons.value
    }

    fun getPlayers(): List<PlayerModel> {
        viewModelScope.launch {
//            hilo principal
            _statePlayers.value = PlayersState.Loading
            val result = withContext(Dispatchers.IO) { playerUseCase() } //hilo secundario
            if (result != null) {
                _statePlayers.value = PlayersState.Success(result)
                _players.value = result
//                _team.value = result

            } else {
                _statePlayers.value =
                    PlayersState.Error("Ha ocurrido un error. Inténtelo más tarde.")
            }
//            hilo principal
        }

        return _players.value
    }


    fun addTeam(
        teamName: String,
        arenaName: String,
        ownerName: String,
        description: String, context: Context
    ) {
        viewModelScope.launch {
//            hilo principal
            _stateTeam.value = TeamState.Loading
            val result = withContext(Dispatchers.IO) {
                teamsUseCase(teamName, arenaName, ownerName, description)
            } //hilo secundario
            if (result != null) {
                _stateTeam.value = TeamState.Success(
                    result.teamName, result.arenaName,
                    result.ownerName, result.description
                )
                println("HOLAAAAAAA ANDANDOOOOOOOOOOO")
                val intent = Intent(context, MainActivity::class.java)
                context.startActivity(intent)
                println("HOLAAAAAAA ANDANDOOOOOOOOOOO 222222222222")
            } else {
                _stateTeam.value = TeamState.Error("Ha ocurrido un error. Inténtelo más tarde.")
            }
//            hilo principal
        }
    }

    fun addSeason(
        startDate: String,
        endDate: String,
        seasonName: String,
        description: String,
        context: Context
    ) {
        viewModelScope.launch {
//            hilo principal
            _stateSeason.value = SeasonState.Loading

            val result = withContext(Dispatchers.IO) {
                seasonUseCase(startDate, endDate, seasonName, description)
            } //hilo secundario
            if (result != null) {
                _stateSeason.value = SeasonState.Success(
                    result.id, result.startDate,
                    result.endDate, result.seasonName, result.description
                )
                println("HOLAAAAAAA ANDANDOOOOOOOOOOO")
                val intent = Intent(context, MainActivity::class.java)
                context.startActivity(intent)
                println("HOLAAAAAAA ANDANDOOOOOOOOOOO 222222222222")
            } else {
                _stateSeason.value = SeasonState.Error("Ha ocurrido un error. Inténtelo más tarde.")
            }
//            hilo principal
        }
    }

    fun addPlayer(
        teamId: Long,
        playerName: String,
        primaryLastName: String,
        secondLastName: String,
        position: String,
        trends: String,
        phoneNumber: String,
        email: String,
        dni: String,
        injured: Boolean,
        context: Context
    ) {
        viewModelScope.launch {
//            hilo principal
            _statePlayer.value = PlayerState.Loading
            val result = withContext(Dispatchers.IO) {
                playerUseCase(
                    teamId,
                    playerName,
                    primaryLastName,
                    secondLastName,
                    position,
                    trends,
                    phoneNumber,
                    email,
                    dni
                )
            } //hilo secundario
            if (result != null) {
                _statePlayer.value = PlayerState.Success(
                    result.id, result.playerName,
                    result.primaryLastName, result.secondLastName, result.position,
                    result.trends, result.phoneNumber, result.email,
                    result.dni, result.teamId, injured
                )
                println("HOLAAAAAAA ANDANDOOOOOOOOOOO")
                val intent = Intent(context, MainActivity::class.java)
                context.startActivity(intent)
                println("HOLAAAAAAA ANDANDOOOOOOOOOOO 222222222222")
            } else {
                _statePlayer.value = PlayerState.Error("Ha ocurrido un error. Inténtelo más tarde.")
            }
//            hilo principal
        }
    }

    init {
        _team.value = getTeams()
        _seasons.value = getSeasons()
        _players.value = getPlayers()
    }


}