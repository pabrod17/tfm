package com.teamhub1.tfmmobile.ui.health

sealed class ExerciseState {

    data object Loading: ExerciseState()
    data class Error(var error:String): ExerciseState()
    data class Success(val id: Long,
                       val exerciseName: String,
                       val description: String,
                       val objective: String,
                       val exerciseType: String): ExerciseState()
}