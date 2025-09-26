package com.teamhub1.tfmmobile.ui.detail.game

import android.app.Activity
import android.content.Context
import android.widget.Toast
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.teamhub1.tfmmobile.R
import com.teamhub1.tfmmobile.domain.model.usecase.GameUseCase
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
                (context as? Activity)?.finish() // Cerrar la actividad actual
                println("HOLAAAAAAA ANDANDOOOOOOOOOOO 222222222222")
            } else {
                Toast.makeText(context, R.string.errorUpdateGame, Toast.LENGTH_LONG).show()
                _state.value = GameDetailState.Error("Ha ocurrido un error. Inténtelo más tarde.")
            }
//            hilo principal
        }

    }

}