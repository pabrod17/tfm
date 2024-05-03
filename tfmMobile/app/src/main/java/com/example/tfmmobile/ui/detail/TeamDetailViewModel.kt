package com.example.tfmmobile.ui.detail

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.tfmmobile.domain.model.usecase.GetTeamsUseCase
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

    fun getTeams(userId:Long){
        viewModelScope.launch {
//            hilo principal
            _state.value=TeamDetailState.Loading
            val result = withContext(Dispatchers.IO) { getTeamsUseCase(userId) } //hilo secundario
            if (result!=null){
                _state.value = TeamDetailState.Success(result.teamName, result.description)
            } else {
                _state.value = TeamDetailState.Error("Ha ocurrido un error. Inténtelo más tarde.")
            }
//            hilo principal
        }

    }

}