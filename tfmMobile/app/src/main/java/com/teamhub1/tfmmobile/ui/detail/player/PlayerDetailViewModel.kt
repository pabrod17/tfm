package com.teamhub1.tfmmobile.ui.detail.player

import android.content.Context
import android.content.Intent
import android.widget.Toast
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.teamhub1.tfmmobile.R
import com.teamhub1.tfmmobile.domain.model.usecase.PlayerUseCase
import com.teamhub1.tfmmobile.ui.home.MainActivity
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import javax.inject.Inject

@HiltViewModel
class PlayerDetailViewModel @Inject constructor(private val playersUseCase: PlayerUseCase) : ViewModel() {

    private var _state = MutableStateFlow<PlayerDetailState>(PlayerDetailState.Loading)
    val state: StateFlow<PlayerDetailState> = _state

    fun getPlayerById(id:Long){
        viewModelScope.launch {
//            hilo principal
            _state.value= PlayerDetailState.Loading
            val result = withContext(Dispatchers.IO) { playersUseCase(id) } //hilo secundario
            if (result!=null){
                _state.value = PlayerDetailState.Success(
                    result.id, result.playerName,
                    result.primaryLastName, result.secondLastName, result.position,
                    result.trends, result.phoneNumber, result.email,
                    result.dni, result.teamId, false,
                )
            } else {
                _state.value = PlayerDetailState.Error("Ha ocurrido un error. Inténtelo más tarde.")
            }
//            hilo principal
        }

    }

    fun updatePlayer(id: Long,
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
    ){
        viewModelScope.launch {
//            hilo principal
            _state.value= PlayerDetailState.Loading
            val result = withContext(Dispatchers.IO) {
                playersUseCase(id, playerName, primaryLastName, secondLastName, position,
                    trends, phoneNumber, email, dni, teamId, false) } //hilo secundario
            if (result!=null){
                _state.value = PlayerDetailState.Success(
                    result.id, result.playerName,
                    result.primaryLastName, result.secondLastName, result.position,
                    result.trends, result.phoneNumber, result.email,
                    result.dni, result.teamId, false)
                println("HOLAAAAAAA ANDANDOOOOOOOOOOO")
                val intent = Intent(context, MainActivity::class.java)
                context.startActivity(intent)
                println("HOLAAAAAAA ANDANDOOOOOOOOOOO 222222222222")
            } else {
                Toast.makeText(context, R.string.errorUpdatePlayer, Toast.LENGTH_LONG).show()
                _state.value = PlayerDetailState.Error("Ha ocurrido un error. Inténtelo más tarde.")
            }
//            hilo principal
        }

    }

}