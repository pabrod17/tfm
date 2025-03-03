package com.example.tfmmobile.ui.health

import com.example.tfmmobile.domain.model.ExerciseModel

sealed class ExercisesState {

    data object Loading: ExercisesState()
    data class Error(var error:String): ExercisesState()
    data class Success(val exercises: List<ExerciseModel>): ExercisesState()
}