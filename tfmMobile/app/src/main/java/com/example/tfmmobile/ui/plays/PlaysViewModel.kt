package com.example.tfmmobile.ui.plays

import android.content.Context
import android.content.Intent
import android.widget.Toast
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.tfmmobile.R
import com.example.tfmmobile.domain.model.ExerciseModel
import com.example.tfmmobile.domain.model.GameModel
import com.example.tfmmobile.domain.model.LesionModel
import com.example.tfmmobile.domain.model.PlayModel
import com.example.tfmmobile.domain.model.SeasonModel
import com.example.tfmmobile.domain.model.StretchingModel
import com.example.tfmmobile.domain.model.TrainingModel
import com.example.tfmmobile.domain.model.usecase.ExerciseUseCase
import com.example.tfmmobile.domain.model.usecase.GameUseCase
import com.example.tfmmobile.domain.model.usecase.LesionUseCase
import com.example.tfmmobile.domain.model.usecase.PlayUseCase
import com.example.tfmmobile.domain.model.usecase.PlayerUseCase
import com.example.tfmmobile.domain.model.usecase.StretchingUseCase
import com.example.tfmmobile.domain.model.usecase.TrainingUseCase
import com.example.tfmmobile.ui.club.PlayerState
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
class PlaysViewModel @Inject constructor(
    private val playUseCase: PlayUseCase
) : ViewModel() {

    private var _statePlays = MutableStateFlow<PlayssState>(PlayssState.Loading)
    val statePlays: StateFlow<PlayssState> = _statePlays
    private var _plays = MutableStateFlow<List<PlayModel>>(emptyList())
    val plays: StateFlow<List<PlayModel>> = _plays


    private var _statePlay = MutableStateFlow<PlayState>(PlayState.Loading)
    val statePlay: StateFlow<PlayState> = _statePlay


    fun getPlays(): List<PlayModel> {
        viewModelScope.launch {
//            hilo principal
            _statePlays.value = PlayssState.Loading
            val result = withContext(Dispatchers.IO) { playUseCase() } //hilo secundario
            if (result != null) {
                _statePlays.value = PlayssState.Success(result)
                _plays.value = result
//                _team.value = result

            } else {
                _statePlays.value =
                    PlayssState.Error("Ha ocurrido un error. Inténtelo más tarde.")
            }
//            hilo principal
        }

        return _plays.value
    }

    fun addPlay(
        teamId: Long,
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
    ) {
        viewModelScope.launch {
//            hilo principal
            _statePlay.value = PlayState.Loading
            val result = withContext(Dispatchers.IO) {
                playUseCase(
                    teamId,
                    title,
                    playType,
                    gesture,
                    pointGuardText,
                    shootingGuardText,
                    smallForwardText,
                    powerForwardText,
                    centerText,
                    description,
                    false
                )
            } //hilo secundario
            if (result != null) {
                _statePlay.value = PlayState.Success(
                    result.id, result.title,
                    result.playType, result.gesture, result.pointGuardText,
                    result.shootingGuardText, result.smallForwardText, result.powerForwardText,
                    result.centerText, result.description
                )
                println("HOLAAAAAAA ANDANDOOOOOOOOOOO")
                getPlays()
                println("HOLAAAAAAA ANDANDOOOOOOOOOOO 222222222222")
            } else {
                Toast.makeText(context, R.string.errorAddPlay, Toast.LENGTH_LONG).show()
                _statePlay.value = PlayState.Error("Ha ocurrido un error. Inténtelo más tarde.")
            }
//            hilo principal
        }
    }

    init {
        _plays.value = getPlays()
    }







}