package com.example.tfmmobile.ui.detail.season

import android.content.Context
import android.content.Intent
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.tfmmobile.domain.model.usecase.SeasonUseCase
import com.example.tfmmobile.ui.detail.team.TeamDetailState
import com.example.tfmmobile.ui.home.MainActivity
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import javax.inject.Inject

@HiltViewModel
class SeasonDetailViewModel @Inject constructor(private val seasonUseCase: SeasonUseCase): ViewModel() {

    private var _state = MutableStateFlow<SeasonDetailState>(SeasonDetailState.Loading)
    val state: StateFlow<SeasonDetailState> = _state

    fun getSeasonById(id:Long){
        viewModelScope.launch {
//            hilo principal
            _state.value= SeasonDetailState.Loading
            val result = withContext(Dispatchers.IO) { seasonUseCase(id) } //hilo secundario
            if (result!=null){
                _state.value = SeasonDetailState.Success(
                    result.id, result.startDate,
                    result.endDate, result.seasonName, result.description
                )
            } else {
                _state.value = SeasonDetailState.Error("Ha ocurrido un error. Inténtelo más tarde.")
            }
//            hilo principal
        }

    }

    fun updateSeason(id: Long,
                     startDate: String,
                     endDate: String,
                     seasonName: String,
                     description: String,
                     context: Context
    ){
        viewModelScope.launch {
//            hilo principal
            _state.value= SeasonDetailState.Loading
            val result = withContext(Dispatchers.IO) {
                seasonUseCase(id, startDate, endDate, seasonName, description) } //hilo secundario
            if (result!=null){
                _state.value = SeasonDetailState.Success(
                    result.id, result.startDate, result.endDate,
                    result.seasonName, result.description
                )
                println("HOLAAAAAAA ANDANDOOOOOOOOOOO")
                val intent = Intent(context, MainActivity::class.java)
                context.startActivity(intent)
                println("HOLAAAAAAA ANDANDOOOOOOOOOOO 222222222222")
            } else {
                _state.value = SeasonDetailState.Error("Ha ocurrido un error. Inténtelo más tarde.")
            }
//            hilo principal
        }

    }
}