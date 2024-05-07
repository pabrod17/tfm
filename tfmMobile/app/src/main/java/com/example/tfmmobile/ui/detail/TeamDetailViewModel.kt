package com.example.tfmmobile.ui.detail

import android.content.Context
import android.content.Intent
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.tfmmobile.domain.model.usecase.GetTeamsUseCase
import com.example.tfmmobile.ui.home.MainActivity
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import javax.inject.Inject

@HiltViewModel
class TeamDetailViewModel @Inject constructor(private val getTeamsUseCase: GetTeamsUseCase): ViewModel() {

    private var _state = MutableStateFlow<TeamDetailState>(TeamDetailState.Loading)
    val state:StateFlow<TeamDetailState> = _state

    fun getTeamById(id:Long){
        viewModelScope.launch {
//            hilo principal
            _state.value=TeamDetailState.Loading
            val result = withContext(Dispatchers.IO) { getTeamsUseCase(id) } //hilo secundario
            if (result!=null){
                _state.value = TeamDetailState.Success(result.id, result.teamName, result.arenaName,
                    result.ownerName, result.description)
            } else {
                _state.value = TeamDetailState.Error("Ha ocurrido un error. Inténtelo más tarde.")
            }
//            hilo principal
        }

    }

    fun updateTeam(id: Long,
                   teamName:String,
                   arenaName:String,
                   ownerName:String,
                   description:String, context: Context
    ){
        viewModelScope.launch {
//            hilo principal
            _state.value=TeamDetailState.Loading
            val result = withContext(Dispatchers.IO) {
                getTeamsUseCase(id, teamName, arenaName, ownerName, description) } //hilo secundario
            if (result!=null){
                _state.value = TeamDetailState.Success(result.id, result.teamName, result.arenaName,
                    result.ownerName, result.description)
                println("HOLAAAAAAA ANDANDOOOOOOOOOOO")
                val intent = Intent(context, MainActivity::class.java)
                context.startActivity(intent)
                println("HOLAAAAAAA ANDANDOOOOOOOOOOO 222222222222")
            } else {
                _state.value = TeamDetailState.Error("Ha ocurrido un error. Inténtelo más tarde.")
            }
//            hilo principal
        }

    }

}