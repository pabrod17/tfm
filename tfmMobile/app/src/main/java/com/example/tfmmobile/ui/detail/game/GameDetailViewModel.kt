package com.example.tfmmobile.ui.detail.game

import android.content.Context
import android.content.Intent
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.tfmmobile.domain.model.usecase.GameUseCase
import com.example.tfmmobile.ui.detail.season.SeasonDetailState
import com.example.tfmmobile.ui.home.MainActivity
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import javax.inject.Inject

@HiltViewModel
class GameDetailViewModel @Inject constructor(private val gameUseCase: GameUseCase) : ViewModel() {

    private var _state = MutableStateFlow<GameDetailState>(GameDetailState.Loading)
    val state: StateFlow<GameDetailState> = _state

    fun getGameById(id:Long){
        viewModelScope.launch {
//            hilo principal
            _state.value= GameDetailState.Loading
            val result = withContext(Dispatchers.IO) { gameUseCase(id) } //hilo secundario
            if (result!=null){
                _state.value = GameDetailState.Success(
                    result.id, result.gameDate,
                    result.rival, result.description
                )
            } else {
                _state.value = GameDetailState.Error("Ha ocurrido un error. Inténtelo más tarde.")
            }
//            hilo principal
        }

    }

    fun updateGame(id: Long,
                     gameDate: String,
                     rival: String,
                     description: String,
                     context: Context
    ){
        viewModelScope.launch {
//            hilo principal
            _state.value= GameDetailState.Loading
            val result = withContext(Dispatchers.IO) {
                gameUseCase(id, gameDate, rival, description) } //hilo secundario
            if (result!=null){
                _state.value = GameDetailState.Success(
                    result.id, result.gameDate,
                    result.rival, result.description
                )
                println("HOLAAAAAAA ANDANDOOOOOOOOOOO")
                val intent = Intent(context, MainActivity::class.java)
                context.startActivity(intent)
                println("HOLAAAAAAA ANDANDOOOOOOOOOOO 222222222222")
            } else {
                _state.value = GameDetailState.Error("Ha ocurrido un error. Inténtelo más tarde.")
            }
//            hilo principal
        }

    }

}