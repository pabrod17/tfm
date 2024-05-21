package com.example.tfmmobile.ui.health

import android.content.Context
import android.content.Intent
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.tfmmobile.domain.model.ExerciseModel
import com.example.tfmmobile.domain.model.GameModel
import com.example.tfmmobile.domain.model.LesionModel
import com.example.tfmmobile.domain.model.SeasonModel
import com.example.tfmmobile.domain.model.StretchingModel
import com.example.tfmmobile.domain.model.TrainingModel
import com.example.tfmmobile.domain.model.usecase.ExerciseUseCase
import com.example.tfmmobile.domain.model.usecase.GameUseCase
import com.example.tfmmobile.domain.model.usecase.LesionUseCase
import com.example.tfmmobile.domain.model.usecase.PlayerUseCase
import com.example.tfmmobile.domain.model.usecase.StretchingUseCase
import com.example.tfmmobile.domain.model.usecase.TrainingUseCase
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
class HealthViewModel @Inject constructor(
    private val lesionUseCase: LesionUseCase,
    private val exerciseUseCase: ExerciseUseCase,
    private val stretchingUseCase: StretchingUseCase
) : ViewModel() {

    private var _stateLesions = MutableStateFlow<LesionsState>(LesionsState.Loading)
    val stateLesions: StateFlow<LesionsState> = _stateLesions
    private var _lesions = MutableStateFlow<List<LesionModel>>(emptyList())
    val lesions: StateFlow<List<LesionModel>> = _lesions

    private var _stateExercises = MutableStateFlow<ExercisesState>(ExercisesState.Loading)
    val stateExercises: StateFlow<ExercisesState> = _stateExercises
    private var _exercises = MutableStateFlow<List<ExerciseModel>>(emptyList())
    val exercises: StateFlow<List<ExerciseModel>> = _exercises

    private var _stateStretchings = MutableStateFlow<StretchingsState>(StretchingsState.Loading)
    val stateStretchings: StateFlow<StretchingsState> = _stateStretchings
    private var _stretchings = MutableStateFlow<List<StretchingModel>>(emptyList())
    val stretchings: StateFlow<List<StretchingModel>> = _stretchings

    private var _stateLesion = MutableStateFlow<LesionState>(LesionState.Loading)
    val stateLesion: StateFlow<LesionState> = _stateLesion

    private var _stateExercise = MutableStateFlow<ExerciseState>(ExerciseState.Loading)
    val stateExercise: StateFlow<ExerciseState> = _stateExercise

    private var _stateStretching = MutableStateFlow<StretchingState>(StretchingState.Loading)
    val stateStretching: StateFlow<StretchingState> = _stateStretching

    fun getLesions(): List<LesionModel> {
        viewModelScope.launch {
//            hilo principal
            _stateLesions.value = LesionsState.Loading
            val result = withContext(Dispatchers.IO) { lesionUseCase() } //hilo secundario
            if (result != null) {
                _stateLesions.value = LesionsState.Success(result)
                _lesions.value = result
//                _team.value = result

            } else {
                _stateLesions.value =
                    LesionsState.Error("Ha ocurrido un error. Inténtelo más tarde.")
            }
//            hilo principal
        }

        return _lesions.value
    }

    fun getExercises(): List<ExerciseModel> {
        viewModelScope.launch {
//            hilo principal
            _stateExercises.value = ExercisesState.Loading
            val result = withContext(Dispatchers.IO) { exerciseUseCase() } //hilo secundario
            if (result != null) {
                _stateExercises.value = ExercisesState.Success(result)
                _exercises.value = result
//                _team.value = result

            } else {
                _stateExercises.value =
                    ExercisesState.Error("Ha ocurrido un error. Inténtelo más tarde.")
            }
//            hilo principal
        }

        return _exercises.value
    }

    fun getStretchings(): List<StretchingModel> {
        viewModelScope.launch {
//            hilo principal
            _stateStretchings.value = StretchingsState.Loading
            val result = withContext(Dispatchers.IO) { stretchingUseCase() } //hilo secundario
            if (result != null) {
                _stateStretchings.value = StretchingsState.Success(result)
                _stretchings.value = result
//                _team.value = result

            } else {
                _stateStretchings.value =
                    StretchingsState.Error("Ha ocurrido un error. Inténtelo más tarde.")
            }
//            hilo principal
        }

        return _stretchings.value
    }

}