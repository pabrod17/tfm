package com.teamhub1.tfmmobile.ui.health

import com.teamhub1.tfmmobile.domain.model.ExerciseModel

sealed class ExercisesState {

    data object Loading: ExercisesState()
    data class Error(var error:String): ExercisesState()
    data class Success(val exercises: List<ExerciseModel>): ExercisesState()
}