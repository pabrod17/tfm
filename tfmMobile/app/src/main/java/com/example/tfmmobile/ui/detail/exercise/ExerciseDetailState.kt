package com.example.tfmmobile.ui.detail.exercise

sealed class ExerciseDetailState {
    data object Loading: ExerciseDetailState()
    data class Error(var error:String): ExerciseDetailState()
    data class Success(val id: Long,
                       val exerciseName: String,
                       val description: String,
                       val objective: String,
                       val exerciseType: String): ExerciseDetailState()

}