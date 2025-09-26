package com.teamhub1.tfmmobile.ui.detail.play

import android.app.Activity
import android.content.Context
import android.widget.Toast
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.teamhub1.tfmmobile.R
import com.teamhub1.tfmmobile.domain.model.usecase.PlayUseCase
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import javax.inject.Inject

@HiltViewModel
class PlayDetailViewModel @Inject constructor(private val playUseCase: PlayUseCase) : ViewModel() {

    private var _state = MutableStateFlow<PlayDetailState>(PlayDetailState.Loading)
    val state: StateFlow<PlayDetailState> = _state

    fun getPlayById(id:Long){
        viewModelScope.launch {
//            hilo principal
            _state.value= PlayDetailState.Loading
            val result = withContext(Dispatchers.IO) { playUseCase(id) } //hilo secundario
            if (result!=null){
                _state.value = PlayDetailState.Success(
                    result.id, result.title,
                    result.playType, result.gesture, result.pointGuardText,
                    result.shootingGuardText, result.smallForwardText, result.powerForwardText,
                    result.centerText, result.description,
                )
            } else {
                _state.value = PlayDetailState.Error("Ha ocurrido un error. Inténtelo más tarde.")
            }
//            hilo principal
        }

    }

    fun updatePlay(
                   id: Long,
                   title: String,
                   playType: String,
                   gesture: String,
                   pointGuardText: String,
                   shootingGuardText: String,
                   smallForwardText: String,
                   powerForwardText: String,
                   centerText: String,
                   description: String,
                     context: Context
    ){
        viewModelScope.launch {
//            hilo principal
            _state.value= PlayDetailState.Loading
            val result = withContext(Dispatchers.IO) {
                playUseCase(id, title,
                    playType,
                    gesture,
                    pointGuardText,
                    shootingGuardText,
                    smallForwardText,
                    powerForwardText,
                    centerText,
                    description) } //hilo secundario
            if (result!=null){
                _state.value = PlayDetailState.Success(
                    result.id, result.title,
                    result.playType, result.gesture, result.pointGuardText,
                    result.shootingGuardText, result.smallForwardText, result.powerForwardText,
                    result.centerText, result.description,
                )
                println("HOLAAAAAAA ANDANDOOOOOOOOOOO")
                (context as? Activity)?.finish() // Cerrar la actividad actual
                println("HOLAAAAAAA ANDANDOOOOOOOOOOO 222222222222")
            } else {
                Toast.makeText(context, R.string.errorUpdatePlay, Toast.LENGTH_LONG).show()
                _state.value = PlayDetailState.Error("Ha ocurrido un error. Inténtelo más tarde.")
            }
//            hilo principal
        }

    }

}