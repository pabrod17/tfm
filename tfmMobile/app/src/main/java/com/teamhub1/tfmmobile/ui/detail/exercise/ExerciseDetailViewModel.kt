package com.teamhub1.tfmmobile.ui.detail.exercise

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.teamhub1.tfmmobile.domain.model.usecase.ExerciseUseCase
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import javax.inject.Inject

@HiltViewModel
class ExerciseDetailViewModel @Inject constructor(private val exerciseUseCase: ExerciseUseCase) : ViewModel() {

    private var _state = MutableStateFlow<ExerciseDetailState>(ExerciseDetailState.Loading)
    val state: StateFlow<ExerciseDetailState> = _state

    fun getExerciseById(id:Long){
        viewModelScope.launch {
//            hilo principal
            _state.value= ExerciseDetailState.Loading
            val result = withContext(Dispatchers.IO) { exerciseUseCase(id) } //hilo secundario
            if (result!=null){
                _state.value = ExerciseDetailState.Success(
                    result.id, result.exerciseName,
                    result.description, result.objective, result.exerciseType
                )
            } else {
                _state.value = ExerciseDetailState.Error("Ha ocurrido un error. Inténtelo más tarde.")
            }
//            hilo principal
        }

    }


}