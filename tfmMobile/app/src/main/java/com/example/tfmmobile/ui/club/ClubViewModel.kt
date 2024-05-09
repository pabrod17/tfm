package com.example.tfmmobile.ui.club

import android.content.Context
import android.content.Intent
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.tfmmobile.data.provider.TeamProvider
import com.example.tfmmobile.domain.model.Team
import com.example.tfmmobile.domain.model.TeamModel
import com.example.tfmmobile.domain.model.usecase.GetTeamsUseCase
import com.example.tfmmobile.ui.detail.TeamDetailState
import com.example.tfmmobile.ui.home.MainActivity
import com.example.tfmmobile.ui.signup.SignUpState
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import javax.inject.Inject

@HiltViewModel
class ClubViewModel @Inject constructor(private val teamsUseCase: GetTeamsUseCase) : ViewModel() {

//class ClubViewModel @Inject constructor(private val getTeamsUseCase: GetTeamsUseCase): ViewModel() {

    private var _team = MutableStateFlow<List<TeamModel>>(emptyList())
    val team: StateFlow<List<TeamModel>> = _team

    private var _state = MutableStateFlow<TeamsState>(TeamsState.Loading)
    val state:StateFlow<TeamsState> = _state

    var description =
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"


    private var _stateTeam = MutableStateFlow<TeamState>(TeamState.Loading)
    val stateTeam:StateFlow<TeamState> = _stateTeam


    fun getTeams(): List<TeamModel> {
        viewModelScope.launch {
//            hilo principal
            _state.value= TeamsState.Loading
            val result = withContext(Dispatchers.IO) { teamsUseCase() } //hilo secundario
            if (result!=null){
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

    fun addTeam(teamName:String,
                   arenaName:String,
                   ownerName:String,
                   description:String, context: Context
    ){
        viewModelScope.launch {
//            hilo principal
            _stateTeam.value=TeamState.Loading
            val result = withContext(Dispatchers.IO) {
                teamsUseCase(teamName, arenaName, ownerName, description) } //hilo secundario
            if (result!=null){
                _stateTeam.value = TeamState.Success(result.teamName, result.arenaName,
                    result.ownerName, result.description)
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

    init {
        _team.value =  getTeams()
    }


}